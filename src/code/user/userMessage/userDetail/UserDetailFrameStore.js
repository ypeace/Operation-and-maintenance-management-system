import {fetchUserDetailById, deleteIdcard, passIdcard, rejectIdcard,isMustResolveRequest, passInspector, rejectInspector} from '../../../../service/web/user/use';
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
  USER_INSPECTOR__STATE = {
    未提交: 0,
    待审核: 1,
    审核通过: 2,
    驳回: 3,
  };
  CAR = {
  面包车: 1,
  金杯: 2,
  箱货: 3,
  平板车: 4,
  };
  USER_STATE_MAP = valueToKey(this.USER_STATE);

  USER_INSPECTOR__STATE_MAP = valueToKey(this.USER_INSPECTOR__STATE);

  CAR_MAP = valueToKey(this.CAR);

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

  //是否通过审核才能巡检
  isMustResolveRequest(id, isMustResolve){
    (async ( ) => {
      await isMustResolveRequest({id,isMustResolve});
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }

  //通过巡检审核
  PassInspector(){
    (async () => {
      await passInspector(this.id);
      setTimeout(()=>{
        this.dialogStore.close()
      },500);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }

  //驳回巡检审核
  RejectInspector(id,reason){
    (async () => {
      await rejectInspector({id,reason});
      setTimeout(()=>{
        this.dialogStore.close()
      },500);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }

}