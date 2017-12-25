import React from 'react';
import connect from 'connect-store';
import UserMessageFrameStore from './UserMessageFrameStore';

import DrawerFrameView from '../../../code/drawer/DrawerFrameView';
import Box from '../../../components/layout/Box';
import Container from '../../../components/layout/Container';
import Table from '../../../components/layout/Table';
import Button from '../../../components/control/Button';



const WorkFrameView = ({data, actions}) => {
  let {tableLists, drawerStore} = data;
  const {onShowDetail} = actions;

  tableLists=[{_id:111},{_id:111},{_id:111},{_id:111},{_id:111},{_id:111},{_id:111},];

  const columns = [/* {
    name: 'id',
    render: row => row._id
  }, */{
    name: '用户姓名',
    render: row => row.name
  },{
    name: '身份证认证',
    render: row => <Button
      onClick={()=>{
        console.log(row.idCardInfo)
      }}
    >查看详情</Button>
  },{
    name: '巡检身份认证',
    render: row => <Button
      onClick={_=>{
        onShowDetail(row);
        console.log(row.inspectorInfo)
      }}
    >查看详情</Button>
  }, {
    name: '手机号',
    render: row => row.tel
  } ,{
    name: '是否启用',
    render: row => row.enable?'√':'X'
  }, {
    name: '账户角色',
    render: row => row.avatar
  }, {
    name: '权限',
    render: row => row._id
  }/*,{
    name: '仓管身份认证',
      render: row => row._id
  }*/];

  return (
    <div>
      <Box>
        {/*<Nav> 用户管理 </Nav>*/}
        <Container>筛选条件</Container>
        <Container>
          <Table
            columns={columns}
            dataSource={tableLists}
          />
        </Container>
      </Box>
      {connect(DrawerFrameView, drawerStore)}
    </div>
  );
};

export default _ => connect(WorkFrameView, new UserMessageFrameStore());