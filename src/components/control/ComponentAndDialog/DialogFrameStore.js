export default class DrawerFrameStore {
  isOpen = false;

  title = '';

  open (title) {
    this.title = title;
    this.isOpen = !this.isOpen;
  }

  close () {
    this.isOpen = false;
  }

}