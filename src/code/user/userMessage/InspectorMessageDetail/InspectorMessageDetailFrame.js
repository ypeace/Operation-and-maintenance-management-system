import React from 'react';
import connect from 'connect-store';
import InspectorMessageDetailFrameStore from './InspectorMessageDetailFrameStore';

import Button from '../../../../components/control/Button';
import Box from '../../../../components/layout/Box';
import ManyTableContainer from '../../../../components/layout/ManyTableContainer';
import RenderObj from '../../../../components/layout/RenderObj';
import DialogFrameView from '../../../../components/control/Dialog/DialogFrameView';
import TableSelected from '../../../../components/control/TableSelected';

import CheckBox from '../../../../components/control/CheckBox';

const InspectorMessageDetailView = ({data, actions}) => {
  let {InspectionPrices, result = {}, dialogStore, USER_IDENTITY_MAP, id, cities = [], projects} = data;
  const {onAddRolesRequest, onChangePriceRule, onOpenDialog, onCloseDialog, onChangeCity, onChangeShow, onGotoWork, onGooffWork, onAddProject, onDeleteProject} = actions;
  const {inspectorInfo = {}} = result;
//账户角色弹窗内容渲染
  const renderSelect = (nameList, targetArr, ID) => {
    return Object.values(nameList).map((item, index) => {
        const boolean = targetArr.find(a => {
          return a === item
        });
        return <div key={index}>
          <CheckBox
            key={index}
            label={item}
            onClick={() => {
              onAddRolesRequest(ID, index)
            }}
            checked={boolean}/>
        </div>
      }
    )
  };
  //更改城市
  const renderCities = (citiesList, targetArr, ID) => {
    return citiesList.map((item, index) => {
        const boolean = targetArr.find(a => {
          return a === item
        });
        return <div
          key={index}
        >
          <CheckBox
            key={index}
            label={item}
            onClick={() => {

              onChangeCity(ID, item)
            }}
            checked={boolean}/>
        </div>
      }
    )
  };

  const renderProjects = (projects, targetArr, ID) => {
    return projects.map((item, index) => {
        const boolean = targetArr.find(a => {
          return a.name === item.name
        });
        return <div
          key={index}
        >
          <CheckBox
            key={index}
            label={item.name}
            onClick={() => {
              if (boolean) {
                onDeleteProject(id, item._id)
                onCloseDialog()
              } else {
                onAddProject(id, item._id)
                onCloseDialog()
              }
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
          >设置身份</Button>
        </div>
      }
    }, {
      key: '所在城市',
      render: row => {
        return <div>
          <span>{inspectorInfo.city}</span>
          <Button
            onClick={_ => {
              onOpenDialog('更改账户角色', <div>{renderCities(cities, [inspectorInfo.city], id)}</div>,
                <Button
                  onClick={() => {
                    onCloseDialog()
                  }}
                >关闭</Button>)
            }}
          >分配城市</Button>
        </div>
      }

    },
    {
      key: '分配的巡检区',
      render: row => <div>{inspectorInfo.inspectionAreas ? inspectorInfo.inspectionAreas.map((item,index) => <span key = {index}
        style={{marginRight: '4px'}}>{item.name}</span>) : ''}</div>
    }, {
      key: '已分配的项目',
      render: row => <div>{inspectorInfo.acceptProjects ? inspectorInfo.acceptProjects.map((item,index) => <span  key = {index}
        style={{marginRight: '4px'}}>{item.name}</span>) : ''}
        <Button
          onClick={() => {
            const targetArr = inspectorInfo.acceptProjects ? inspectorInfo.acceptProjects : [];
            onOpenDialog('项目',
              renderProjects(projects, targetArr, id),
              <Button
                onClick={() => {
                  onCloseDialog()
                }}
              >取消</Button>)
          }}
        >重新分配</Button>
      </div>
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
            >关闭</Button>)
        }}
      >查看</Button>
    }];

  const renderPriceRule = (InspectionPrices, targetArr, id) => {
    const columnsPrice = [
      {
        name: '拖回单价',
        render:  row =>row.unit && row.unit.backToStation
      }, {
        name: '换电',
        render:  row =>row.unit && row.unit.backToStation
      }, {
        name: '回栏',
        render:  row =>row.unit && row.unit.backToStation
      }, {
        name: '难寻找到',
        render:  row =>row.unit && row.unit.backToStation
      }, {
        name: '投放',
        render: row => row.unit && row.unit.backToStation
      }, {
        name: '拖回未完成',
        render: row => row.unit && row.unit.backToStation
      }, {
        name: '错误换电',
        render:  row =>row.unit && row.unit.backToStation
      }, {
        name: '丢失电池',
        render: row => row.unit && row.unit.backToStation
      }
    ];
    return <div>
      <TableSelected
        columns={columnsPrice}
        dataSource={InspectionPrices}
        onClick = {(row)=>{
           const  priceRule = row.name;
            onChangePriceRule(id,priceRule)
          }}
      />
    </div>
  };

  const dataArr2 = [
    {
      key: '默认计价规则',
      render: row => <div>{inspectorInfo.defaultPriceRule}
        <Button
          onClick={() => {
            const targetArr = [inspectorInfo.defaultPriceRule];
            onOpenDialog('选择计价规则',
              renderPriceRule(InspectionPrices, targetArr, id),
              <Button
                onClick={() => {
                  onCloseDialog()
                }}
              >取消</Button>)
          }}
        >修改</Button>
      </div>
    },{
      key: '默认是否展示计费明细',
      render: _ => inspectorInfo.defaultIsShowPayment ? '√' : 'X'
    }, {
      key: '上/下班',
      render: _ => {
        return (inspectorInfo.processingInspectionOrder) ? <Button
          onClick={() => {
            onGooffWork(inspectorInfo.processingInspectionOrder && inspectorInfo.processingInspectionOrder._id)
          }}
        >截单下班</Button> : <Button
          onClick={() => {
            onGotoWork(id)
          }}
        >上班</Button>
      }

    }, {
      key: '是否正在巡检',
      render: _ => inspectorInfo.isWorking ? '是' : '否'

    }, {
      key: '当前分配的巡检区颜色',
      render: row => inspectorInfo.cert && inspectorInfo.cert.resolvedAt
    }, {
      key: '当前进行中的巡检订单',
      render: row => inspectorInfo.processingInspectionOrder && inspectorInfo.processingInspectionOrder._id
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
          title='巡检设置'/>
      </ManyTableContainer>
      {connect(DialogFrameView, dialogStore)}

    </Box>
  );
};

export default _ => connect(InspectorMessageDetailView, new InspectorMessageDetailFrameStore());