import React from 'react';
import connect from 'connect-store';
import ProjectFrameStore from './ProjectFrameStore';

import DrawerFrameView from '../../code/drawer/DrawerFrameView';
import Box from '../../components/layout/Box';
import Container from '../../components/layout/Container';
import Table from '../../components/layout/Table';
import Button from '../../components/control/Button';
import Switch from '../../components/control/Switch';
import ChangeInput from '../../components/control/ChangeInput';
import DialogFrameView from '../../components/control/Dialog/DialogFrameView'
import CheckBox from '../../components/control/CheckBox';
import Input from '../../components/control/Input';
import TextField from '../../components/control/TextField';
import CreateProject from './CreateProject/CreateProject'

const WorkFrameView = ({data, actions}) => {
  const {tableLists, drawerStore, dialogStore,} = data;
  const {onSetEnable, onShowUserDetail, onOpenDialog, onCloseDialog, onChangeCorrectionValue, onRefresh} = actions;

  const renderPermission = (row) => {
    return <div>
      <div>
        <span>当前值：{row.batteryCountCorrectionValue}</span>
      </div>
      <br/><br/>
      <div>
        <ChangeInput
          name='更改为'
          defaultValue='请输入文字'
          parameter={row._id}
          onClick={(id, value) => {
            value ? onChangeCorrectionValue(id, value) : ''
          }}
        />
      </div>
    </div>
  };

  const renderInput = () => {
    return <div>
      <CreateProject
        closeDialog={onCloseDialog}
        refresh={onRefresh}
      />
    </div>
  };
  const columns = [
    /*{
      name: 'id',
      render: row => row._id
    },*/ {
      name: '城市',
      render: row => row.name
    }, {
      name: '项目名称',
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
      name: '电池修正值',
      render: row => <div>
        <span style={{marginRight: '10px'}}>{row.batteryCountCorrectionValue}</span>
        <Button
          onClick={_ => {
            onOpenDialog('添加库管', renderPermission(row),
              <Button
                onClick={() => {
                  onCloseDialog()
                }}
              >取消</Button>)
          }}
        >修正</Button>
      </div>
    }, {
      name: '解析规则',
      render:row => row.settings&&row.settings.noParser
    }/* {
      name: '配置',
      render: row => <Button
        onClick={_ => {
          onShowUserDetail(row._id)
        }}
      >查看详细详情</Button>
    }*/];

  return (
    <div>
      <Box>
        <Container>
          <Button
            onClick={() => {
              onOpenDialog('创建项目', renderInput(), null)
            }}
          >创建项目</Button>
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

export default _ => connect(WorkFrameView, new ProjectFrameStore());