import {fetchProjectById} from '../../../service/web/project/project';
import DialogFrameStore from '../../../components/control/Dialog/DialogFrameStore';
import valueToKey from '../../../utils/valueToKey';

export default class UserDetailFrameStore {
  id = '';
  dialogStore =  new DialogFrameStore;

  closeDialog(){
    this.dialogStore.close()
  }

  openDialog(title,content,bottom){
    this.dialogStore.open(title,content,bottom)
  }

  load() {
    this._fetchUserDetail( )
  }

  _fetchUserDetail() {
    const id = window.location.hash && window.location.hash.split('#')[1] ? window.location.hash.split('#')[1] : null;
    this.id = id;
    if (!id) {
      this.error = new Error('id有误或者id不存在')
    }else {
      (async ()=>{
        this.result = await fetchProjectById({id});
      })().catch( error =>{
        this.error =error;
      })
    }
  }

  toggleDialog () {
    this.show = !this.show;
  }

  changeSwitch(){
    this.onOff = !this.onOff;
  }

  // //驳回巡检审核
  // RejectInspector(id,reason){
  //   (async () => {
  //     await rejectInspector({id,reason});
  //     setTimeout(()=>{
  //       this.dialogStore.close()
  //     },500);
  //     this.load();
  //   })().catch(error =>{
  //     this.error = error;
  //   })
  // }


}