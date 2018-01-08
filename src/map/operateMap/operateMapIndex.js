import React from 'react';
import MapView from '../MapView';
import MapStore from '../MapStore';
import MapStyle from '../MapStlyes';
import connect from 'connect-store';
import operateMapView from './operateMapView';
import operateMapStore from './operateMapStore';

const mapStore = new MapStore({
  layers: [MapStyle('google_t_r')]
});

export default _ => {
  return (
    <div style={{ display: 'flex',width:'100%',height:'100%', overflow:'hidden'}}>
      {connect(MapView, mapStore)}
      {connect(operateMapView, new operateMapStore(mapStore))}
    </div>
  )
}


