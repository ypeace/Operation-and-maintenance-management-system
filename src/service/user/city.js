import v1 from '../v1'

export async function updateUserCitybyId({id,city}){
  return await v1({
    url:`user/${id}/inspector/city`,
    method:'put',
    data:{city}
  })
}