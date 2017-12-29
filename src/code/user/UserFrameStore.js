import FrameStore from "../FrameStore";

export default class WorkFrameStore extends FrameStore {
  menus = [{
    name:"用户信息",
    icon:'userMessage',
    path: '/userMessage',
    frameSrc: '/code/user/userMessage_frame.html'
  }/*,{
    name: '线上运营',
    icon:'operate',
    path: '/operate',
    frameSrc: '/code/user/operate_frame.html'
  }*/,{
    name: '巡检管理',
    icon:'inspectorDetail',
    path: '/inspectorDetail',
    frameSrc: '/code/user/inspector_frame.html'
  }/*,{
    name: '仓库管理员',
    icon:'storekeeper',
    path: '/storekeeper',
    frameSrc: '/code/user/storekeeper_frame.html'
  }*/]
}