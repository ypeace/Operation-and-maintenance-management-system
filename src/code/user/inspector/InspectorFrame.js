import React from 'react';

import connect from 'connect-store';
import InspectorFrameStore from './InspectorFrameStore';

import DrawerFrameView from '../../../code/drawer/DrawerFrameView';
import Box from '../../../components/layout/Box';
import Container from '../../../components/layout/Container';
import Table from '../../../components/layout/Table';
import Button from '../../../components/control/Button';
import Switch from '../../../components/control/Switch';
import Dialogue from "../../../components/control/Dialogue";

const InspectorFrameView = ({data, actions}) => {
  let {show, tableLists, drawerStore} = data;
  const {onShowDetail,onToggleDialog} = actions

  //模拟请求后获取的数据
  tableLists && tableLists.length ? null : (tableLists = [{name: '佩奇', _id: 111, enable: 'true'}, {
    name: '柯南',
    _id: 222,
    tel: '1888888888',
    enable: 'false'
  }, {name: '小黄人', _id: 333}, {name: '小羊肖恩', _id: 444, enable: 'true'}, {name: '千寻', _id: 111}])
  

  const columns = [/*{
    name: 'id',
    render: row => row._id
  }, */{
    name: '巡检员姓名',
    render: row => row.inspector && row.inspector.name
  }, {
    name: '身份',
    render: row => row._id
  }, {
    name: '车辆类型',
    render: row => row.vehicleType
  }, {
    name: '所属城市',
    render: row => row.city
  }, {
    name: '订单状态',
    render: row => row.state
  }, {
    name: '账户角色',
    render: row => row.avatar
  },{
    name: '统计巡检数据',
    render: row => <Button
      onClick={_ => {
        onShowDetail(row._id)
      }}>
      点击查看</Button>
  },  {
    name: '计价规则',
    render: row => <Button onClick={onToggleDialog}>弹窗按钮</Button>
  }, {
    name: '电池情况',
    render: row => <Button  onClick={_ => {
      onShowDetail(row._id)
    }}>点击查看</Button>
  },{
    name: '已巡检的车辆列表',
    render: row => <Button  onClick={_ => {
      onShowDetail(row._id)
    }}>点击查看</Button>
  }, {
    name: '计费明细',
    render: row => <Button  onClick={_ => {
      onShowDetail(row._id)
    }}>点击查看</Button>
  }/*, {
    name: '关键时间',
    render: row => <Button>点击查看</Button>
  }*//*,{
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
        <Dialogue onToggleDialog={onToggleDialog} show={show}/>
      </Box>
      {connect(DrawerFrameView, drawerStore)}
    </div>
  );
};

export default _ => connect(InspectorFrameView, new InspectorFrameStore());