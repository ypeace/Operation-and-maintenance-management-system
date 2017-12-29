
import parserRoutes from '../../../utils/parseRoutes';
import history from '../../../utils/history';

import {fetchUserLists, addRoles, deleteRoles, accountRoot, addRoot} from '../../../service/web/user/userForMe';

import DialogFrameStore from '../../../components/control/Dialog/DialogFrameStore';
import DrawerFrameStore from '../../drawer/DrawerFrameStore';

export default class UserMessageFrameStore {

  loading = false;
  error = null;
  tableLists = [];
  user = true;
  dialogStore =  new DialogFrameStore;
  drawerStore = new DrawerFrameStore();
  ROLES = {
    超级管理员: 'super',
    管理员: 'admin',
    线上运营: 'manager',
    巡检人员: 'inspector',
    仓库管理员: 'storage',
  };

  ROLES_MAP = Object.keys(this.ROLES).reduce((memo, role) => {
    memo[this.ROLES[role]] = role;
    return memo;
  }, {});

  closeDialog(){
    this.dialogStore.close()
  }

  openDialog(title,content,bottom){
    this.dialogStore.open(title,content,bottom)
  }

  load() {

    this._onChangeLocation(history.location);
    history.listen(this._onChangeLocation.bind(this));
    this._fetchUserLists();
    this.drawerStore.afterClosed = _ => {
      history.push('/');
    };
  }

  _fetchUserLists() {
    (async ()=>{
       this.tableLists = await fetchUserLists({});
    })().catch( error =>{
      this.error = error;
    })
  }

  _onChangeLocation (location) {
    console.log(location)
    const re = parserRoutes(['/:id'], location.pathname);
    console.log(re);
    if(!re) return this.drawerStore.close();
    if(this.user){ this.drawerStore.open(`用户详情[用户id：${re.id}]`, `/code/user/userDetail_frame.html#${re.id}`);}else{
      this.drawerStore.open(`巡检详情[用户id：${re.id}]`, `/code/user/inspectorMessageDetail_frame.html#${re.id}`);
    }
  }

  showUserDetail(id){
    this.user = true
    history.push(`/${id}`);
  }

  showIspectorDetail(id){
    this.user = false;
    history.push(`/${id}`);
  }

  //角色改变
  addRolesRequest(id,role) {
    console.log(id,role);
    (async () => {
      await addRoles({id,role});
      setTimeout(()=>{
        this.dialogStore.close()
      },500);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }

  //角色改变
  deleteRolesRequest(id,role) {
    (async () => {
      await deleteRoles({id,role});
      setTimeout(()=>{
        this.dialogStore.close()
      },500);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }

  //是否可用
  setAccountRoot (id,enable){
    (async ()=>{
      await accountRoot({id,enable})
        this.load();
    })().catch(error =>{
      this.error = error;
    })
  }

  //增加权限
  AddRoot (id,permission){
    (async ()=>{
      await addRoot({id,permission});
      setTimeout(()=>{
        this.dialogStore.close()
      },100);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }

}