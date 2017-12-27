import React from 'react';
import connect from 'connect-store';
import UserMessageFrameStore from './UserMessageFrameStore';

import DrawerFrameView from '../../../code/drawer/DrawerFrameView';
import Box from '../../../components/layout/Box';
import Container from '../../../components/layout/Container';
import Table from '../../../components/layout/Table';
import Button from '../../../components/control/Button';
import Switch from '../../../components/control/Switch';
import DialogFrameView from '../../../components/control/Dialog/DialogFrameView'

const WorkFrameView = ({data, actions}) => {
  let {tableLists, drawerStore, dialogStore} = data;
  const {onShowDetail, onOpenDialog, onCloseDialog} = actions;

  //模拟请求后获取的数据
  tableLists && tableLists.length ? null : (tableLists = [{
    name: '佩奇',
    _id: 111,
    enable: 'true',
    permissions: ['猪', '粉色', '猪', '粉色', '猪', '粉色', '猪', '粉色'],
    roles: ['管理员', '巡检人员', '仓管']
  }, {name: '柯南', _id: 222, tel: '1888888888', enable: 'false'}, {name: '小黄人', _id: 333}, {
    name: '小羊肖恩',
    _id: 444,
    enable: 'true'
  }, {name: '千寻', _id: 111}]);

  const ROLES = {
    超级管理员: 'super',
    管理员: 'admin',
    线上运营: 'manager',
    巡检人员: 'inspector',
    仓库管理员: 'storage',
  };
  const arr2 = ['超级管理员', '仓库管理员'];

  const renderContain = (row) => {
    return <div>
      {row.permissions ? row.permissions.map((item, index) =>
        <span> {item}</span>) : null}
      <div>
        {renderSelect(ROLES, arr2)}
      </div>
    </div>
  };

  const renderSelect = (ROLES, arr2,) => {

    return Object.keys(ROLES).map((item, index) => <div>
        <input
          checked={ arr2.find(a=>{
            console.log(a)
            return a==item
          }) }
          type="checkbox"/>
      <input checked={true} type="checkbox"/>
      <input checked={false} type="checkbox"/>

      {item}
      </div>
    )
  };
  const columns = [
    {
      name: 'id',
      render: row => row._id
    }, {
      name: '用户姓名',
      render: row => row.name
    }, {
      name: '手机号码',
      render: row => row.tel
    }, {
      name: '是否启用',
      render: row => <Switch toggled={row.enable}/>
    }, {
      name: '用户身份资料',
      render: row => <Button
        onClick={() => {
          onShowDetail(row._id);
        }}
      >打开详情</Button>
    }, {
      name: '巡检相关信息',
      render: row => <Button
        onClick={_ => {
          onShowDetail(row._id);
        }}
      >打开详情</Button>
    }, {
      name: '账户角色',
      render: row => <div>
        <span>{row.roles ? row.roles.map((item) => <span style={{marginRight: '4px'}}>{item}</span>) : '未分配'}</span>
        <Button
          onClick={_ => {
            // console.log(row.permissions);
            onOpenDialog('更改账户角色', renderContain(row),
              <Button
                onClick={() => {
                  onCloseDialog()
                }}
              >关闭</Button>)
          }}
        >更改</Button>
      </div>
    }, {
      name: '权限',
      render: row => <Button
        onClick={_ => {
          onOpenDialog('权限')
        }}
      >查看</Button>
    }, {
      name: '所属仓库',
      render: row => row.stationManager && row.stationManager.station ? 'row.stationManager.station' : '非仓库管理员'
    }];

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
      {connect(DialogFrameView, dialogStore)}
    </div>
  );
};

export default _ => connect(WorkFrameView, new UserMessageFrameStore());