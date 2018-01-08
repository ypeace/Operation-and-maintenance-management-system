
import parserRoutes from '../../utils/parseRoutes';
import history from '../../utils/history';

import {fetchProject, setEnable ,addRoles, deleteRoles, changeCorrectionValue} from '../../service/web/project/project';

import DialogFrameStore from '../../components/control/Dialog/DialogFrameStore';
import DrawerFrameStore from '../drawer/DrawerFrameStore';

export default class UserMessageFrameStore {

  loading = false;
  error = null;
  tableLists = [];
  user = true;
  dialogStore =  new DialogFrameStore;
  drawerStore = new DrawerFrameStore();
  nameList = [];
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
  }

  openDialog(title,content,bottom){
    this.dialogStore.open(title,content,bottom)
  }

  load() {
    this._onChangeLocation(history.location);
    history.listen(this._onChangeLocation.bind(this));
    this._fetchProjects();
    this.drawerStore.afterClosed = _ => {
      history.push('/');
    };
  }

  refresh(){
    this._fetchProjects()
  }

  _fetchProjects() {
    (async ()=>{
      this.tableLists = await fetchProject({});
    })().catch( error =>{
      this.error = error;
    })
  }

  _onChangeLocation (location) {
    const re = parserRoutes(['/:id'], location.pathname);
    if(!re) return this.drawerStore.close();
    this.drawerStore.open(`setting详情[用户id：${re.id}]`, `/code/project/settingDetail_frame.html#${re.id}`)
  }

  showUserDetail(id){
    history.push(`/${id}`);
  }

  //是否可用
  SetEnable(id,enable) {
    console.log(id,enable);
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


  //角色改变
  addRolesRequest(id,manager) {
    console.log(id,manager);
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

  ChangeCorrectionValue(id,batteryCountCorrectionValue){
    (async () => {
      await changeCorrectionValue({id,batteryCountCorrectionValue});
      setTimeout(()=>{
        this.dialogStore.close()
      },500);
      this.load();
    })().catch(error =>{
      this.error = error;
    })
  }
}