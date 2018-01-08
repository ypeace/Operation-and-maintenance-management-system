import v1 from '../v1';

export async function fetchCities () {
  return await v1({
    url: `cities`,
  })
}
