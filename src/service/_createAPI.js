import axios from 'axios';
import clone from 'clone';

const Toast = window.iziToast;//弹窗

export default (host, end) => {
  const ins = axios.create({//创建axios实例
    baseURL: [host, end].filter(v => !!v).join('/')
  });
  ins.interceptors.request.use(request => {
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    if (request.params) {
      request.params = clone(request.params);
      Object.keys(request.params).forEach(key => {
        if (typeof request.params[key] === 'object') {
          request.params[key] = JSON.stringify(request.params[key]);
        }
      });
    }
    return request;
  });
  //拿到相应数据
  ins.interceptors.response.use(response => {
    return response.data;
  }, error => {
    if (error.response.status === 500) {
      Toast.error({ title: error.response.data.error })
    } else {
      Toast.error({ title: error.response.data.orginalError })
    }
  });

  return ins;
}