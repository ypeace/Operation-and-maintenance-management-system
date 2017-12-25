import v1 from './../v1';

export async function fetchUserLists({query = {}, limit = 20, skip, sort = {_id: -1}}) {
  return await v1({
    url: '/v1/users',
    params: {
      query, limit, skip, sort,
      selector: 'enable tel name roles permissions avatar idCardInfo inspectorInfo stationManager',
      populateSelector: {}
    }
  });
}


