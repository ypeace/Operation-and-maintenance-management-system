import v1 from '../../v1';

export async function fetchInspectOrder({query = {}, limit, skip}) {
  return await v1({
    url: 'inspectionOrders',
    params: {
      query, limit, skip,
      selector: 'inspector city state price battery inspectedBikes statisticsOfProject statistic fixedStatistic payment times isShowPayment isEnableSelfOffWork',
      populateSelector: {
      }
    }
  });
}

// changeInspectorPrice
export async function changeInspectorPrice(id,obj) {
  console.log('_________',id,obj);
  return await v1({
    url: `inspectionOrder/${id}/price/inspectorPrice`,
    method:'PUT',
    data:{
      unit:obj
    }
  });
}

//changeAgentPrice
export async function changeAgentPrice(id,obj) {
  return await v1({
    url: `inspectionOrder/${id}/price/agentPrice`,
    method:'PUT',
    data:{
      unit:obj
    }
  });
}

//fixedStatistic
export async function fixedStatistic(id,obj) {
  return await v1({
    url: `inspectionOrder/${id}/fixedStatistic`,
    method:'PUT',
    data:{
      fixedStatistic :obj
    }
  });
}

export async function fetchInspectById(id) {
  return await v1({
    url: `inspectionOrder/${id}`,
    params: {
      selector: 'price inspector fixedStatistic',
      populateSelector: {
      }
    }
  });
}

//设置默认是否展示计费明细
export async function changeShow({id,isShowPayment}) {
  return await v1({
    url: `inspectionOrder/${id}/isShowPayment`,
    method:'PUT',
    data:{
      isShowPayment
    }
  });
}

//是否自行上下班
export async function isEnableSelfOffWork({id,enableSelfOffWork}) {
  return await v1({
    url: `inspectionOrder/${id}/isEnableSelfOffWork`,
    method:'PUT',
    data:{
      isEnableSelfOffWork:enableSelfOffWork
    }
  });
}

//结算
export async function settle(id) {
  return await v1({
    url: `inspectionOrder/${id}/settle`,
    method:'PUT',
  });
}

//changeState
export async function changeState(id,state) {
  return await v1({
    url: `inspectionOrder/${id}/${state}`,
    method:'PUT',
  });
}

export async function fetchInspectOrderById({id}) {
  return await v1({
    url: `inspectionOrders/${id}`,
    params: {
      selector: 'inspector city state price battery inspectedBikes statisticsOfProject statistic fixedStatistic payment times isShowPayment isEnableSelfOffWork',
      populateSelector: {

      }
    }
  });
}
//是否启用
export async function setEnable({id,enable}) {
  return await v1({
    url: `project/${id}/enable`,
    method:'PUT',
    data:{
      enable
    }
  });
}

export async function fetchInspectorDetailById ({id}) {
  return await v1({
    url: `inspectionOrders/${id}`,
    params: {
      selector: 'inspectorDetail city price battery inspectedBikes finish offWork releasedTasks addedTasks finalInvalidTasks statisticsOfProject statistic fixedStatistic payment isEnableSelfOffWork times',
      populateSelector: {}
    }
  });
}

//角色改变
//user/{id}/inspector/identity
export async function addRoles({id,identity}) {
  return await v1({
    url: `user/${id}/inspector/identity`,
    method:'PUT',
    data:{
      identity
    }
  });
}

export async function deleteRoles({id,manager}) {
  return await v1({
    url: `station/${id}/manager`,
    method:'DELETE',
    data:{
      manager
    }
  });
}

//changeCorrectionValue
export async function changeCorrectionValue({id,batteryCountCorrectionValue}) {
  return await v1({
    url: `project/${id}/batteryCountCorrectionValue`,
    method:'PUT',
    data:{
      batteryCountCorrectionValue
    }
  });
}