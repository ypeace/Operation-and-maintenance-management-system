import v1 from '../../v1';

export async function fetchInspectionAreas ({ query, limit, sort, skip, selector, populateSelector, cache }) {
  return await v1({
    url: `inspectionAreas`,
    params: { query, limit, sort, skip, selector, populateSelector, cache }
  })
}

export async function fetchInspeectionAreaById (id, {selector,populateSelector,cache}) {
  return await v1({
    url: `insepctionArea/${id}`,
    params: {selector,populateSelector,cache}
  })
}

export async function updateBoundary (id, coordinates) {
  return await v1({
    url: `insepctionArea/${id}/geometry`,
    method: 'put',
    data: { coordinates }
  })
}

export async function updateName (id, name) {
  return await v1({
    url: `insepctionArea/${id}/name`,
    method: 'put',
    data: { name }
  })
}

export async function updateCity (id, city) {
    return await v1({
      url: `insepctionArea/${id}/city`,
      method: 'put',
      data: { city }
    })
}

export async function updateEnable (id, enable) {
  return await v1({
    url: `insepctionArea/${id}/enable`,
    method: 'put',
    data: { enable }
  })
}


export async function createInspectionAre (name,city, coordinates ) {
  return await v1({
    url: `insepctionArea`,
    method: 'post',
    data: { name, city,coordinates }
  })
}

export async function removeInsperctionAre (id) {
  return await v1({
    url: `insepctionArea/${id}`,
    method: 'delete',
  })
}