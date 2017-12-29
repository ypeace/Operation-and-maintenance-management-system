import FrameStore from '../FrameStore';
import {logoutDeleteToken} from '../../service/root/logout'

export default class IndexStore extends FrameStore{
  loading = true;
  error = null;
  tel = '';
  prompt = false;
  hashName = '';

  load() {
    this.prompt = localStorage.getItem('tel') ? true : false;
    this.tel = this.prompt ? localStorage.getItem('tel') : '未登录';
    super.load();
  }

  logout() {
    (async _ =>{
      await logoutDeleteToken();
      localStorage.clear();
      window.location.href = '/login.html';
    })().catch(error => {
      console.error(error);
      window.location.href = '/login.html';
    })
  }

  menus = [{
    name: '用户',
    icon: 'user',
    path: '/user',
    frameSrc: '/code/user_frame.html'
  },{
    name: '运营站',
    icon: '',
    path: '',
    frameSrc: ''
  },{
    name: '项目管理',
    icon: '',
    path: '',
    frameSrc: ''
  },{
    name: '巡检订单',
    icon: '',
    path: '',
    frameSrc: ''
  },{
    name: '地图',
    icon: 'map',
    path: '/map' ,
    frameSrc:'/code/map_frame.html'
  },{
    name: '组件测试页',
    icon: 'work',
    path: '/work',
    frameSrc: '/code/work_frame.html'
  },];

}