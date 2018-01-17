import React from 'react';
import connect from 'connect-store';
import OrderPriceFrameStore from './OrderPriceFrameStore';

import Button from '../../../components/control/Button';
import Box from '../../../components/layout/Box';
import ManyTableContainer from '../../../components/layout/ManyTableContainer';
import RenderObj from '../../../components/layout/RenderObj';
import DialogFrameView from '../../../components/control/Dialog/DialogFrameView';
import ChangeInput from '../../../components/control/ChangeInput';
import Switch from '../../../components/control/Switch'
import CheckBox from '../../../components/control/CheckBox';

const InspectorMessageDetailView = ({data, actions}) => {
  const {result = {}, dialogStore} = data;
  const {onChangeInspectorPrice, onChangeAgentPrice, onFixedStatistic} = actions;
  const {price = {}, fixedStatistic = {}} = result;

  const dataArr1 = [
    {
      key: '拖回单价',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.backToStation}
        parameter={'backToStation'}
        onClick={(parameter, value) => {
          console.log(parameter, value)
          onChangeInspectorPrice(parameter, value)
        }}
      />
    }, {
      key: '换电',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.changeBattery}
        parameter={'changeBattery'}
        onClick={(parameter, value) => {
          onChangeInspectorPrice(parameter, value)
        }}
      />
    }, {
      key: '回栏',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.moveInServiceArea}
        parameter={'moveInServiceArea'}
        onClick={(parameter, value) => {
          onChangeInspectorPrice(parameter, value)
        }}
      />
    }, {
      key: '难寻找到',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.hardToFind}
        parameter={'hardToFind'}
        onClick={(parameter, value) => {
          onChangeInspectorPrice(parameter, value)
        }}
      />
    }, {
      key: '投放',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.putOn}
        parameter={'putOn'}
        onClick={(parameter, value) => {
          onChangeInspectorPrice(parameter, value)
        }}
      />
    }, {
      key: '普通任务',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.normal}
        parameter={'normal'}
        onClick={(parameter, value) => {
          onChangeInspectorPrice(parameter, value)
        }}
      />
    }, {
      key: '拖回未完成',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.backToStationUnfinished}
        parameter={'backToStationUnfinished'}
        onClick={(parameter, value) => {
          onChangeInspectorPrice(parameter, value)
        }}
      />
    }, {
      key: '错误换电',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.changeBatteryMistake}
        parameter={'changeBatteryMistake'}
        onClick={(parameter, value) => {
          onChangeInspectorPrice(parameter, value)
        }}
      />
    }, {
      key: '丢失电池',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.lostBattery}
        parameter={'lostBattery'}
        onClick={(parameter, value) => {
          onChangeInspectorPrice(parameter, value)
        }}
      />
    },];

  const dataArr2 = [
    {
      key: '拖回单价',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.backToStation}
        parameter={'backToStation'}
        onClick={(parameter, value) => {
          onChangeAgentPrice(parameter, value)
        }}
      />
    }, {
      key: '换电',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.changeBattery}
        parameter={'changeBattery'}
        onClick={(parameter, value) => {
          onChangeAgentPrice(parameter, value)
        }}
      />
    }, {
      key: '回栏',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.moveInServiceArea}
        parameter={'moveInServiceArea'}
        onClick={(parameter, value) => {
          onChangeAgentPrice(parameter, value)
        }}
      />
    }, {
      key: '难寻找到',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.hardToFind}
        parameter={'hardToFind'}
        onClick={(parameter, value) => {
          onChangeAgentPrice(parameter, value)
        }}
      />
    }, {
      key: '投放',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.putOn}
        parameter={'putOn'}
        onClick={(parameter, value) => {
          onChangeAgentPrice(parameter, value)
        }}
      />
    }, {
      key: '普通任务',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.normal}
        parameter={'normal'}
        onClick={(parameter, value) => {
          onChangeAgentPrice(parameter, value)
        }}
      />
    }, {
      key: '拖回未完成',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.backToStationUnfinished}
        parameter={'backToStationUnfinished'}
        onClick={(parameter, value) => {
          onChangeAgentPrice(parameter, value)
        }}
      />
    }, {
      key: '错误换电',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.changeBatteryMistake}
        parameter={'changeBatteryMistake'}
        onClick={(parameter, value) => {
          onChangeAgentPrice(parameter, value)
        }}
      />
    }, {
      key: '丢失电池',
      render: _ => <ChangeInput
        defaultValue={price.inspector && price.inspector.lostBattery}
        parameter={'lostBattery'}
        onClick={(parameter, value) => {
          onChangeAgentPrice(parameter, value)
        }}
      />
    },];

  const dataArr3 = [

    {
      key: '巡检总数',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.total}
        parameter={'total'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    }, {
      key: '找到数',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.found}
        parameter={'found'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    }, {
      key: '拖回数',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.backToStation}
        parameter={'backToStation'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    }, {
      key: '换电数',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.changeBattery}
        parameter={'changeBattery'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    }, {
      key: '回栏数',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.moveInServiceArea}
        parameter={'moveInServiceArea'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    }, {
      key: '难寻找到数',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.hardToFindButFound}
        parameter={'hardToFindButFound'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    }, {
      key: '投放数',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.putOn}
        parameter={'putOn'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    }, {
      key: '普通任务',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.normal}
        parameter={'normal'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    }, {
      key: '未完成拖回数',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.backToStationUnfinished}
        parameter={'backToStationUnfinished'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    }, {
      key: '错误换电数',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.changeBatteryMistake}
        parameter={'changeBatteryMistake'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    }, {
      key: '丢失电池数',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.lostBattery}
        parameter={'lostBattery'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    }, {
      key: '巡检里程',
      render: _ => <ChangeInput
        defaultValue={fixedStatistic.mileage}
        parameter={'mileage'}
        onClick={(parameter, value) => {
          onFixedStatistic(parameter, value)
        }}
      />
    },];

  return (
    <Box>
      <ManyTableContainer>
        <RenderObj
          dataArr={dataArr1}
          title='巡检人员的计价规则'/>
        <RenderObj
          dataArr={dataArr2}
          title='代理的计价规则'/>
      </ManyTableContainer>
      <ManyTableContainer>
        <RenderObj
          dataArr={dataArr3}
          title='修正统计巡检数据'/>
      </ManyTableContainer>
      {connect(DialogFrameView, dialogStore)}

    </Box>
  );
};

export default _ => connect(InspectorMessageDetailView, new OrderPriceFrameStore());