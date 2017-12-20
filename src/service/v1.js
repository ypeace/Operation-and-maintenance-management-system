import qs from 'qs';
import _createAPI from './_createAPI';

let host = 'https://api.mangoebike.com';

if (process.env.NODE_ENV !== 'production') {
  host = 'http://hi.mangoebike.cc:9011';
  if (window.location.search.length > 0) {
    const query = qs.parse(window.location.search.slice(1));
    if (query.mango1Host) {
      host = query.mango1Host;
    }
  }
}

export default _createAPI(host, 'admin', 'v1');
export const root = _createAPI(host);