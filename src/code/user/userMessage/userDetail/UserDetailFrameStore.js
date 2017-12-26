import {fetchUserDetailById} from '../../../../service/user/user';
import parserRoutes from '../../../../utils/parseRoutes';

import history from '../../../../utils/history';

export default class UserDetailFrameStore {

  loading = false;
  error = null;

  show = false;
  onOff = true;
  result = {};


  load() {
    this._fetchUserDetail( )
  }

  _fetchUserDetail() {
    const id = window.location.hash && window.location.hash.split('#')[1] ? window.location.hash.split('#')[1] : null;
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
}