import v1 from '../../v1';

export async function fetchOperate({query = {}, limit = 20, skip, sort = {_id: -1}}) {
  return await v1({
    url: 'stations',
    params: {
      query, limit, skip, sort,
      selector: 'city batteryCountCorrectionValue name enable managers location',
      populateSelector: {
        managers:'name'
      }
    }
  });
}

//创建运营站
export async function addStation({city,name,lngLat}) {
  return await v1({
    url: `station`,
    method:'POST',
    data:{
      city,name,lngLat
    }
  });
}
//addProject
export async function addProject({city,name,noParser}) {
  return await v1({
    url: `project`,
    method:'POST',
    data:{
      city,name,noParser
    }
  });
}

//是否启用
export async function setEnable({id,enable}) {
  return await v1({
    url: `station/${id}/enable`,
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
