import React from 'react';
import connect from 'connect-store';
import AssemblyFrameStore from './AssemblyFrameStore';

import Button from '../../../components/control/Button';
import Container from '../../../components/layout/Container';
import Box from '../../../components/layout/Box';
import Nav from '../../../components/layout/Nav';
import Dialogue from "../../../components/control/Dialogue";
import Switch from '../../../components/control/Switch';
import RenderObj from '../../../components/layout/RenderObj'

import DialogFrameStore from '../../../components/control/ComponentAndDialog/DialogFrameStore';
import DialogFrameView from '../../../components/control/ComponentAndDialog/DialogFrameView'
const AssemblyFrameView = ({data, actions}) => {
  const {show, onOff, dialogStore} = data;
  const {onToggleDialog, onChangeSwitch, onAbc} = actions;
  return (
    <div> <Box>
      <Nav>组件展示</Nav>
      <Container><RenderObj/></Container>

      <Container>
        <Button
          onClick={()=>{
            onAbc()
          }}
        >自己封装弹窗</Button>
      </Container>


      <Container>
        <p><Button>基础按钮</Button></p>
        <br/>
        <p><Button onClick={onToggleDialog}>弹窗按钮</Button>
        </p>
        <Dialogue onToggleDialog={onToggleDialog} show={show}/>


      </Container>
      <Container>
        <p>
          <Switch
            toggled={onOff}
            label={'toggled样式'}
            onToggle={onChangeSwitch}
          />
          <br/>
          <Switch
            toggled={!onOff}
            label={'test'}
            onToggle={onChangeSwitch}
          />
        </p>
        <p>ggggg1</p>
        <p>ggggg</p>
        <p>ggggg</p>
        <p>ggggg</p>
        <p>ggggg</p>
        <p>ggggg</p>
      </Container>
      {/*<Button>按钮</Button>*/}
      {connect(DialogFrameView,dialogStore)}
    </Box>

    </div>
  );
};

export default _ => connect(AssemblyFrameView, new AssemblyFrameStore());