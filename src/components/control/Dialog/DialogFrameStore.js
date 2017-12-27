export default class DrawerFrameStore {
  isOpen = false;

  title = '';
  content = null;
  bottom = null
  open (title,content,bottom) {
    this.title = title;
    this.isOpen = true;
    this.content = content;
    this.bottom = bottom;
  }

  close () {
    console.log('close');
    this.isOpen = false;
  }

}