import parserRoutes from '../../utils/parseRoutes';
import history from '../../utils/history';

import {
  fetchInspectOrder,
  setEnable,
  addRoles,
  changeShow,
  settle,
  isEnableSelfOffWork,
  changeState
} from '../../service/web/inspectOrder/inspectOrder';
import {fetchUserNames} from '../../service/web/user/use';
import valueToKey from '../../utils/valueToKey'
import DialogFrameStore from '../../components/control/Dialog/DialogFrameStore';
import DrawerFrameStore from '../drawer/DrawerFrameStore';
import QueryFactoryStore from '../../components/control/stores/QueryFactoryStore';

export default class UserMessageFrameStore {

  tableLists = [];
  user = true;
  dialogStore = new DialogFrameStore();
  drawerStore = new DrawerFrameStore();
  nameList = [];
  query = {};
  USER_IDENTITY = {
    司机: 0,
    白班: 1,
    公关: 2,
    候命: 3,
    高手: 4,
  };

  INSPECTION_ORDER_STATE = {
    派单中: 0,
    暂停派单: 1,
    已取消: 2,
    已截单: 3,
    待线上确认: 4,
    已轧账: 5,
    已结算: 6,
  };

  USER_IDENTITY_MAP = valueToKey(this.USER_IDENTITY);

  INSPECTION_ORDER_STATE_MAP = valueToKey(this.INSPECTION_ORDER_STATE);

  closeDialog () {
    this.dialogStore.close()
  }

  openDialog (title, content, bottom) {
    this.dialogStore.open(title, content, bottom)
  }

  queryFactoryStore = new QueryFactoryStore({
    onRefreshData: this._fetchInspectOrders.bind(this)
  });

  load () {
    this._onChangeLocation(history.location);
    history.listen(this._onChangeLocation.bind(this));
    this._fetchInspectOrders();
    // this.changeStation();
    this.drawerStore.afterClosed = _ => {
      history.push('/');
    };
  }

  _onChangeLocation (location) {
    const re = parserRoutes(['/:id'], location.pathname);
    if (!re) return this.drawerStore.close();
      this.drawerStore.open(`订单价格详情[单号id：${re.id}]`, `/code/inspectOrder/inspectOrderPrice_frame.html#${re.id}`);

  }

  _fetchInspectOrders () {
    (async () => {
      this.tableLists = await fetchInspectOrder({
        query:this.query,
        sort:{id:-1},
        limit:this.queryFactoryStore.limit,
        skip:this.queryFactoryStore.skip,
      });
    })().catch(error => {
      this.error = error;
    })
  }

  showUserDetail (id) {
    history.push(`/${id}`);
  }

  showIspectorDetail (id) {
    history.push(`/${id}`);
  }

  //角色改变
  SetEnable (id, enable) {
    (async () => {
      await setEnable({id, enable});
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  // //拉取所有用户
  // changeStation (id, enable) {
  //   (async () => {
  //     this.nameList = await fetchUserNames({});
  //   })().catch(error => {
  //     this.error = error;
  //   })
  // }

  //设置身份
  addRolesRequest (id, identity) {
    (async () => {
      await addRoles({id, identity});
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //changeShow
  ChangeShow (id, isShowPayment) {
    (async () => {
      await changeShow({id, isShowPayment});
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }


  orderOver (id) {
    (async () => {
      await settle(id);
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //isEnableSelfOffWork
  EnableSelfOffWork (id, enableSelfOffWork) {
    (async () => {
      await isEnableSelfOffWork({id, enableSelfOffWork});
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  changeState(id,state){
    (async () => {
      await changeState(id,state);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }
}