import React from 'react';
import connect from 'connect-store';
import UserDetailFrameStore from './UserDetailFrameStore';

import Button from '../../../../components/control/Button';
import Container from '../../../../components/layout/Container';
import Box from '../../../../components/layout/Box';
import ManyTableContainer from '../../../../components/layout/ManyTableContainer';
import Switch from '../../../../components/control/Switch';
import RenderObj from '../../../../components/layout/RenderObj';
import DialogFrameView from '../../../../components/control/Dialog/DialogFrameView';

const UserDetailFrameView = ({data, actions}) => {
  let {show, onOff, result = {}, dialogStore} = data;
  const {onToggleDialog, onChangeSwitch, onOpenDialog, onCloseDialog,} = actions;

  const {idCardInfo, inspectorInfo} = result;

  //idCardInfo && idCardInfo.pos
  const dataArr = [
    {
      key: '用户姓名',
      render: _ => result && result.name
    }, {
      key: '身份证号码',
      render: row => idCardInfo && idCardInfo.no
    }, {
      key: '性别',
      render: row => idCardInfo && idCardInfo.gender
    }, {
      key: '身份证正面照片',
      render: row => <Button
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
      render: row => <Button
        onClick={_ => {
          onOpenDialog('更改账户角色',
            <div><img src={idCardInfo && idCardInfo.neg?idCardInfo.pos:''}/></div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }, {
      key: '审核状态',
      render: row => idCardInfo && idCardInfo.state
    }, {
      key: '自动审核通过时间',
      render: row => idCardInfo && idCardInfo.autoResolvedAt? new Date().toSimpleString(idCardInfo.autoResolvedAt) :''

    }, {
      key: '人工审核提交时间',
      render: row => idCardInfo && idCardInfo.manualAppliedAt ? new Date(idCardInfo.manualAppliedAt).toSimpleString():''
    }, {
      key: '人工审核通过时间',
      render: _ => idCardInfo && idCardInfo.manualResolvedAt ? new Date(idCardInfo.manualResolvedAt).toSimpleString():''
    }, {
      key: '驳回原因',
      render: row => idCardInfo && idCardInfo.rejectReason
    }];

  // const dataArr2 = [
  //   {
  //     key: '是否必须审核',
  //     render: _ => <Switch toggled={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.isMustResolve}/>
  //   }, {
  //     key: '认证状态',
  //     render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.state
  //   }, {
  //     key: '驳回原因',
  //     render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.rejectReason
  //   }, {
  //     key: '提交时间',
  //     render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.appliedAt
  //   }, {
  //     key: '通过时间',
  //     render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.resolvedAt
  //   }, {
  //     key: '驳回时间',
  //     render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.rejectReason
  //   }, {
  //     key: '驳回原因',
  //     render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.rejectReason
  //   }, {
  //     key: '行驶证有效期',
  //     render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.vehicle.license && inspectorInfo.cert.vehicle.license.expires
  //   }, {
  //     key: '车牌号',
  //     render: _ => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.no
  //   }];
  //巡检相关的信息


  return (
    <Box>
      <ManyTableContainer>
        <RenderObj
          dataArr={dataArr}
          title='身份认证信息'/>
        {/*<RenderObj*/}
          {/*dataArr={dataArr2}*/}
          {/*title='巡检认证信息'/>*/}
      {/*</ManyTableContainer>*/}
      {/*<ManyTableContainer>*/}
        {/*<RenderObj*/}
          {/*dataArr={dataArr3}*/}
          {/*title='巡检认证信息'*/}
        {/*/>*/}
      </ManyTableContainer>
      {connect(DialogFrameView, dialogStore)}
    </Box>
  );
};

export default _ => connect(UserDetailFrameView, new UserDetailFrameStore());