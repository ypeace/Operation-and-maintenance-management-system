import { root as rootToken } from './../../token';

export async function logoutDeleteToken () {
  return await rootToken({
    method: 'DELETE',
    url: '/token',
  });
}