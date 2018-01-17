import React from 'react';

import InspectOrderFrameStore from './InspectOrderFrameStore';
import connect from 'connect-store';

import DrawerFrameView from '../../code/drawer/DrawerFrameView';
import Box from '../../components/layout/Box';
import Container from '../../components/layout/Container';
import Table from '../../components/layout/Table';
import Button from '../../components/control/Button';
import Switch from '../../components/control/Switch';
import DialogFrameView from '../../components/control/Dialog/DialogFrameView'
import Pagination from '../../components/control/Pagination';

const WorkFrameView = ({data, actions}) => {
  let {tableLists, drawerStore, dialogStore, queryFactoryStore, INSPECTION_ORDER_STATE_MAP} = data;
  const {onShowUserDetail, onChangeShow, onChangeState, onEnableSelfOffWork} = actions;

  const changeState = (state, id) => {
    switch (state) {
      case 0:
        return <span>
          <Button
            onClick={
              () => {
                onChangeState(id, 'pause')
              }
            }
          >暂停派单</Button><Button
          onClick={
            () => {
              onChangeState(id, 'finish')
            }
          }
        >截单</Button
        ><Button
          onClick={
            () => {
              onChangeState(id, 'cancel')
            }
          }
        >取消</Button>
        </span>;
      case 1:
        return <span>
          <Button
            onClick={
              () => {
                onChangeState(id, 'resume')
              }
            }
          >继续派单</Button><Button
          onClick={
            ()=>{
              onChangeState(id, 'finish')
            }
          }
        >截单</Button><Button
          onClick={
            ()=>{
              onChangeState(id, 'cancel')
            }
          }
        >取消</Button>
        </span>;
      case 2:
        return null;
      case 3:
        return <span>
          <Button
            onClick={
              () => {
                onChangeState(id, 'confirm')
              }
            }
          >提交确认</Button><Button
          onClick={
            () => {
              onChangeState(id, 'check')
            }
          }
        >轧账</Button>
        </span>;
      case 4:
        return <span>
          <Button
            onClick={
              () => {
                onChangeState(id, 'check')
              }
            }>轧账</Button>
        </span>;
      case 5:
        return <span>
          <Button
            onClick={
              () => {
                onChangeState(id, 'settle')
              }
            }>结算</Button>
        </span>;
      case 6:
        return null
    }
  };

  const columns = [
    {
      name: 'id',
      render: row => row._id
    }, {
      name: '是否自行上下班',
      render: (row) => {
        return (<Switch
          onToggle={() => {
            onEnableSelfOffWork(row._id, !row.isEnableSelfOffWork)
          }}
          toggled={row.isEnableSelfOffWork}
        />)
      }
    }, {
      name: '巡检人',
      render: row => row.inspector && row.inspector.name
    }, {
      name: '价格和统计',
      render: row => <Button
        onClick={_ => {
          onShowUserDetail(row._id)
        }}
      >查看/修改</Button>
    }, {
      name: '城市',
      render: row => row.city
    }, {
      name: '订单当前状态',
      render: row => <span>
          <span>{INSPECTION_ORDER_STATE_MAP[row.state]}</span>
        {changeState(row.state, row._id)}
        </span>
    }, {
      name: '是否展示巡检订单计费明细',
      render: (row) => {
        return (<Switch
          onToggle={() => {
            onChangeShow(row._id, !row.isShowPayment)
          }}
          toggled={row.isShowPayment}
        />)
      }
    },/*{
      name: '添加额外计费项目',
      render: (row) => {
        return <Button
          onToggle={() => {
            onChangeShow(row._id, !row.isShowPayment)
          }}
          toggled={row.isShowPayment}
        >添加</Button>
      }
    },*/];
  return (
    <div>
      <Box>
        <Container>
          巡检订单管理
        </Container>

        <Container>
          <Table
            columns={columns}
            dataSource={tableLists}
          />
        </Container>

        <Container>
          {connect(Pagination, queryFactoryStore)}
        </Container>
      </Box>
      {connect(DrawerFrameView, drawerStore)}
      {connect(DialogFrameView, dialogStore)}
    </div>
  );
};

export default _ => connect(WorkFrameView, new InspectOrderFrameStore());