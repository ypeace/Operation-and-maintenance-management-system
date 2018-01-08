import v1 from './../v1';

export async function fetchUserLists({query = {}, limit = 20, skip, sort = {_id: -1},populateSelector}) {
  return await v1({
    url: 'users',
    params: {
      query, limit, skip, sort,
      selector: 'enable tel name roles permissions avatar idCardInfo inspectorInfo stationManager',
      populateSelector
    }
  });
}
export async function fetchUserById({id,populateSelector}) {
  return await v1({
    url: `user/${id}`,
    params: {
      selector: 'enable tel name roles permissions avatar idCardInfo inspectorInfo stationManager',
      populateSelector
    }
  });
}
