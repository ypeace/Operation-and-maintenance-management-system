import React from 'react';
import connect from 'connect-store';
import UserMessageFrameStore from './UserMessageFrameStore';

import DrawerFrameView from '../../../code/drawer/DrawerFrameView';
import Box from '../../../components/layout/Box';
import Container from '../../../components/layout/Container';
import Table from '../../../components/layout/Table';
import Button from '../../../components/control/Button';
import Switch from '../../../components/control/Switch';
import ChangeInput from '../../../components/control/ChangeInput';
import DialogFrameView from '../../../components/control/Dialog/DialogFrameView'
import CheckBox from '../../../components/control/CheckBox';

const WorkFrameView = ({data, actions}) => {
  let {tableLists, drawerStore, dialogStore, ROLES, ROLES_MAP} = data;
  const {onShowUserDetail, onShowIspectorDetail,onOpenDialog, onCloseDialog, onAddRolesRequest, onDeleteRolesRequest, onSetAccountRoot, onAddRoot} = actions;

  //模拟请求后获取的数据
  tableLists && tableLists.length ? null : (tableLists = [{
    name: '佩奇',
    _id: 111,
    enable: 'true',
    permissions: ['猪', '粉色', '猪', '粉色', '猪', '粉色', '猪', '粉色'],
    roles: ['管理员', '巡检人员', '仓库管理员']
  }, {name: '柯南', _id: 222, tel: '1888888888', enable: 'false'}, {name: '小黄人', _id: 333}, {
    name: '小羊肖恩',
    _id: 444,
    enable: 'true'
  }, {name: '千寻', _id: 111}]);

//账户角色弹窗内容渲染
  const renderSelect = (roles, targetArr, id) => {
    return Object.values(roles).map((item, index) => {
        const boolean = targetArr.find(a => {
          return a === ROLES[item]
        });
        return <div>
          <CheckBox
            key={index}
            label={item}
            onClick={() => {
              if (boolean) {
                onDeleteRolesRequest(id, ROLES[item])
              } else {
                onAddRolesRequest(id, ROLES[item])
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
        <span>权限管理：{row.permissions&&row.permissions.length ? row.permissions.map((item) => <span
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
      name: '用户姓名',
      render: row => row.name
    }, {
      name: '手机号码',
      render: row => row.tel
    }, {
      name: '是否启用',
      render: (row) => {
        return (<Switch
          onToggle={() => {
            onSetAccountRoot(row._id, !row.enable)
          }
          }
          toggled={row.enable}
        />)
      }
    }, {
      name: '账户角色',
      render: row => <div>
        <span>{row.roles ? row.roles.map((item) => <span
          style={{marginRight: '4px'}}>{ROLES_MAP[item]}</span>) : '未分配'}</span>
        <Button
          onClick={_ => {
            onOpenDialog('更改账户角色', <div>{renderSelect(ROLES_MAP, row.roles, row._id)}</div>,
              <Button
                onClick={() => {
                  onCloseDialog()
                }}
              >关闭</Button>)
          }}
        >更改</Button>
      </div>
    }, {
      name: '身份证认证',
      render: row => <Button
        onClick={() => {
          onShowUserDetail(row._id);
        }}
      >查看详细</Button>
    }, {
      name: '巡检信息',
      render: row => <Button
        onClick={() => {
          onShowIspectorDetail(row._id);
        }}
      >查看详情</Button>
    }, {
      name: '权限',
      render: row => <div>
        <Button
          onClick={_ => {
            onOpenDialog('权限', renderPermission(row), <Button
              onClick={() => {
                onCloseDialog()
              }}
            >关闭</Button>)
          }}
        >查看</Button></div>
    }, {
      name: '所属仓库',
      render: row => row.stationManager && row.stationManager.station && row.stationManager.station.name ? row.stationManager.station.name : '无所属仓库'
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