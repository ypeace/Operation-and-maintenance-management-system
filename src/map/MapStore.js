import Map from 'ol/map'
import proj from 'ol/proj';
import View from 'ol/view';
import uniqid from 'uniqid'
import EventEmitter from 'events';
import control from 'ol/control'


export default class MapStore extends EventEmitter {
  static STORAGE_ZOOM_NAME = 'mg.openlayers.map.defaultZoom';
  static STORAGE_CENTER_NAME = 'mg.openlayers.map.defaultCenter';

  id = uniqid();

  get map () {
    return this._map;
  }

  get defaultCenter () {
    const center = localStorage.getItem(MapStore.STORAGE_CENTER_NAME);
    return center ?center.split(',').map(parseFloat) : [116.397128, 39.916527];
  }

  get defaultZoom () {
    const zoom = localStorage.getItem(MapStore.STORAGE_ZOOM_NAME);
    return zoom ? parseInt(zoom) : 15;
  }

  constructor (options = {}) {
    super();
    this._options = options;
  }

  load () {
    this._map = new Map({
      ...this._options,
      projection: 'EPSG:3857',
      target: this.id,
      controls: control.defaults({
        attribution: false,
        rotate: false,
        zoom: false
      }),
      view: new View({
        center: proj.fromLonLat(this.defaultCenter),
        zoom: this.defaultZoom
      })
    });
    this.emit('load', this._map);
  }


}