import { root as rootToken } from '../../token';
import v1 from '../../../service/v1';
export async function loginGetToken ({tel,password}) {
  return await rootToken({
    method: 'POST',
    url: 'token',
    data:{
      tel,
      password
    }
  });
}

export async function loginGetRoot () {
  return await rootToken({
    method: 'GET',
    url: 'token',
  });
}


export async function register ({tel,password}) {
  return await v1({
    method: 'POST',
    url: '/user',
    data:{
      tel,
      password
    }
  });
}

