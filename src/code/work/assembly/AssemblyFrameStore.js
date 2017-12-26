import DialogFrameStore from '../../../components/control/ComponentAndDialog/DialogFrameStore';


export default class UserMessageFrameStore {

  loading = false;
  error = null;

  show = false;
  onOff = true;

  dialogStore =  new DialogFrameStore;

  abc(){
    this.dialogStore.open()
  }

  toggleDialog () {
    this.show = !this.show;
  }
  changeSwitch(){
    this.onOff = !this.onOff;
  }
}