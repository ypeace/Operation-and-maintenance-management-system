import {fetchUserLists} from '../../../service/user/user';
import DrawerFrameStore from '../../drawer/DrawerFrameStore';
import parserRoutes from '../../../utils/parseRoutes';
import history from '../../../utils/history';

export default class UserMessageFrameStore {

  loading = false;
  error = null;
  tableLists = [];

  drawerStore = new DrawerFrameStore();

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
    const re = parserRoutes(['/:id'], location.pathname);
    if(!re) return this.drawerStore.close();
    this.drawerStore.open(`用户详情[用户id：${re.id}]`, 'http://www.17sucai.com/preview/1/2017-08-17/YhhDataTable/index.html');
  }

  showDetail (user) {
    history.push(`/${user._id}`);
  }

}