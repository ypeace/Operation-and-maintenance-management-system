import parserRoutes from '../../../utils/parseRoutes';
import history from '../../../utils/history';

import { fetchUserLists, addRoles, deleteRoles, accountRoot, addRoot,fetchInspectionPriceRules } from '../../../service/web/user/use';

import DialogFrameStore from '../../../components/control/Dialog/DialogFrameStore';
import DrawerFrameStore from '../../drawer/DrawerFrameStore';

import QueryFactoryStore from '../../../components/control/stores/QueryFactoryStore';
import valueToKey from '../../../utils/valueToKey';

export default class UserMessageFrameStore {


  tableLists = [];
  user = true;
  dialogStore = new DialogFrameStore();
  drawerStore = new DrawerFrameStore();
  query = {};
  prices = [];
  ROLES = {
    超级管理员: 'super',
    管理员: 'admin',
    线上运营: 'manager',
    巡检人员: 'inspector',
    仓库管理员: 'storage',
  };

  USER_IDENTITY = {
    司机: 0,
    白班: 1,
    公关: 2,
    候命: 3,
    高手: 4,
  };

  USER_IDENTITY_MAP = valueToKey(this.USER_IDENTITY);

  queryFactoryStore = new QueryFactoryStore({
    onRefreshData: this._fetchUserLists.bind(this)
  });

  ROLES_MAP = Object.keys(this.ROLES).reduce((memo, role) => {
    memo[this.ROLES[role]] = role;
    return memo;
  }, {});

  closeDialog () {
    this.dialogStore.close()
  }

  openDialog (title, content, bottom) {
    this.dialogStore.open(title, content, bottom)
  }


  load () {
    this._onChangeLocation(history.location);
    history.listen(this._onChangeLocation.bind(this));
    this._fetchUserLists();
    this._inspectionPriceRules();
    this.drawerStore.afterClosed = _ => {
      history.push('/');
    };
  }

  _fetchUserLists () {
    (async () => {
      this.tableLists = await fetchUserLists({
        query:this.query,
        sort:{id:-1},
        limit:this.queryFactoryStore.limit,
        skip:this.queryFactoryStore.skip,
      });
    })().catch(error => {
      this.error = error;
    })
  }

  _onChangeLocation (location) {
    const re = parserRoutes(['/:id'], location.pathname);
    if (!re) return this.drawerStore.close();
    if (this.user) {
      this.drawerStore.open(`用户详情[用户id：${re.id}]`, `/code/user/userDetail_frame.html#${re.id}`);
    } else {
      this.drawerStore.open(`巡检详情[用户id：${re.id}]`, `/code/user/inspectorMessageDetail_frame.html#${re.id}`);
    }
  }

  showUserDetail (id) {
    this.user = true
    history.push(`/${id}`);
  }

  showIspectorDetail (id) {
    this.user = false;
    history.push(`/${id}`);
  }

  //角色改变
  addRolesRequest (id, role) {
    (async () => {
      await addRoles({id, role});
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })()
  }

  //角色改变
  deleteRolesRequest (id, role) {
    (async () => {
      await deleteRoles({id, role});
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //是否可用
  setAccountRoot (id, enable) {
    (async () => {
      await accountRoot({id, enable})
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //增加权限
  AddRoot (id, permission) {
    (async () => {
      await addRoot({id, permission});
      setTimeout(() => {
        this.dialogStore.close()
      }, 100);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //改变查询条件
  changeQuery(key,value) {
    if(value){
      this.query[key] = value
    }else{
      this.query = {}
    }
    this._fetchUserLists()
  }

  //获取巡检价格列表
  _inspectionPriceRules() {
    (async () => {
       this.prices = await fetchInspectionPriceRules();
    })().catch(error => {
      this.error = error;
    })
  }
}