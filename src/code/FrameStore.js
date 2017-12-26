import history, { browserHistory } from '../utils/history';
import parseRoutes from '../utils/parseRoutes';

const isDev = process.env.NODE_ENV === 'development';

export default class FrameStore {
  menus = [{
    name: '导航0',
    path: '/nav1',
    frameSrc: ''
  }, {
    name: '导航2',
    path: '/nav2',
    frameSrc: ''
  }];

  get defaultPath () {
    return this.menus[0] && this.menus[0].path;
  }

  activeMenu = null;

  frameSrc = null;

  get subHashPrefix () {
    return '';
  }

  get hashPrefix () {
    return '';
  }

  load () {
    history.listen(this._onChangeLocation.bind(this));
    this._onChangeLocation(history.location);
  }

  _onChangeLocation (location) {
    const active = this.menus.some(menu => {
      const result = parseRoutes([
        menu.path,
        `${menu.path}/:subHash*`
      ], location.pathname);
      if (result) {
        this.activeMenu = menu;
        const subHash = `${this.subHashPrefix ? `${this.subHashPrefix}/` : ''}${result.subHash || ''}`;
        this.frameSrc = menu.frameSrc && [`${menu.frameSrc}${browserHistory.location.search}`, subHash].join('#');
      }
      return result;
    });

    if (!active) {
      this.activeMenu = null;
      if (this.defaultPath) {
        history.push(`${this.hashPrefix ? `/${this.hashPrefix}` : ''}${this.defaultPath}`);
      }
    }
  }

  open (menu) {
    history.push(`${this.hashPrefix ? `/${this.hashPrefix}` : ''}${menu.path}`);
  }

  frameLoaded (e) {
    const contentWindow = e.target.contentWindow;
    contentWindow.onhashchange = _ => {
      const pathname = `${this.hashPrefix ? `/${this.hashPrefix}` : ''}${this.activeMenu.path}`;
      let subHash = contentWindow.location.hash.slice(1);
      if (this.subHashPrefix) subHash = subHash.replace(new RegExp(`^${this.subHashPrefix}/?`), '');
      const newHash = `${pathname}/${subHash}`;
      history.push(newHash);
    };
  }
}