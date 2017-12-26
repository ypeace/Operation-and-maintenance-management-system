import React from 'react';
import connect from 'connect-store';
import InspectorDetailFrameStore from './InspectorDetailFrameStore';

import Button from '../../../../components/control/Button';
import Container from '../../../../components/layout/Container';
import Box from '../../../../components/layout/Box';
import ManyTableContainer from '../../../../components/layout/ManyTableContainer';
import Dialogue from "../../../../components/control/Dialogue";
import Switch from '../../../../components/control/Switch';
import Table from '../../../../components/layout/Table';
import RenderObj from '../../../../components/layout/RenderObj';

const InspectorDetailFrameView = ({data, actions}) => {
  let { show, onOff, result } = data;
  const { onToggleDialog, onChangeSwitch } = actions;

  const {idCardInfo, inspectorInfo} = result;

  const dataArr = [{
    key: '用户姓名',
    render: _ => result && result.name
  },{
    key: '身份证号码',
    render: row => idCardInfo && idCardInfo.no
  }];
  return (
    <Box>
      <ManyTableContainer>
        <RenderObj
          dataArr={dataArr}
          title='价格规则     ' />

      </ManyTableContainer>
      <ManyTableContainer>
        <RenderObj
          dataArr={[]}
          title='巡检认证信息'
        />
      </ManyTableContainer>

      <Container>
        <Button onClick={onToggleDialog}>弹窗按钮</Button>
        <Dialogue onToggleDialog={onToggleDialog} show={show}/>
      </Container>

    </Box>
  );
};

export default _ => connect(InspectorDetailFrameView, new InspectorDetailFrameStore());