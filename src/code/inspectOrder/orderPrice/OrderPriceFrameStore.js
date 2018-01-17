import {
  fetchInspectById,changeInspectorPrice,changeAgentPrice,fixedStatistic
} from '../../../service/web/inspectOrder/inspectOrder';
import parserRoutes from '../../../utils/parseRoutes';

import history from '../../../utils/history';
import DialogFrameStore from '../../../components/control/Dialog/DialogFrameStore';
import valueToKey from '../../../utils/valueToKey';

export default class UserDetailFrameStore {

  dialogStore = new DialogFrameStore;
  result = {};
  id = '';
  closeDialog () {
    this.dialogStore.close()
  }

  openDialog (title, content, bottom) {
    this.dialogStore.open(title, content, bottom)
  }

  load () {
    this._fetchInspectById();
  }

  _fetchInspectById () {
    const id = window.location.hash && window.location.hash.split('#')[1] ? window.location.hash.split('#')[1] : null;
    this.id = id;
    if (!id) {
      this.error = new Error('id有误或者id不存在')
    } else {
      (async () => {
        this.result = await fetchInspectById(id);
      })().catch(error => {
        this.error = error;
      })
    }
  }

//修改巡检的计价规则
  changeInspectorPrice(parameter,value){
    const id = this.id;
    let obj = {};
    obj[parameter] = value;

    (async () => {
      this.result = await changeInspectorPrice(id,obj);
    })().catch(error => {
      this.error = error;
    })
  }

//修改代理的计价规则
  changeAgentPrice(parameter,value){
    console.log(parameter,value);
    const id = this.id;
    let obj = {};
    obj[parameter] = value;

    (async () => {
      this.result = await changeAgentPrice(id,obj);
    })().catch(error => {
      this.error = error;
    })
  }

//修正统计巡检数据
  fixedStatistic(parameter,value){
    const id = this.id;
    let obj = {};
    obj[parameter] = value;

    (async () => {
      this.result = await fixedStatistic(id,obj);
    })().catch(error => {
      this.error = error;
    })
  }

}