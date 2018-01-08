import Tile from 'ol/layer/tile'
import osm from 'ol/source/osm'
import XYZ from 'ol/source/xyz'

let tileLayer = new Tile({
  source: new osm()
});

export default (type) => {
  let tileLayer = null;
  switch (type) {
    case 'amap_s':
      tileLayer = new Tile({
        source: new osm()
      });
      return tileLayer;
    case 'amap_r':
      tileLayer = new Tile({
        source: new XYZ({
          url: 'https://wprd01.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
        })
      });
      return tileLayer;
    case 'google_s':
      tileLayer = new Tile({
        source: new XYZ({
          url: 'https://mt1.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&scale=1',
        })
      });
      return tileLayer;
    case 'google_t_r':
      tileLayer = new Tile({
        source: new XYZ({
          url: 'https://mt1.google.cn/vt/lyrs=t,r&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&scale=1'
          ,
        })
      });
      return tileLayer;
    case 'osm_s':
      tileLayer = new Tile({
        source: new XYZ({
          url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        })
      });
      return tileLayer;
  }
}