import React from 'react';
import connect from 'connect-store';
import OperateFrameStore from './OperateFrameStore';

import DrawerFrameView from '../../code/drawer/DrawerFrameView';
import Box from '../../components/layout/Box';
import Container from '../../components/layout/Container';
import Table from '../../components/layout/Table';
import Button from '../../components/control/Button';
import Switch from '../../components/control/Switch';
import ChangeInput from '../../components/control/ChangeInput';
import DialogFrameView from '../../components/control/Dialog/DialogFrameView'
import CheckBox from '../../components/control/CheckBox';
import CreateOperate from  './CreateOperate';
import CreateProject from "../project/CreateProject/CreateProject";

const WorkFrameView = ({data, actions}) => {
  let {tableLists, drawerStore, dialogStore, ROLES, nameList, roots} = data;
  const {onSetEnable, onChangeStation, onShowUserDetail, onShowIspectorDetail, onOpenDialog, onCloseDialog, onAddRolesRequest, onDeleteRolesRequest, onSetAccountRoot, onAddRoot,onRefresh} = actions;

  //模拟请求后获取的数据
  tableLists && tableLists.length ? null : tableLists = [{
    name: '佩奇',
    _id: 111,
    enable: 'true',
    permissions: ['猪', '粉色', '猪', '粉色', '猪', '粉色', '猪', '粉色'],
    roles: ['管理员', '巡检人员', '仓库管理员']
  }];

//账户角色弹窗内容渲染
  const renderSelect = (nameList, targetArr, ID) => {
    return Object.values(nameList).map((item, index) => {
        const boolean = targetArr.find(a => {
          return a.name === item.name
        });
        const id = item._id;

        return <div
          key={index}
        >
          <CheckBox
            key={index}
            label={item.name}
            onClick={() => {
              if (boolean) {
                onDeleteRolesRequest(ID, id)
              } else {
                onAddRolesRequest(ID, id)
              }
            }}
            checked={boolean}/>
        </div>
      }
    )
  };

  const renderPermission = (row) => {
    return <div>
      <div>
        <span>权限管理：{row.permissions && row.permissions.length ? row.permissions.map((item) => <span
          style={{marginRight: '5px'}}>{item}</span>) : '没有额外的权限'}</span>
      </div>
      <br/><br/>
      <div>
        <ChangeInput
          name='增加权限'
          defaultValue='请输入文字'
          parameter={row._id}
          onClick={(id, value) => {
            value ? onAddRoot(id, value) : ''
          }}
        />
      </div>
    </div>
  };

  const columns = [
    {
      name: 'id',
      render: row => row._id
    }, {
      name: '仓库名称',
      render: row => row.name
    }, {
      name: '城市',
      render: row => row.city
    }, {
      name: '是否启用',
      render: (row) => {
        return (<Switch
          onToggle={() => {
            onSetEnable(row._id, !row.enable)
          }}
          toggled={row.enable}
        />)
      }
    }, {
      name: '库管',
      render: row => <div>
         <span>{row.managers ? row.managers.map((item,index) =>
           <span key = {index} style={{marginRight: '4px'}}>{item && item.name}</span>) : '未分配'}</span>
        <Button
          onClick={_ => {
            onChangeStation();
            onOpenDialog('添加库管', <div>{renderSelect(nameList, row.managers, row._id)}</div>,
              <Button
                onClick={() => {
                  onCloseDialog()
                }}
              >关闭</Button>)
          }}
        >更改</Button>
      </div>
    }, {
      name: '仓库地址',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('仓库地址',
            <div><img
              src={'http://qq.5068.com/uploads/allimg/131226/1332051141-7.jpg'}/>
            </div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
        }}
      >查看</Button>
    }];

  const show = roots.find(a => a === 'manager' || a === 'super');
  const createOperate= ()=>{
    return <CreateOperate
      onCloseDialog = {onCloseDialog}
      refresh = {onRefresh }
    />
  };
  return (
    <div>
      <Box>
        <Container>
          {show ? <Button
            onClick = {_=>{
              onOpenDialog('添加库管', <div>{createOperate()}</div>,
               null)
            }}
          >创建运营站</Button> : null}
        </Container>

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

export default _ => connect(WorkFrameView, new OperateFrameStore());