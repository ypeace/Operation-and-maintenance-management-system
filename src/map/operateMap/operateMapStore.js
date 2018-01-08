import GeoJson from 'ol/format/geojson';
import Style from 'ol/style/style';
import Circle from 'ol/style/circle';
import Stroke from 'ol/style/stroke';
import Icon from 'ol/style/icon';
import Fill from 'ol/style/fill';
import GeojsonVt from 'geojson-vt';
import SourceVectorTile from 'ol/source/vectortile';
import SourceVector from 'ol/source/vector';
import LayerVectorTile from 'ol/layer/vectortile';
import Polygon from 'ol/geom/polygon';
import layerVector from 'ol/layer/vector';
import Modify from 'ol/interaction/modify';
import Select from 'ol/interaction/select';
import Draw from 'ol/interaction/draw';
import Snap from 'ol/interaction/snap';
import MultiPoint from 'ol/geom/multipoint';
import Point from 'ol/geom/point'
import proj from 'ol/proj';
import Prohection from 'ol/proj/projection';
import condition from 'ol/events/condition'
import popUP from '../../components/popUP/popUP';
import colorFunction from '../../utils/colorAndOpacityToRGBA';
import Feature from 'ol/feature'


import {
  fetchInspectionAreas,
  fetchInspeectionAreaById,
  updateBoundary,
  createInspectionAre,
  updateName,
  updateCity,
  removeInsperctionAre,
  updateEnable
} from '../../service/operation/polygons/inspectionArea';

import { fetchUserLists } from '../../service/user/user'
import { fetchCities } from '../../service/city/cities';
import {
  updateInspector,
  addInspectionAreas,
  removeInspectionAreas
} from '../../service/user/inspector';
import { updateUserCitybyId } from '../../service/user/city'
import { fetchBikes } from '../../service/bike/bikes';
import { addTaskGroup } from '../../service/user/taskGroup';
import { removeTaskGroup } from '../../service/user/taskGroup';
import { fetchUserById } from '../../service/user/user'
import { createInpectionOrder, finishInpectionOrder } from '../../service/operation/inspectionOrder/inspectionOrder'

export default class operateMapStore {

  static STORAGE_ZOOM_NAME = 'mg.openlayers.map.defaultZoom';
  static STORAGE_CENTER_NAME = 'mg.openlayers.map.defaultCenter';

  loading = false;

  menuIndex = 0;

  drawState = false;

  selected = null;

  bikes = null;

  selectCity = '无';

  inspectorAreaState = false;

  inputValue = undefined;

  enableState = undefined;

  popUPState = false;

  cityList = undefined;

  assignInspector = undefined;

  assignInspectorAreas = undefined;

  inspector = undefined;

  inspectorsData = null;

  currentInspectorId = undefined;

  popUPInfo = {};

  operatingItem = undefined;

  constructor (mapStore) {
    if (!mapStore) throw  new Error('should bind a mapStore');
    this.mapStore = mapStore;
    this.mapStore.on('load', map => {
      this.center = proj.toLonLat(map.getView().getCenter());
      this._feachInspection();
      this._fetchCities();
      this._feachBikesData();
      this._fetchCities();
    })
  }

  load(){
    setInterval(_=>this.saveCenterAndZoom(),1000)
  }

  saveCenterAndZoom (center, zoom) {
    const map = this.mapStore.map;
    let mapCenter = proj.toLonLat(map.getView().getCenter());
    let mapZoom = map.getView().getZoom();
    localStorage.setItem(operateMapStore.STORAGE_CENTER_NAME, mapCenter);
    localStorage.setItem(operateMapStore.STORAGE_ZOOM_NAME, mapZoom);
  }

  selectCityMethod (city) {
    this.selectCity = city
  }

  searchInspector (value) {
    this.inspector = value;
  }

