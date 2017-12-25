
export default class UserMessageFrameStore {

  loading = false;
  error = null;

  show = false;


  toggleDialog () {
    this.show = !this.show;
  }
}