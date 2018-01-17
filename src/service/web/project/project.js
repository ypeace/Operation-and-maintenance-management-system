import v1 from '../../v1';

export async function fetchProject({query = {}, limit = 20, skip, sort = {_id: -1}}) {
  return await v1({
    url: 'projects',
    params: {
      query, limit, skip, sort,
      selector: 'name city enable batteryCountCorrectionValue settings',
      populateSelector: {

      }
    }
  });
}

export async function fetchProjectById({id}) {
  return await v1({
    url: `projects/${id}`,
    params: {
      selector: 'settings',
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
export async function addRoles({id,manager}) {
  return await v1({
    url: `station/${id}/manager`,
    method:'POST',
    data:{
      manager
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