import React from 'react';
import connect from 'connect-store';
import InspectorMessageDetailFrameStore from './InspectorMessageDetailFrameStore';

import Button from '../../../../components/control/Button';
import Box from '../../../../components/layout/Box';
import ManyTableContainer from '../../../../components/layout/ManyTableContainer';
import RenderObj from '../../../../components/layout/RenderObj';
import DialogFrameView from '../../../../components/control/Dialog/DialogFrameView';
import ChangeInput from '../../../../components/control/ChangeInput';
import Switch from '../../../../components/control/Switch'
import CheckBox from '../../../../components/control/CheckBox';

const InspectorMessageDetailView = ({data, actions}) => {
  let {show, onOff, result = {}, dialogStore, USER_IDENTITY_MAP, id} = data;
  const {onToggleDialog, onChangeSwitch, onOpenDialog, onCloseDialog,} = actions;

  const {idCardInfo = {}, inspectorInfo = {}} = result;


//账户角色弹窗内容渲染
  const renderSelect = (roles, targetArr, id) => {
    return Object.values(roles).map((item, index) => {
        const boolean = targetArr.find(a => {
          return a === USER_IDENTITY_MAP[item]
        });
        return <div>
          <CheckBox
            key={index}
            label={item}
            onClick={() => {
              // if (boolean) {
              //   onDeleteRolesRequest(id, ROLES[item])
              // } else {
              //   onAddRolesRequest(id, ROLES[item])
              // }
            }}
            checked={boolean}/>
        </div>
      }
    )
  };

  const dataArr1 = [
    {
      key: '身份',
      render: _ => {
        const role = USER_IDENTITY_MAP[inspectorInfo.identity] ? USER_IDENTITY_MAP[inspectorInfo.identity] : '';
        return <div>
          <span>{role}</span>
          <Button
            onClick={_ => {
              onOpenDialog('更改账户角色', <div>{renderSelect(USER_IDENTITY_MAP, [role], id)}</div>,
                <Button
                  onClick={() => {
                    onCloseDialog()
                  }}
                >关闭</Button>)
            }}
          >更改</Button>
        </div>
      }
    }, {
      key: '所在城市',
      render: row => inspectorInfo.city
    },
    {
      key: '分配的巡检区',
      render: row => <div>{inspectorInfo.inspectionAreas ? inspectorInfo.inspectionAreas.map(item => <span
        style={{marginRight: '4px'}}>{item.name}</span>) : ''}</div>
    }, {
      key: '分配的任务组',
      render: row => inspectorInfo.acceptTaskGroups && inspectorInfo.acceptTaskGroups.map(item => <span style={{marginRight: '4px'}}>{item.name}</span>)
    }, {
      key: '分配的项目',
      render: row => <div>{inspectorInfo.acceptProjects ? inspectorInfo.acceptProjects.map(item => <span
        style={{marginRight: '4px'}}>{item.name}</span>) : ''}</div>
    }, {
      key: '位置快照',
      render: _ => <Button
        onClick={_ => {
          onOpenDialog('位置快照',
            <div><img src=''/></div>,
            <Button
              onClick={() => {
                onCloseDialog()
              }}
            >查看</Button>)
        }}
      >查看</Button>
    }];

  const dataArr2 = [
    {
      key: '默认计价规则',
      render: _ => null
    }, {
      key: '默认的代理计价规则',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.state
    }, {
      key: '上班',
      render: _ => <Button>上班</Button>

    },{
      key: '默认是否展示巡检订单的计费明细',
      render: (row) => {
        return (<Switch
          onToggle={() => {
            console.log(111)
          }}
          toggled={row}
        />)
      }
    }, {
      key: '是否正在巡检',
      render: (row) => {
        return (<Switch
          onToggle={() => {
            console.log(111)
          }}
          toggled={row}
        />)
      }
    }, {
      key: '是否可以自行上下班',
      render: (row) => {
        return (<Switch
          onToggle={() => {
            console.log(111)
          }}
          toggled={row}
        />)
      }
    },{
      key: '是否结算',
      render: (row) => {
        return (<Switch
          onToggle={() => {
            console.log(111)
          }}
          toggled={row}
        />)
      }
    }, {
      key: '当前分配的巡检区颜色',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.resolvedAt
    }, {
      key: '当前进行中的巡检订单',
      render: row => inspectorInfo && inspectorInfo.cert && inspectorInfo.cert.rejectReason
    }];

  return (
    <Box>
      <ManyTableContainer>
        <RenderObj
          dataArr={dataArr1}
          title='巡检信息'/>

      </ManyTableContainer>
      <ManyTableContainer>
        <RenderObj
          dataArr={dataArr2}
          title='巡检认证信息'/>
      </ManyTableContainer>
      {connect(DialogFrameView, dialogStore)}

    </Box>
  );
};

export default _ => connect(InspectorMessageDetailView, new InspectorMessageDetailFrameStore());