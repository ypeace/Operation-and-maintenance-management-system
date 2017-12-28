import v1 from './../v1';

export async function fetchUserLists({query = {}, limit = 20, skip, sort = {_id: -1}}) {
  return await v1({
    url: '/v1/users',
    params: {
      query, limit, skip, sort,
      selector: 'enable tel name roles permissions avatar idCardInfo inspectorInfo stationManager',
      populateSelector: {
        'stationManager.station': 'name'
      }
    }
  });
}

export async function fetchUserDetailById({id}) {
  return await v1({
    url: `/v1/user/${id}`,
    params: {
      selector: 'enable tel name roles permissions avatar idCardInfo inspectorInfo stationManager',
      populateSelector: {}
    }
  });
}
//角色改变
export async function addRoles({id,role}) {
  return await v1({
    url: `/v1/user/${id}/role/${role}`,
    method:'POST'
  });
}

export async function deleteRoles({id,role}) {
  return await v1({
    url: `/v1/user/${id}/role/${role}`,
    method:'DELETE'
  });
}
//是否启用
export async function accountRoot({id,enable}) {
  return await v1({
    url: `/v1/user/${id}/enable`,
    method:'PUT',
    data:{
      enable
    }
  });
}

//增加权限
export async function addRoot({id,permission}) {
  return await v1({
    url: `v1/user/${id}/permission/${permission}`,
    method:'POST',
  });
}