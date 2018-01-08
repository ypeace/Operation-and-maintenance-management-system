import {fetchInspector} from '../../../service/web/operate/inspector';
import DrawerFrameStore from '../../drawer/DrawerFrameStore';
import parserRoutes from '../../../utils/parseRoutes';
import history from '../../../utils/history';

export default class UserMessageFrameStore {

  loading = false;
  error = null;
  tableLists = [];
  show = false;

  toggleDialog () {
    this.show = !this.show;
  }

  drawerStore = new DrawerFrameStore();

  load() {
    this._onChangeLocation(history.location);
    history.listen(this._onChangeLocation.bind(this));
    this._fetchInspector();
    this.drawerStore.afterClosed = _ => {
      history.push('/');
    };
  }

  _fetchInspector() {
    (async ()=>{
      this.tableLists = await fetchInspector({});
    })().catch( error =>{
      this.error = error;
    })
  }

  _onChangeLocation (location) {
    console.log(location);
    const re = parserRoutes(['/:id'], location.pathname);
    console.log(re);
    if(!re) return this.drawerStore.close();
    this.drawerStore.open(`[巡检单id：${re.id}]`, `/code/user/inspectorDetail_frame.html#${re.id}`);
  }

  showDetail (id) {
    history.push(`/${id}`);
  }

}