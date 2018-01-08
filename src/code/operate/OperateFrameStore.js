
import parserRoutes from '../../utils/parseRoutes';
import history from '../../utils/history';

import {fetchOperate, setEnable ,addRoles, deleteRoles} from '../../service/web/operate/operate';
import {fetchUserNames} from '../../service/web/user/use';

import DialogFrameStore from '../../components/control/Dialog/DialogFrameStore';
import DrawerFrameStore from '../drawer/DrawerFrameStore';

export default class UserMessageFrameStore {

  loading = false;
  error = null;
  tableLists = [];
  user = true;
  dialogStore =  new DialogFrameStore();
  drawerStore = new DrawerFrameStore();
  nameList = [];
  roots = localStorage.getItem('roles').split(',');
  ROLES = {
    超级管理员: 'super',
    管理员: 'admin',
    线上运营: 'manager',
    巡检人员: 'operate',
    仓库管理员: 'storage',
  };

  ROLES_MAP = Object.keys(this.ROLES).reduce((memo, role) => {
    memo[this.ROLES[role]] = role;
    return memo;
  }, {});

  closeDialog(){
    this.dialogStore.close()
  };

  openDialog(title,content,bottom){
    this.dialogStore.open(title,content,bottom)
  }

  load() {
    this._fetchOperates();
    this.changeStation();
    this.drawerStore.afterClosed = _ => {
      history.push('/');
    };
  }

  _fetchOperates() {
    (async ()=>{
      this.tableLists = await fetchOperate({});
    })().catch( error =>{
      this.error = error;
    })
  }

  refresh(){
    this._fetchOperates()
  }

  showUserDetail(id){
    this.user = true;
    history.push(`/${id}`);
  }

  showIspectorDetail(id){
    this.user = false;
    history.push(`/${id}`);
  }

  //角色改变
  SetEnable(id,enable) {
    (async () => {
      await setEnable({id,enable});
      setTimeout(()=>{
        this.dialogStore.close()
      },500);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }

  //拉取所有用户
  changeStation(id,enable) {
    (async () => {
      this.nameList =  await fetchUserNames({});
    })().catch(error =>{
      this.error = error;
    })
  }

  //角色改变
  addRolesRequest(id,manager) {
    (async () => {
      await addRoles({id,manager});
      setTimeout(()=>{
        this.dialogStore.close()
      },500);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }

  //角色改变
  deleteRolesRequest(id,manager) {
    (async () => {
      await deleteRoles({id,manager});
      setTimeout(()=>{
        this.dialogStore.close()
      },500);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }
}