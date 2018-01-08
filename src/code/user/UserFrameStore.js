import FrameStore from "../FrameStore";

export default class WorkFrameStore extends FrameStore {
  menus = [{
    name:"用户管理",
    icon:'userMessage',
    path: '/userMessage',
    frameSrc: '/code/user/userMessage_frame.html'
  }/*,{
    name: '巡检管理',
    icon:'inspectorDetail',
    path: '/inspectorDetail',
    frameSrc: '/code/user/inspector_frame.html'
  }*/]
}