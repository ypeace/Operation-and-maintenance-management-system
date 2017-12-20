import qs from 'qs';
import _createAPI from './_createAPI';

let host = 'https://duet.mangoebike.com';

if (process.env.NODE_ENV !== 'production') {
  // host = 'http://hi.mangoebike.cc:4004';
  host = 'http://192.168.1.222:4004';
  if (window.location.search.length > 0) {
    const query = qs.parse(window.location.search.slice(1));
    if (query.mango2Host) {
      host = query.mango2Host;
    }
  }
}

export default _createAPI(host, 'admin', 'v3');
export const root = _createAPI(host);