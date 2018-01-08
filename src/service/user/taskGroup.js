import v1  from '../v1'

export async function addTaskGroup (id,taskGroup) {
  return await v1({
    url:`user/${id}/inspector/acceptTaskGroup/${taskGroup}`,
    method:'post',
    data:{taskGroup}
  })
}

export async function removeTaskGroup (id,taskGroup) {
  return await v1({
    url:`user/${id}/inspector/acceptTaskGroup/${taskGroup}}`,
    method:'delete',
    data:{taskGroup}
  })
}