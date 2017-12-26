
import parserRoutes from '../../../../utils/parseRoutes';
import {fetchInspectorDetailById2} from '../../../../service/inspector/inspector';

import history from '../../../../utils/history';

export default class fetchInspectorDetailById {

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
        this.result = await fetchInspectorDetailById2({id});
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