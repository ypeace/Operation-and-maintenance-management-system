import v1 from '../../v1';

export  async function createInpectionOrder (id) {
  return await v1({
    url:'inspectionOrder',
    method:'post',
    data:{userId:id},

  })
}

export  async function finishInpectionOrder (id) {
  return await v1({
    url:`inspectionOrder/${id}/finish`,
    method:'put',
    data:{id}
  })
}