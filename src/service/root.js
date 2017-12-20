import { root as rootV1 } from './v1';
import { root as rootV2 } from './v2';

export async function checkToken () {
  return await rootV1({
    url: '/token'
  });
}

export async function fetchConstants () {
  return await rootV2({
    url: '/constants',
  });
}