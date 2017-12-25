import FrameStore from "../FrameStore";

export default class WorkFrameStore extends FrameStore {
  menus = [{
    name:"组件展示",
    icon:'assembly',
    path: '/assembly',
    frameSrc:'/code/work/assembly_frame.html'
  },{
    name: '布局展示',
    icon:'layout',
    path: '/assembly',
    frameSrc:'/code/work/layout_frame.html'//偷懒没写
  }]
}