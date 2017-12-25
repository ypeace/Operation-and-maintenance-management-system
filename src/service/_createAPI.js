import axios from 'axios';
import clone from 'clone';
const Toast = window.iziToast;//弹窗

export default (host, end) =>{
  const ins = axios.create({//创建axios实例
    baseURL: [host, end].filter(v => !!v).join('/')
  });
  ins.interceptors.request.use(request =>{
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    console.log('token:'+localStorage.getItem('token'),request.headers['Authorization']);
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
    console.log(error)
  });

  return ins;
}