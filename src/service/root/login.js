import { root as rootToken } from './../token';

export async function loginGetToken ({tel,password}) {
  return await rootToken({
    method: 'POST',
    url: '/token',
    data:{
      tel,
      password
    }
  });
}

export async function loginGetRoot () {
  return await rootToken({
    method: 'GET',
    url: '/token',
  });
}

