export default class DrawerFrameStore {
  isOpen = false;

  frameSrc = '';
  title = '';

  open (title, frameSrc) {
    this.title = title;
    this.frameSrc = frameSrc;
    this.isOpen = true;
  }

  close () {
    this.frameSrc = '';
    this.isOpen = false;
    this.afterClosed();
  }

  afterClosed () {

  }
}