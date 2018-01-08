import v1 from '../../v1';

export async function fetchUserLists({query = {}, skip, sort,limit}) {
  return await v1({
    url: 'users',
    params: {
      query, skip, sort,limit,
      selector: 'enable tel name roles permissions avatar idCardInfo inspectorInfo stationManager',
      populateSelector: {
        'stationManager.station': 'name'
      }
    }
  });
}
//fetchInspectionPriceRules
export async function fetchInspectionPriceRules( ) {
  return await v1({
    url: 'inspectionPriceRules',
    params: {
      selector: 'unit name enable',
    }
  });
}
//changePriceRules
export async function changePriceRules({id,priceRule}) {
  return await v1({
    url: `user/${id}/inspector/defaultPriceRule`,
    method:'PUT',
    data:{
      priceRule
    }
  });
}

//fetchInspectionPrices
export async function fetchInspectionPrices( ) {
  return await v1({
    url: 'inspectionPriceRules',
    params: {
      selector: 'unit name enable',
    }
  });
}

//修该分配的项目   deleteProject,
export async function addProject({userId,id}) {
  return await v1({
    url: `user/${userId}/inspector/acceptProject/${id}`,
    method:'POST'
  });
}
export async function deleteProject({userId,id}) {
  return await v1({
    url: `user/${userId}/inspector/acceptProject/${id}`,
    method:'DELETE'
  });
}
//获取城市列表
export async function fetchCities() {
  return await v1({
    url: 'cities',
  });
}
//fetchProjects
export async function fetchProjects() {
  return await v1({
    url: 'projects',
    params: {
      selector: 'name',
    }
  });
}


//changeCity insepctionArea/{id}/city
export async function changeCity({id,city}) {
  return await v1({
    url: `user/${id}/inspector/city`,
    method:'PUT',
    data:{
      city
    }
  });
}



export async function fetchUserNames({query = {}, limit = 20, skip, sort = {_id: -1}}) {
  return await v1({
    url: 'users',
    params: {
      query, limit, skip, sort,
      selector: ' name',
      populateSelector: {
      }
    }
  });
}


export async function fetchUserDetailById({id}) {
  return await v1({
    url: `user/${id}`,
    params: {
      selector: 'enable tel name roles permissions avatar idCardInfo inspectorInfo stationManager',
      populateSelector: {
        'inspectorInfo.inspectionAreas':'name',
        'inspectorInfo.acceptProjects':'name'
      }
    }
  });
}

export async function addInspectorRoles({id,identity}) {
  return await v1({
    url: `user/${id}/inspector/identity`,
    method:'PUT',
    data:{
      identity
    }
  });
}

//角色改变
export async function addRoles({id,role}) {
  return await v1({
    url: `user/${id}/role/${role}`,
    method:'POST'
  });
}

export async function deleteRoles({id,role}) {
  return await v1({
    url: `user/${id}/role/${role}`,
    method:'DELETE'
  });
}

//是否启用
export async function accountRoot({id,enable}) {
  return await v1({
    url: `user/${id}/enable`,
    method:'PUT',
    data:{
      enable
    }
  });
}
//goWork 上班
export async function goWork(userId) {
  return await v1({
    url: `inspectionOrder`,
    method:'POST',
    data:{
      userId
    }
  });
}

//下班
export async function offWork(id) {
  return await v1({
    url: `inspectionOrder/${id}/finish`,
    method:'PUT',
  });
}


//自行上班
export async function creatInspectionOrder({id,isEnableSelfOffWork}) {
  return await v1({
    url: `inspectionOrder/${id}/isEnableSelfOffWork`,
    method:'POST',
    data:{
      isEnableSelfOffWork
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

//增加权限
export async function addRoot({id,permission}) {
  return await v1({
    url: `user/${id}/permission/${permission}`,
    method:'POST',
  });
}

//吊销认证
export async function deleteIdcard(id) {
  return await v1({
    url: `user/${id}/idCard/revoke`,
    method:'DELETE'
  });

}

//通过认证
export async function passIdcard(id) {
  return await v1({
    url: `user/${id}/idCard/resolve`,
    method:'PUT'
  });
}

//驳回认证
export async function rejectIdcard({id,reason}) {
  return await v1({
    url: `user/${id}/idCard/reject`,
    method:'PUT',
    data:{
      reason
    }
  });
}
//是否通过审核才能巡检
export async function isMustResolveRequest({id,isMustResolve}) {
  return await v1({
    url: `user/${id}/isMustResolve`,
    method:'PUT',
    data:{
      isMustResolve
    }
  });
}

//通过认证
export async function passInspector(id) {
  return await v1({
    url: `user/${id}/inspector/cert/resolve`,
    method:'PUT'
  });
}
//驳回认证
export async function rejectInspector({id,reason}) {
  return await v1({
    url: `user/${id}/inspector/cert/reject`,
    method:'PUT',
    data:{
      reason
    }
  });
}