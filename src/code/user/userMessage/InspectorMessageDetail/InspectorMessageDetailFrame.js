import React from 'react';
import connect from 'connect-store';
import InspectorMessageDetailFrameStore from './InspectorMessageDetailFrameStore';

import Button from '../../../../components/control/Button';
import Container from '../../../../components/layout/Container';
import Box from '../../../../components/layout/Box';
import ManyTableContainer from '../../../../components/layout/ManyTableContainer';
import Switch from '../../../../components/control/Switch';
import RenderObj from '../../../../components/layout/RenderObj';
import DialogFrameView from '../../../../components/control/Dialog/DialogFrameView'

const InspectorMessageDetailView = ({data, actions}) => {
  let {show, onOff, result = {}, dialogStore} = data;
  const {onToggleDialog, onChangeSwitch, onOpenDialog, onCloseDialog,} = actions;

  const {idCardInfo, inspectorInfo} = result;


  const dataArr2 = [
    {
      key: '是否必须审核',
      render: _ => <Switch toggled={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.isMustResolve}/>
    }, {
      key: '认证状态',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.state
    }, {
      key: '驳回原因',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.rejectReason
    }, {
      key: '提交时间',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.appliedAt
    }, {
      key: '通过时间',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.resolvedAt
    }, {
      key: '驳回时间',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.rejectReason
    }, {
      key: '驳回原因',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.rejectReason
    }, {
      key: '行驶证有效期',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.vehicle.license && inspectorInfo.cert.vehicle.license.expires
    }, {
      key: '车牌号',
      render: _ => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.no
    }];
  //巡检相关的信息
  const dataArr3 = [
    {
      key: '手持身份证照片',
      render: row => <Button onClick={onToggleDialog}
                             src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.cardInHand}>查看</Button>
    }, {
      key: '身份反面照片',
      render: row => <Button onClick={onToggleDialog} src={idCardInfo && idCardInfo.neg}>查看</Button>
    }, {
      key: '驾驶证照片(正)',
      render: row => <Button onClick={onToggleDialog}
                             src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.driveLicense && inspectorInfo.cert.driveLicense.pos}>查看</Button>
    }, {
      key: '驾驶证照片（反）',
      render: row => <Button onClick={onToggleDialog}
                             src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.driveLicense && inspectorInfo.cert.driveLicense.neg}>查看</Button>
    }, {
      key: '行驶证照片(正)',
      render: row => <Button onClick={onToggleDialog}
                             src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.vehicle.license && inspectorInfo.cert.vehicle.license.pos}>查看</Button>
    }, {
      key: '行驶证照片（反）',
      render: row => <Button onClick={onToggleDialog}
                             src={inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.vehicle.license && inspectorInfo.cert.vehicle.license.neg}>查看</Button>
    }, {
      key: '所在城市',
      render: row => inspectorInfo && inspectorInfo.identity && inspectorInfo.city
    }, {
      key: '身份',
      render: row => inspectorInfo && inspectorInfo.identity && inspectorInfo.identity
    }, {
      key: '分配的巡检区',
      render: row => inspectorInfo && inspectorInfo.identity && inspectorInfo.inspectionAreas
    }, {
      key: '分配的任务组',
      render: row => inspectorInfo && inspectorInfo.identity && inspectorInfo.acceptTaskGroups
    }, {
      key: '分配的项目',
      render: row => inspectorInfo && inspectorInfo.identity && inspectorInfo.acceptProjects
    }, {
      key: '位置快照',
      render: _ => {
      },
      /*    render: row => inspectorInfo && inspectorInfo.identity && inspectorInfo.location*/
    }, {
      key: '默认计价规则',
      render: row => inspectorInfo && inspectorInfo.identity && inspectorInfo.defaultPriceRule
    }, {
      key: '默认的代理计价规则',
      render: row => inspectorInfo && inspectorInfo.identity && inspectorInfo.defaultAgentPriceRule
    }, {
      key: '是否正在巡检',
      render: row => <Switch toggled={inspectorInfo && inspectorInfo.identity && inspectorInfo.isWorking}/>
    }, {
      key: '当前分配的巡检区颜色',
      render: row => inspectorInfo && inspectorInfo.identity && inspectorInfo.inspectionAreaColor
    }, {
      key: '当前进行中的巡检订单',
      render: row => inspectorInfo && inspectorInfo.identity && inspectorInfo.processingInspectionOrder
    },];

  return (
    <Box>
      <ManyTableContainer>

        <RenderObj
          dataArr={dataArr2}
          title='巡检认证信息'/>
      </ManyTableContainer>
      <ManyTableContainer>
        <RenderObj
          dataArr={dataArr3}
          title='巡检认证信息'
        />
      </ManyTableContainer>
      {connect(DialogFrameView, dialogStore)}

    </Box>
  );
};

export default _ => connect(InspectorMessageDetailView, new InspectorMessageDetailFrameStore());