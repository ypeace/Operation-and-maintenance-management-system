import axios from 'axios';
import clone from 'clone';
const Toast = window.iziToast;//弹窗

export default (host, end, version) =>{
  const ins = axios.create({//创建axios实例
    baseURL: [host, end, version].filter(v => !!v).join('/')
  });
  //添加请求拦截器 发送请求前
  ins.interceptors.request.use(request =>{
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    // request.headers['mg-region'] = localStorage.getItem('mg.filter.region') || '';
    // request.headers['mg-style'] = localStorage.getItem('mg.filter.style') || '';
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
    let errorMessage;
    if (error.response && error.response.data.redirect) {
      window.location.href = error.response.data.redirect;
    }
    errorMessage = error.response ? error.response.data.error : error.message;
    if (errorMessage) {
      Toast.error({
        title: '错误',
        message: errorMessage
      });
    }
    throw new Error(errorMessage || 'User abort');
  });

  return ins;
}