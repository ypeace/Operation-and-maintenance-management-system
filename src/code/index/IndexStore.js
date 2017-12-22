import FrameStore from '../FrameStore';

export default class IndexStore extends FrameStore{
  loading = true;
  error = null;
  userName = '';

  load() {
    this.userName = localStorage.getItem('userName') ? localStorage.getItem('userName') : '和平'
    super.load();
  }

  logout() {
    window.location.href = '/login.html';
  }

  menus = [{
    name: '业务2',
    icon: 'work',
    path: '/work',
    frameSrc: '/code/work_frame.html'
  }, {
    name: '地图',
    icon: 'map',
    path: '/map' ,
    frameSrc: '/code/map_frame.html'
  }]

}