import v1 from '../../v1';

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
      populateSelector: {
        'inspectorInfo.inspectionAreas':'name',
        'inspectorInfo.acceptProjects':'name'
      }
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

//吊销认证
export async function deleteIdcard(id) {
  return await v1({
    url: `/v1/user/${id}/idCard/revoke`,
    method:'DELETE'
  });

}

//通过认证
export async function passIdcard(id) {
  return await v1({
    url: `/v1/user/${id}/idCard/resolve`,
    method:'PUT'
  });
}

//驳回认证
export async function rejectIdcard({id,reason}) {
  return await v1({
    url: `/v1/user/${id}/idCard/reject`,
    method:'PUT',
    data:{
      reason
    }
  });
}
//是否通过审核才能巡检
export async function isMustResolveRequest({id,isMustResolve}) {
  return await v1({
    url: `/v1/user/${id}/isMustResolve`,
    method:'PUT',
    data:{
      isMustResolve
    }
  });
}

//通过认证
export async function passInspector(id) {
  return await v1({
    url: `/v1/user/${id}/inspector/cert/resolve`,
    method:'PUT'
  });
}
//驳回认证
export async function rejectInspector({id,reason}) {
  return await v1({
    url: `/v1/user/${id}/inspector/cert/reject`,
    method:'PUT',
    data:{
      reason
    }
  });
}