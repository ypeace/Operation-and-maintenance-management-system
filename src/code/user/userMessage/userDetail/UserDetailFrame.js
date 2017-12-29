import React from 'react';
import connect from 'connect-store';
import UserDetailFrameStore from './UserDetailFrameStore';

import Button from '../../../../components/control/Button';
import Box from '../../../../components/layout/Box';
import ManyTableContainer from '../../../../components/layout/ManyTableContainer';
import RenderObj from '../../../../components/layout/RenderObj';
import DialogFrameView from '../../../../components/control/Dialog/DialogFrameView';
import ChangeInput from '../../../../components/control/ChangeInput';
import Switch from '../../../../components/control/Switch'

const UserDetailFrameView = ({data, actions}) => {
  let {show, onOff, result = {}, dialogStore, USER_STATE_MAP, USER_INSPECTOR__STATE_MAP, CAR_MAP, id} = data;
  const {onToggleDialog, onChangeSwitch, onOpenDialog, onCloseDialog, onDeleteIdcard, onPassIdcard, onRejectIdcard, onIsMustResolveRequest, onRejectInspector, onPassInspector} = actions;

  const {idCardInfo = {}, inspectorInfo = {}} = result;

  const dataArr = [
    {
      key: '用户姓名',
      render: _ => result && result.name
    }, {
      key: '身份证号码',
      render: _ => idCardInfo.no
    }, {
      key: '性别',
      render: _ => idCardInfo.gender
    }, {
      key: '身份证正面照片',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('更改账户角色',
            <div><img src={'http://qq.5068.com/uploads/allimg/131226/1332051141-7.jpg'}/></div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }, {
      key: '身份反面照片',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('更改账户角色',
            <div><img src={idCardInfo.neg ? idCardInfo.neg : ''}/></div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }, {
      key: '自动审核通过时间',
      render: _ => idCardInfo.autoResolvedAt ? new Date().toSimpleString(idCardInfo.autoResolvedAt) : ''

    }, {
      key: '人工审核提交时间',
      render: _ => idCardInfo.manualAppliedAt ? new Date(idCardInfo.manualAppliedAt).toSimpleString() : ''
    }, {
      key: '人工审核通过时间',
      render: _ => idCardInfo.manualResolvedAt ? new Date(idCardInfo.manualResolvedAt).toSimpleString() : ''
    }];

  const dataArr2 = [
    {
      key: '审核状态',
      render: row => idCardInfo.state ? USER_STATE_MAP[idCardInfo.state] : '未提交'
    }, {
      key: '审核认证',
      render: row => {
        return (idCardInfo && idCardInfo.state === 2 ? <div>
          <Button
            onClick={_ => {
              onOpenDialog('确认通过审核', null,
                <div>
                  <Button
                    onClick={() => {
                      onCloseDialog()
                    }}
                  >取消</Button>
                  <Button
                    onClick={() => {
                      onPassIdcard()
                    }}
                  >确定</Button>
                </div>)
            }}
          >通过</Button>
          <Button
            onClick={_ => {
              onOpenDialog('确认驳回审核',
                <ChangeInput
                  name='驳回理由'
                  defaultValue='请输入理由'
                  parameter={id}
                  onClick={(id, value) => {
                    console.log(id, value)
                    onRejectIdcard(id, value)
                  }}
                />,
                <div>
                  <Button
                    onClick={() => {
                      onCloseDialog()
                    }}
                  >取消</Button>
                </div>)
            }}
          >驳回</Button>
        </div> : <span style={{color: 'orange'}}>当前状态不可操作</span>)
      }
    }, {
      key: '吊销认证',
      render: row => {
        return <Button
          onClick={_ => {
            onOpenDialog('确认吊销认证', null,
              <div>
                <Button
                  onClick={() => {
                    onCloseDialog()
                  }}
                >取消</Button>
                <Button
                  onClick={() => {
                    onDeleteIdcard()
                  }}
                >确定</Button>
              </div>)
          }}
        >吊销</Button>
      }
    }, {
      key: '驳回原因',
      render: _ => idCardInfo.rejectReason
    }, {
      key: '驳回时间',
      render: _ => idCardInfo.rejectedAt ? new Date(idCardInfo.rejectedAt).toSimpleString() : ''
    }];

  const dataArr3 = [
    {
      key: '车牌号',
      render: _ => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.no
    }, {
      key: '车子类型',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.vehicle && inspectorInfo.cert.vehicle.type ? CAR_MAP[inspectorInfo.cert.vehicle.type] : ''
    }, {
      key: '调度能力',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.vehicle && inspectorInfo.cert.vehicle.dispatchAbility
    },
    {
      key: '手持身份证照片',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('更改账户角色',
            <div><img src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.cardInHand}/></div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }, {
      key: '驾驶车辆照片',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('驾驶证照片（反）',
            <div><img
              src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.vehicle && inspectorInfo.cert.vehicle.photo}/>
            </div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }, {
      key: '银行卡正面照片',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('更改账户角色',
            <div><img
              src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.bankCard && inspectorInfo.cert.bankCard.pos}/>
            </div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }, {
      key: '银行卡反面照片',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('更改账户角色',
            <div><img
              src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.bankCard && inspectorInfo.cert.bankCard.neg}/>
            </div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }, {
      key: '银行卡号',
      render: _ => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.bankCard && inspectorInfo.cert.bankCard.no
    }, {
      key: '开户行',
      render: _ => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.bankCard && inspectorInfo.cert.bankCard.bank
    }, {
      key: '住址',
      render: _ => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.address
    }, {
      key: '驾驶证有效期',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.driveLicense && inspectorInfo.cert.driveLicense.expires ? new Date(inspectorInfo.cert.resolvedAt).toSimpleString() : ''
    }, {
      key: '驾驶证照片(正)',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('驾驶证照片(正)',
            <div><img
              src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.driveLicense && inspectorInfo.cert.driveLicense.pos}/>
            </div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }, {
      key: '驾驶证照片（反）',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('驾驶证照片（反）',
            <div><img
              src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.driveLicense && inspectorInfo.cert.driveLicense.pos}/>
            </div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }, {
      key: '行驶证证有效期',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.vehicle && inspectorInfo.cert.vehicle.license && inspectorInfo.cert.vehicle.license.expires ? new Date(inspectorInfo.cert.vehicle.license.expires).toSimpleString() : ''
    }, {
      key: '行驶证照片(正)',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('驾驶证照片（反）',
            <div><img
              src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.vehicle && inspectorInfo.cert.vehicle.license && inspectorInfo.cert.vehicle.license.pos}/>
            </div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }, {
      key: '行驶证照片（反）',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('驾驶证照片（反）',
            <div><img
              src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.license && inspectorInfo.cert.license.pos}/>
            </div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }];

  const dataArr4 = [
    {
      key: '是否审核通过后才能进行巡检工作',
      render: _ => <Switch
        toggled={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.isMustResolve}
        onToggle={() => {
          const isMustResolve = inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.isMustResolve ? 'false' : 'true';
          onIsMustResolveRequest(id, isMustResolve)
        }}
      />


    },
    {
      key: '认证状态',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.state ? USER_INSPECTOR__STATE_MAP[inspectorInfo.cert.state] : '未提交'
    },
    {
      key: '审核认证',
      render: row => {
        return (inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.state === 1 ? <div>
          <Button
            onClick={_ => {
              onOpenDialog('确认通过审核', null,
                <div>
                  <Button
                    onClick={() => {
                      onCloseDialog()
                    }}
                  >取消</Button>
                  <Button
                    onClick={() => {
                      onPassInspector()
                    }}
                  >确定</Button>
                </div>)
            }}
          >通过</Button>
          <Button
            onClick={_ => {
              onOpenDialog('确认驳回审核',
                <ChangeInput
                  name='驳回理由'
                  defaultValue='请输入理由'
                  parameter={id}
                  onClick={(id, value) => {
                    onRejectInspector(id, value)
                  }}
                />,
                <div>
                  <Button
                    onClick={() => {
                      onCloseDialog()
                    }}
                  >取消</Button>
                </div>)
            }}
          >驳回</Button>
        </div> : <span style={{color: 'orange'}}>当前状态不可操作</span>)
      }
    }, {
      key: '驳回时间',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.rejectedAt ? new Date(inspectorInfo.cert.rejectedAt).toSimpleString() : ''
    }, {
      key: '驳回原因',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.rejectReason
    }, {
      key: '通过时间',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.resolvedAt ? new Date(inspectorInfo.cert.resolvedAt).toSimpleString() : ''
    },];

  return (
    <Box>
      <ManyTableContainer>
        <RenderObj
          dataArr={dataArr}
          title='身份认证信息'/>
        <RenderObj
          dataArr={dataArr2}
          title='身份审核'
        />
      </ManyTableContainer>
      <ManyTableContainer>
        <RenderObj
          dataArr={dataArr3}
          title='巡检认证信息'/>
        <RenderObj
          dataArr={dataArr4}
          title='巡检审核'
        />
      </ManyTableContainer>
      {connect(DialogFrameView, dialogStore)}
    </Box>
  );
};

export default _ => connect(UserDetailFrameView, new UserDetailFrameStore());