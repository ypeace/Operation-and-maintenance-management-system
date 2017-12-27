import DialogFrameStore from '../../../components/control/Dialog/DialogFrameStore';


export default class UserMessageFrameStore {

  loading = false;
  error = null;

  show = false;
  onOff = true;
  dialogStore =  new DialogFrameStore;

  closeDialog(){
    this.dialogStore.close()
  }

  openDialog(title,content,bottom){
    this.dialogStore.open(title,content,bottom)
  }

  toggleDialog () {
    this.show = !this.show;
  }
  changeSwitch(){
    this.onOff = !this.onOff;
  }
}