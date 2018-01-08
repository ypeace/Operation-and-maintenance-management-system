import v1 from '../v1';

export async function fetchBikes({query,limit,sort,skip,selector,populateSelector }){
  return await v1({
    url:'bikes',
    params:{query,limit,sort,skip,selector,populateSelector}
  })
}