  inspectorIsHavOrder (item, processingInspectionOrder, city) {
    (async _ => {
      if (!processingInspectionOrder) {
        let backUserId = await updateUserCitybyId({ id: item._id, city });
        if (backUserId) {
          let backId = await createInpectionOrder(item._id);
          if (backId) {
            let newData = await fetchUserById({
              id: item._id,
              selector: 'name tel inspectorInfo idCardInfo avatar enable',
              populateSelector: {
                'inspectorInfo.inspectionAreas': 'name'
              }
            });
            this.inspectorsData = this.inspectorsData.map(inspector => inspector._id === newData._id ? newData : inspector);
          }
        }
        this.popUPfunction()
      } else {
        let backId = await finishInpectionOrder(item.inspectorInfo.processingInspectionOrder._id);
        if (backId) {
          let newData = await fetchUserById({
            id: item._id,
            selector: 'name tel inspectorInfo idCardInfo avatar enable',
            populateSelector: {
              'inspectorInfo.inspectionAreas': 'name'
            }
          });
          this.inspectorsData = this.inspectorsData.map(inspector => inspector._id === newData._id ? newData : inspector);
        }
      }
    })()
  }

  assignInspectorClick (item, e) {
    this.operatingItem = item;
    this.currentInspectorId = item._id
    this.mapStore.map.on('mousedown', e => {
      if (e.keydown === 2) {

      }
    })
  }

  updateInspectorType (id, type) {
    (async _ => {
      let backId = await updateInspector(id, type);
      if (backId) window.iziToast.success({ title: '更换成功' });
      let newData = await fetchUserById({
        id: backId._id, selector: 'name tel inspectorInfo idCardInfo avatar enable',
        populateSelector: {
          'inspectorInfo.inspectionAreas': 'name'
        }
      });
      this.inspectorsData = this.inspectorsData.map(item => item._id === newData._id ? newData : item);
      this.popUPfunction();
    })()
  }

  updateInspectorTaskgroup (id, taskGroup, isChecked) {
    if (!isChecked) {
      addTaskGroup(id, taskGroup).then(data => {
        window.iziToast.success({ title: '请求成功' });
        fetchUserById({
          id: data._id, selector: 'name tel inspectorInfo idCardInfo avatar enable',
          populateSelector: {
            'inspectorInfo.inspectionAreas': 'name'
          }
        }).then(data => {
          this.inspectorsData = this.inspectorsData.map(item => item._id === data._id ? data : item)
        })
      });
      this.popUPfunction();
    } else {
      removeTaskGroup(id, taskGroup).then(data => {
        window.iziToast.success({ title: '请求成功' });
        fetchUserById({
          id: data._id, selector: 'name tel inspectorInfo idCardInfo avatar enable',
          populateSelector: {
            'inspectorInfo.inspectionAreas': 'name'
          }
        }).then(data => {
          this.inspectorsData = this.inspectorsData.map(item => item._id === data._id ? data : item)
        })
      });
      this.popUPfunction();
    }
  }

  popUPfunction (title, content, control) {
    this.popUPInfo = { title, content, control };
    this.popUPState = !this.popUPState;
  }

  propChange (key, value) {
    this.inputValue = null;
    if (!value) value = '';
    this.inputValue = { [key]: value };
    this.selected.setProperties({ [key]: value });
  }

  propKeyDown (e) {
    if (e.keyCode === 13) {
      if (this.inputValue.name) {
        updateName(this.selected.getProperties()._id, this.inputValue.name).then(data => window.iziToast.success({ title: '修改名称成功' })).catch(_ => window.iziToast.error({ title: '修改失败' }));
        Reflect.deleteProperty(this.inputValue, 'name');
      } else if (this.inputValue.city) {
        updateCity(this.selected.getProperties()._id, this.inputValue.city).then(data => window.iziToast.success({ title: '修改城市成功' })).catch(_ => window.iziToast.error({ title: '修改失败' }));
        Reflect.deleteProperty(this.inputValue, 'city');
      }
    }
  }

  menuClick (menu) {
    this.menuIndex = menu;
    this.selected = null;
    this.popUPState = false;
    this.currentInspectorId = null;
    if (this.bikeLayer) {
      if (this.menuIndex === 2) {
        this.bikeLayer.setVisible(false)
      } else {
        this.bikeLayer.setVisible(true)
      }
    }
    if (this.menuIndex !== 2) {
      this.inspectionAreaVectorLayer && this.inspectionAreaVectorLayer.setVisible(true);
      this.inspectionAreaVectorLayer && this.inspectorAreaEditorLayer.setVisible(false);
      this.drawState = false;
      if (this.modify && this.modify.getActive()) this.modify.setActive(false);
      if (this.snap && this.snap.getActive()) this.snap.setActive(false);
      if (this.draw && this.draw.getActive()) this.draw.setActive(false);
    } else {
      this.inspectionAreaVectorLayer.setVisible(false);
      this.inspectorAreaEditorLayer.setVisible(true);
      if (this.modify && !this.modify.getActive()) this.modify.setActive(true);
      if (this.snap && !this.snap.getActive()) this.snap.setActive(true);
      if (this.draw && !this.draw.getActive()) this.draw.setActive(false);
    }
  }

