import React from 'react';
import connect from 'connect-store';
import AssemblyFrameStore from './AssemblyFrameStore';

import Button from '../../../components/control/Button';
import Container from '../../../components/layout/Container';
import Box from '../../../components/layout/Box';
import Nav from '../../../components/layout/Nav';
import Dialogue from "../../../components/control/Dialogue"

const AssemblyFrameView = ({data, actions}) => {
  const {show} = data;
  const {onToggleDialog} = actions;
  return (
    <Box>
      <Nav>组件展示—————标题组件</Nav>
      <Container>
        <p>
          <Button onClick={onToggleDialog}>弹窗按钮（点击弹窗）</Button>
        </p>
        <br/>
        <p>
          <Button>基础按钮</Button>
        </p>
        <Dialogue onToggleDialog={onToggleDialog} show={show}/>
      </Container>
      <Container>
        <p>我是布局组件Container</p>
        <p>ggggg</p>
        <p>ggggg</p>
        <p>ggggg</p>
        <p>ggggg</p>
        <p>ggggg</p>
        <p>ggggg</p>

      </Container>
      <Container>
        我是布局组件Container
      </Container>
      {/*<Button>按钮</Button>*/}
    </Box>
  );
};

export default _ => connect(AssemblyFrameView, new AssemblyFrameStore());