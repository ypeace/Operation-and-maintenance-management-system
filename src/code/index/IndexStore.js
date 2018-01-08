import FrameStore from '../FrameStore';
import {logoutDeleteToken} from '../../service/web/root/logout'

export default class IndexStore extends FrameStore{
  loading = true;
  error = null;
  tel = '';
  prompt = false;
  hashName = '';

  load() {
    this.prompt = localStorage.getItem('tel') ? true : false;
    if(this.prompt){
      this.tel = localStorage.getItem('tel');
      super.load();
    }else{
      setTimeout(_=>{
        window.location.href = '/login.html';
      },1000)
    }
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
    name: '用户管理',
    icon: 'user',
    path: '/user',
    frameSrc: '/code/user_frame.html'
  },{
    name: '运营站',
    icon: 'operate',
    path: '/operate',
    frameSrc: '/code/operate_frame.html'
  },{
    name: '项目管理',
    icon: 'project',
    path: '/project',
    frameSrc: '/code/project_frame.html'
  },{
    name: '巡检订单',
    icon: 'inspectOrder',
    path: '/inspectOrder',
    frameSrc: '/code/inspectOrder_frame.html'
  },{
    name: '地图',
    icon: 'map',
    path: '/map' ,
    frameSrc:'/code/map_frame.html'
  },/*{
    name: '巡检订单',
    icon: 'operate',
    path: 'operate',
    frameSrc: '/code/operate_frame.html'
  },*/];

}