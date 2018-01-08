import v1  from '../v1'

export async function updateInspector (id,identity) {
  return await v1({
    url:`user/${id}/inspector/identity`,
    method:'put',
    data:{identity}
  })
}
export async function addInspectionAreas (id,inspectionArea) {
  return await v1({
    url:`user/${id}/inspector/inspectionArea/${inspectionArea}`,
    method:'post',
    data:{inspectionArea}
  })
}
export async function removeInspectionAreas (id,inspectionArea) {
  return await v1({
    url:`user/${id}/inspector/inspectionArea/${inspectionArea}`,
    method:'delete',
    data:{inspectionArea}
  })
}