  drawClick () {
    this.drawState = !this.drawState;
    this.draw.setActive(this.drawState);
    this.modify.setActive(!this.drawState);
  }

  enableClick (enble) {
    (async _ => {
      this.enableState = !enble;
      this.selected.setProperties({ enable: this.enableState });
      let newData = await updateEnable(this.selected.getProperties()._id, this.enableState);
      if (newData) window.iziToast.success({ title: `${this.enableState ? '启用该区块' : '取消启用该区块'}` })
    })()

  }

  removeClick () {
    (async _ => {
      if (!this.selected) return;
      let id = this.selected.getProperties()._id;
      let deleteId = await removeInsperctionAre(id);
      if (deleteId) window.iziToast.success({ title: '删除巡检区成功' });
      this.inspectionAreaVectorLayer.getSource().removeFeatrue(this.selected);
    })()
  }

  modifyClick () {
    this.drawState = false;
    this.draw.setActive(false);
    this.modify.setActive(true);
  }

  _fetchCities () {
    (async _ => {
      let cityList = await fetchCities();
      this.cityList = cityList
    })()
  }

  _interaction () {
    this.select = new Select({
      style: [new Style({
        fill: new Fill({
          color: 'rgba(255,255,255,0.5)',
        }),
        stroke: new Stroke({
          color: '#3399CC',
          width: 1.25
        })
      }), new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({
            color: 'purple'
          })
        }),
        geometry: function (feature) {
          if (feature.getGeometry().getCoordinates().length === 2) {
            if (!feature.getProperties().bikeArea) {
              return new Point(feature.getGeometry().getCoordinates())

            }
          } else {
            let coordinates = feature.getGeometry().getCoordinates()[0];
            if (coordinates.length) {
              if (!feature.getProperties().bikeArea) {
                return new MultiPoint(coordinates);
              }
            }
          }
        }
      })],
      filter: feature => (feature.getGeometry().getType() === 'Polygon'&&!feature.getProperties().bikeArea) || feature.getProperties().clickType === 'bike',
      wrapX: false,
    });
    this.modify = new Modify({
      features: this.select.getFeatures()
    });
    this.draw = new Draw({
      source: this.inspectorAreaEditorLayer.getSource(),
      type: 'Polygon',
    });
    this.snap = new Snap({
      source: this.inspectorAreaEditorLayer.getSource(),
    });
    let interactions = [this.select, this.modify, this.draw, this.snap];
    interactions.map(item => this.mapStore.map.addInteraction(item));
    this.draw.setActive(false);
    this.modify.setActive(false);
    this.snap.setActive(false);
    this.select.on('select', async e => {
      let sourceSelected = e.selected;
      if (this.menuIndex !== 2) {
        if (sourceSelected.length && sourceSelected.length < 2) {
          this.selected = sourceSelected[0];
          if (this.bikeAreaLayer) this.mapStore.map.removeLayer(this.bikeAreaLayer);
          if (this.selected.getProperties().clickType === 'bike') {
            this._renderBikeArea()
          }
          if (this.operatingItem && this.selected.getProperties().clickType === 'inspectionArea') {
            if (!this.operatingItem.inspectorInfo.inspectionAreas.some(item => item._id === this.selected.getProperties()._id)) {
              if (this.operatingItem.inspectorInfo.inspectionAreaColor) {
                this.selected.setStyle(new Style({ fill: new Fill({ color: colorFunction(this.operatingItem.inspectorInfo.inspectionAreaColor, .4).rgba }) }));
                this.selected.setProperties({ inspectorColor: this.operatingItem.inspectorInfo.inspectionAreaColor });
              }
              let backId = await addInspectionAreas(this.operatingItem._id, this.selected.getProperties()._id);
              if (backId) {
                window.iziToast.success({ title: '请求成功' });
                let newData = await fetchUserById({
                  id: backId._id,
                  selector: 'name tel inspectorInfo idCardInfo avatar enable',
                  populateSelector: {
                    'inspectorInfo.inspectionAreas': 'name'
                  }
                });
                this.inspectorsData = this.inspectorsData.map(item => item._id === newData._id ? newData : item);
              }
            } else {
              this.selected.setProperties({ inspectorColor: null });
              this.selected.setStyle(new Style({ fill: new Fill({ color: colorFunction('#6e8243', .4).rgba }) }));
              let deleteId = removeInspectionAreas(this.operatingItem._id, this.selected.getProperties()._id);
              if (deleteId) {
                window.iziToast.success({ title: '请求成功' });
                let newData = await fetchUserById({
                  id: deleteId._id,
                  selector: 'name tel inspectorInfo idCardInfo avatar enable',
                  populateSelector: {
                    'inspectorInfo.inspectionAreas': 'name'
                  }
                });
                this.inspectorsData = this.inspectorsData.map(item => item._id === newData._id ? newData : item)
              }
            }
          }
        } else {
          this.selected = null;
          if (this.bikeAreaLayer) this.mapStore.map.removeLayer(this.bikeAreaLayer)
        }
      }else{
        this.selected=sourceSelected[0];
      }
    });
    this.select.on('change:active', e => {
      let selectedFeatures = this.select.getFeatures();
      selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures)
    });
    this.draw.on('drawend', async e => {
      this.modifyClick();
      this.selected = null;
      e.feature.setProperties({ polygonType: '巡检区', name: '未命名', city: '未定义' });
      let pathData = e.feature.getGeometry().getCoordinates()[0].map(item => proj.toLonLat(item));
      let newPolygon = await createInspectionAre('未命名', '未定义', [pathData]);
      if (newPolygon) window.iziToast.success({ title: '创建巡检区成功', message: `id:${newPolygon._id}` });
    });
    this.modify.on('modifystart', e => {
    });
    this.modify.on('modifyend', async e => {
      const featuresArray = e.features.getArray();
      for (let item of featuresArray) {
        let pathData = item.getGeometry().getCoordinates()[0].map(item => proj.toLonLat(item));
        let data = await updateBoundary(item.getProperties()._id, [pathData]);
        if (data) {
          window.iziToast.success({ title: '更新边界成功', message: `id:${data._id}` });
          let newArea = await fetchInspeectionAreaById(data._id, {
            selector: 'geometry.wgs84 city _id name enable creator',
            populateSelector: {
              'creator': 'name createdAt'
            }
          });
          this._handleOneInspectionArea(newArea);
        }
      }
    });
    let mapDiv = this.mapStore.map.getViewport();
    mapDiv.oncontextmenu = e => {
      e.preventDefault();
      this.currentInspectorId = null;
    }
  }

  _feachInspection () {
    this.loading = true;
    (async _ => {
      this.inspectorsData = await fetchUserLists({
        query: {
          'roles': { $in: ['inspector'] }
        },
        limit: 0,
        sort: {},
        selector: 'name tel inspectorInfo idCardInfo avatar enable',
        populateSelector: {
          'inspectorInfo.inspectionAreas': 'name',
        }
      });
      let inspectionAreaData = await fetchInspectionAreas({
        query: {},
        limit: 0,
        selector: 'geometry.wgs84 city _id name enable creator',
        populateSelector: {
          'creator': 'name createdAt'
        }
      });
      this.loading = false;
      this._renderVectorInspectionArea(inspectionAreaData);
      this._renderInspectors();
    })();
  }

  _handleVectorInspectionAreaData (data) {
    let dataAry = data.map(item => {
      if (!item.enable) return null;
      const polygon = item.geometry.wgs84.coordinates[0].map(point => proj.fromLonLat(point));
      let area;
      for (let inspector of this.inspectorsData) {
        if (inspector.inspectorInfo.inspectionAreas.length && inspector.inspectorInfo.inspectionAreaColor) {
          let inspectorColor = colorFunction(inspector.inspectorInfo.inspectionAreaColor, 0.4).rgba;
          for (let i = 0; i < inspector.inspectorInfo.inspectionAreas.length; i++) {    //巡检员的包含的巡检区
            let areaId = inspector.inspectorInfo.inspectionAreas[i]._id;                   //是否和巡检区的id相同
            if (areaId === item._id) {
              area = {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [polygon]
                },
                properties: {
                  inspectorColor: inspectorColor,
                  polygonType: '巡检区',
                  name: item.name,
                  city: item.city,
                  enable: item.enable,
                  _id: item._id,
                  creator: item.creator,
                  clickType: 'inspectionArea'
                }
              }
            }
          }
        }
      }
      if (area) return area;
      return {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [polygon]
        },
        properties: {
          polygonType: '巡检区',
          name: item.name,
          city: item.city,
          enable: item.enable,
          _id: item._id,
          creator: item.creator,
          clickType: 'inspectionArea'
        }
      }
    });
    return dataAry.filter(item => !!item);
  }

  _handleOneInspectionArea (data) {
    const polygon = data.geometry.wgs84.coordinates[0].map(point => proj.fromLonLat(point));
    this.inspectionAreaVectorLayer.getSource().getFeatures().forEach(item => {
      if (item.getProperties()._id === data._id) {
        item.setGeometry(new Polygon([polygon]));
        item.setProperties({
          name: data.name,
          city: data.city,
        })
      }
    });
  }

  _renderVectorInspectionArea (polygons) {
    let styles = {
      '巡检区': new Style({
        geometry: function (feature) {
          if (!feature.getProperties().inspectorColor) {
            feature.setStyle([new Style({
              fill: new Fill({
                color: colorFunction('#6e8243', .4).rgba
              })
            }), new Style({
              image: new Circle({ radius: 3, fill: new Fill({ color: 'purple' }) }),
              geometry: function (feature) {
                let coordinates = feature.getGeometry().getCoordinates()[0];
                return new MultiPoint(coordinates);
              }
            })]);
            let coordinates = feature.getGeometry().getCoordinates();
            return new Polygon(coordinates);
          } else {
            feature.setStyle([new Style({
              fill: new Fill({
                color: feature.getProperties().inspectorColor
              })
            }),
              new Style({
                image: new Circle({ radius: 3, fill: new Fill({ color: 'purple' }) }),
                geometry: function (feature) {
                  let coordinates = feature.getGeometry().getCoordinates()[0];
                  return new MultiPoint(coordinates);
                }
              })]);
            let coordinates = feature.getGeometry().getCoordinates();
            return new Polygon(coordinates);
          }
        }
      })
    };
    let editSyles = {
      '巡检区': [new Style({
        fill: new Fill({
          color: colorFunction('#6e8243', .4).rgba
        })
      }),
        new Style({
          image: new Circle({ radius: 3, fill: new Fill({ color: 'purple' }) }),
          geometry: function (feature) {
            let coordinates = feature.getGeometry().getCoordinates()[0];
            return new MultiPoint(coordinates);
          }
        })]
    };
    let styleFunction = feature => feature.getProperties() ? styles[feature.getProperties().polygonType] : null;
    let editStyleFunction = feature => feature.getProperties() ? editSyles[feature.getProperties().polygonType] : null;
    let inspectionAreaData = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:3857'
        }
      },
      features: this._handleVectorInspectionAreaData(polygons)
    };
    let inspectionAreaSource = new SourceVector({
      features: (new GeoJson()).readFeatures(inspectionAreaData)
    });
    this.inspectionAreaVectorLayer = new layerVector({
      source: inspectionAreaSource,
      style: styleFunction,
    });
    let inspectionAreaEditorSource = new SourceVector({
      features: (new GeoJson()).readFeatures(inspectionAreaData)
    });
    this.inspectorAreaEditorLayer = new layerVector({
      source: inspectionAreaEditorSource,
      style: editStyleFunction,
    });
    this.mapStore.map.addLayer(this.inspectionAreaVectorLayer);
    this.mapStore.map.addLayer(this.inspectorAreaEditorLayer);
    this.inspectorAreaEditorLayer.setVisible(false);
    this._interaction()
  }

  _feachBikesData () {
    (async _ => {
      let bikesData = await fetchBikes({
        query: {},
        limit: 0,
        selector: 'gis task no location battery use status biz inspection isAbleMaintain latestReportedAt enable remark'
      });
      this._renderBikesPointData(bikesData)
    })()
  }

  _handleVectorBikesData (data) {
    return data.map(item => {
      if (!item.location || !item.location.lngLat || !item.location.lngLat.wgs84) return null;
      const points = proj.fromLonLat(item.location.lngLat.wgs84.coordinates);
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: points
        },
        properties: {
          project: item.project,
          inspection: item.inspection, //巡检信息
          biz: item.biz,   //车况
          status: item.status, //  状态信息
          isAbleMaintain: item.isAbleMaintain,//
          location: item.location,//点位置
          task: item.task,//任务
          no: item.no,//车牌号
          battery: item.battery,//电池
          use: item.use,//使用信息
          gis: item.gis,//位置业务数据
          latestReportedAt: item.latestReportedAt,//最近一次上报时间, 超过一定时间为上报数据将不再维护
          enable: item.enable, //是否启用, 停用的将不再维护
          remark: item.remark,  //车辆备注
          clickType: 'bike'
        }
      }
    })
  }

  _renderBikesPointData (points) {
    let bikesFeatures = this._handleVectorBikesData(points);
    let styles = {
      'bike': [new Style({
        image: new Circle({
          radius: 4,
          fill: new Fill({
            color: '#DC143C'
          })
        }),
      })]
    };
    let pointData = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:3857'
        }
      },
      features: bikesFeatures.filter(item => {
        return !!item;
      })
    };
    let styleFunction = feature => feature.getProperties() ? styles[feature.getProperties().clickType] : null;
    let sourcePoint = new SourceVector({
      features: (new GeoJson()).readFeatures(pointData)
    });
    this.bikeLayer = new layerVector({
      source: sourcePoint,
      style: styleFunction
    });
    this.mapStore.map.addLayer(this.bikeLayer);
  }

  _handleBikeAreaData (data) {
    let dataAry = Object.keys(data).map(key => {
        let item = data[key];
        if (item) {
          return {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [item.wgs84.coordinates[0].map(point => proj.fromLonLat(point))]
            },
            properties: {
              bikeArea: key
            }
          }
        }
      }
    );
    return dataAry.filter(item => !!item)
  }

  _renderBikeArea () {
    const { serviceArea, validArea, invalidArea } = this.selected.getProperties().gis;
    let bikeData = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:3857'
        }
      },
      features: this._handleBikeAreaData({ serviceArea, validArea, invalidArea })
    };
    let sourceBikeArea = new SourceVector({
      features: (new GeoJson()).readFeatures(bikeData)
    });
    this.bikeAreaLayer = new layerVector({
      source: sourceBikeArea
    });
    this.mapStore.map.addLayer(this.bikeAreaLayer);
  }

  _handleInspectorsData (data) {
    let dataAry = data.map(item => {
      if (!item.inspectorInfo.location || !item.inspectorInfo.location.lngLat || !item.inspectorInfo.location.lngLat.wgs84 || !item.inspectorInfo.location.lngLat.wgs84.coordinates) return;
      const point = proj.fromLonLat(item.inspectorInfo.location.lngLat.wgs84.coordinates);
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: point
        },
        properties: {
          clickType: 'inspector',
          inspectionAreaColor: 'inspectionAreaColor',
          personType: '巡检人员'
        }
      }
    });
    return dataAry.filter(item => !!item);
  }

  _renderInspectors () {
    let styles = {
      '巡检人员': [new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({
            color: 'blue'
          })
        }),
      })]
    };
    let styleFunction = feature => feature.getProperties() ? styles[feature.getProperties().personType] : null;
    let inspectors = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:3857'
        }
      },
      features: this._handleInspectorsData(this.inspectorsData)
    };
    let sourceInspector = new SourceVector({
      features: (new GeoJson()).readFeatures(inspectors)
    });
    this.inspectorLayer = new layerVector({
      source: sourceInspector,
      style: styleFunction
    });
    this.mapStore.map.addLayer(this.inspectorLayer);
  }
}