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


import DialogFrameView from '../../../components/control/Dialog/DialogFrameView'

const AssemblyFrameView = ({data, actions}) => {
  const {show, onOff, dialogStore,} = data;
  const {onToggleDialog, onChangeSwitch, onOpenDialog,onCloseDialog} = actions;
  const arr = {permissions:['猪', '粉色']}
  // const abc= (arr)=> {return arr.permissions ? arr.permissions.map((item, index) => <div> {item}</div>} : null}</div>;
  const renderRole = (arr) => {
    return arr.permissions ? arr.permissions.map((item, index) => <div> {item}</div> ) : null
  };
  return (
    <div><Box>
      <Nav>组件展示</Nav>
      <Container><RenderObj/></Container>

      <Container>
        <Button
          onClick={() => {
            onOpenDialog('选件订单暂时', <div>
              <Button
                onClick= {_ => onCloseDialog()}
              >基础按钮</Button>
              <div>{renderRole(arr)}</div>
              <p>8888</p>
              <p>8888</p>
              <p>8888</p>

            </div>,(<div><Button
              onClick={() => {
                onCloseDialog()
              }}
            >确认</Button><Button
              onClick={() => {
                onCloseDialog()
              }}
            >取消</Button></div>))
          }}
        >自己封装弹窗
        </Button>
      </Container>

      <Container>
        <p><Button>基础按钮</Button></p>
        <br/>
        <p>
          <Button onClick={onToggleDialog}>弹窗按钮</Button>
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
        <p>ggggg</p>
        <p>ggggg</p>
        <p>ggggg</p>
      </Container>
      {/*<Button>按钮</Button>*/}
      {connect(DialogFrameView, dialogStore)}
    </Box>

    </div>
  );
};

export default _ => connect(AssemblyFrameView, new AssemblyFrameStore());