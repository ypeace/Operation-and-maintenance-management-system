import React from 'react';
import connect from 'connect-store';
import UserMessageFrameStore from './UserMessageFrameStore';

import DrawerFrameView from '../../../code/drawer/DrawerFrameView';
import Box from '../../../components/layout/Box';
import Container from '../../../components/layout/Container';
import NavContainer from '../../../components/layout/NavContainer';

import Table from '../../../components/layout/Table';
import Button from '../../../components/control/Button';
import Switch from '../../../components/control/Switch';
import ManyInput from '../../../components/control/ManyInput';
import ChangeInput from '../../../components/control/ChangeInput';
import DialogFrameView from '../../../components/control/Dialog/DialogFrameView'
import CheckBox from '../../../components/control/CheckBox';
import Pagination from '../../../components/control/Pagination';
import './style.less'

const WorkFrameView = ({data, actions}) => {
  let {tableLists, drawerStore, dialogStore, ROLES, ROLES_MAP, queryFactoryStore, USER_IDENTITY_MAP} = data;
  const {onShowUserDetail, onShowIspectorDetail, onOpenDialog, onCloseDialog, onAddRolesRequest, onDeleteRolesRequest, onSetAccountRoot, onAddRoot, onChangeQuery} = actions;

  /*tableLists.length ? */tableLists = [{name: '小猪佩奇', tell: '111111111', roles: ['超级管理员'],}]/* : null;*/
//账户角色弹窗内容渲染
  const renderSelect = (roles, targetArr, id) => {
    return Object.values(roles).map((item, index) => {
        const boolean = targetArr.find(a => {
          return a === ROLES[item]
        });
        return <div
          key={index}
        >
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
        <span>权限管理：{row.permissions && row.permissions.length ? row.permissions.map((item, index) => <span
          key={index}
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
          }}
          toggled={row.enable}
        />)
      }
    }, {
      name: '账户角色',
      render: row => <div>
        <span>{row.roles ? row.roles.map((item, index) => <span
          key={index}
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
      name: '用户信息',
      render: row => <Button
        onClick={() => {
          onShowUserDetail(row._id);
        }}
      >详细身份资料</Button>
    }, {
      name: '身份-上下班',
      render: row => <div>
        <span>{USER_IDENTITY_MAP[row.inspectorInfo && row.inspectorInfo.identity]}</span>-
        <span>
          {row.inspectorInfo && row.inspectorInfo.processingInspectionOrder && row.inspectorInfo.processingInspectionOrder._id ? '上班中' : '下班'}
        </span>
      </div>
    }, {
      name: '巡检信息',
      render: row => <Button
        onClick={() => {
          onShowIspectorDetail(row._id);
        }}
      >巡检管理</Button>
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

  const workArr = ['上班', '下班'];
  const rolesArr = ['超级管理员', '管理员', '线上运营', '巡检人员', '仓库管理员'];
  const inspectorsArr = ['司机', '白班', '公关', '候命', '高手']

  return (
    <div>
      <Box>
        <NavContainer>
          <div>
            <ChangeInput
              name="姓名"
              parameter='name'
              onClick={(key, value) => {
                onChangeQuery(key, value)
              }}
            />
            <ChangeInput
              name="电话号码"
              parameter='tel'
              onClick={(key, value) => {
                onChangeQuery(key, value)
              }}
            />
            <ManyInput
              name="在班状态"
              arr={workArr}
              parameter='inspectorInfo.processingInspectionOrder'
              onClick={(key, value) => {
                // onChangeQuery(key,value)
              }}
            />
            <ManyInput
              name="账户角色"
              arr={rolesArr}
              parameter='inspectorInfo.identity'
              onClick={(key, value) => {
                // const index = rolesArr.findIndex(a=>a===value);
                // onChangeQuery(key,index)
              }}
            />
            <ManyInput
              name="巡检人员类型"
              arr={inspectorsArr}
              parameter='inspectorInfo.identity'
              onClick={(key, value) => {
                // const index = rolesArr.findIndex(a=>a===value);
                // onChangeQuery(key,index)
              }}
            />

          </div>
        </NavContainer>
        <Container>
          {tableLists.length ?
            <Table
              columns={columns}
              dataSource={tableLists}
            /> : <div
              style={{minHeight: '460px'}}
            >没有更多数据了</div>}
        </Container>

        <Container>
          {connect(Pagination, queryFactoryStore)}
        </Container>
      </Box>
      {connect(DrawerFrameView, drawerStore)}
      {connect(DialogFrameView, dialogStore)}
    </div>
  )
};

export default _ => connect(WorkFrameView, new UserMessageFrameStore());