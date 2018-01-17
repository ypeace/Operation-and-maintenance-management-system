import React from 'react';
import connect from 'connect-store';
import SettingDetailFrameStore from './SettingDetailFrameStore';

import Button from '../../../components/control/Button';
import Box from '../../../components/layout/Box';
import ManyTableContainer from '../../../components/layout/ManyTableContainer';
import RenderObj from '../../../components/layout/RenderObj';
import DialogFrameView from '../../../components/control/Dialog/DialogFrameView';
import ChangeInput from '../../../components/control/ChangeInput';
import Switch from '../../../components/control/Switch'

const UserDetailFrameView = ({data, actions}) => {
  let {id, result, dialogStore} = data;
  const {onToggleDialog, onChangeSwitch, onOpenDialog, onCloseDialog, onDeleteIdcard, onPassIdcard, onRejectIdcard, onIsMustResolveRequest, onRejectInspector, onPassInspector} = actions;

  //const {settings = {}} = result;
  const settings = {noParser:'1'}
  const dataArr = [
    {
      key: '车辆牌号解析规则',
      render: _ => settings.noParser
    }, {
      key: '请求加签密钥',
      render: _ => settings.requestSignatureSecretKey
    }, {
      key: '返回值加密密钥',
      render: _ => settings.responseEncryptionSecretKey
    },  {
      key: '返回值加密iv',
      render: _ => settings.responseEncryptionSecretKey
    },  {
      key: '下行接口回调地址',
      render: _ => settings.gender
    }, ];

  const dataArr2 = [
    {
      key: '换电',
      render: _ => settings.unitPrice&&settings.unitPrice.changeBattery
    }, {
      key: '挪回服务区',
      render: _ => settings.unitPrice&&settings.unitPrice.moveInServiceArea
    },{
      key: '挪出不合法区域',
      render: _ => settings.unitPrice&&settings.unitPrice.moveOutInvalidArea
    },{
      key: '挪入合法区域',
      render: _ => settings.unitPrice&&settings.unitPrice.moveInValidArea
    },{
      key: '拖回站点',
      render: _ => settings.unitPrice&&settings.unitPrice.backToStation
    },{
      key: '投放',
      render: _ => settings.unitPrice&&settings.unitPrice.putOn
    },{
      key: '难寻',
      render: _ => settings.unitPrice&&settings.unitPrice.hardToFind
    },{
      key: '唤醒',
      render: _ => settings.unitPrice&&settings.unitPrice.weakUp
    },
    /*{
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
    }, */];

  return (
    <Box>
      <ManyTableContainer>
        <RenderObj
          dataArr={dataArr}
          title='设置详情'/>

      </ManyTableContainer>
      <ManyTableContainer>
        <RenderObj
          dataArr={dataArr2}
          title='身份审核'
        />
      </ManyTableContainer>
      {connect(DialogFrameView, dialogStore)}
    </Box>
  );
};

export default _ => connect(UserDetailFrameView, new SettingDetailFrameStore());