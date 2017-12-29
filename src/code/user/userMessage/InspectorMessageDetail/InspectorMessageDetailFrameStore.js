import {fetchUserDetailById, deleteIdcard, passIdcard, rejectIdcard} from '../../../../service/web/user/userForMe';
import parserRoutes from '../../../../utils/parseRoutes';

import history from '../../../../utils/history';
import DialogFrameStore from '../../../../components/control/Dialog/DialogFrameStore';
import valueToKey from '../../../../utils/valueToKey';

export default class UserDetailFrameStore {

  loading = false;
  error = null;
  dialogStore =  new DialogFrameStore;

  show = false;
  onOff = true;
  result = {};
  id  = '';
  USER_STATE = {
    未提交: 0,
    号码审核通过: 1,
    待人工审核: 2,
    人工审核通过: 3,
    人工审核驳回: 4,
  };

  USER_IDENTITY = {
    司机: 0,
    白班: 1,
    公关: 2,
    候命: 3,
    高手: 4,
  };

  USER_STATE_MAP = valueToKey(this.USER_STATE);

  USER_IDENTITY_MAP = valueToKey(this.USER_IDENTITY);

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
        this.result = await fetchUserDetailById({id});
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

  //吊销认证
  DeleteIdcard(){
    (async () => {
      await deleteIdcard(this.id);
      setTimeout(()=>{
        this.dialogStore.close()
      },500);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }

  //通过审核
  PassIdcard(){
    (async () => {
      await passIdcard(this.id);
      setTimeout(()=>{
        this.dialogStore.close()
      },500);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }

  //驳回审核
  RejectIdcard(id,reason){
    (async () => {
      await rejectIdcard({id,reason});
      setTimeout(()=>{
        this.dialogStore.close()
      },500);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }
}