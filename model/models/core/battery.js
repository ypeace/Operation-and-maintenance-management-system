// 电池

const connection = require('../../connections').core;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../../../utils/constants');

const schema = new Schema({
  // 所属项目 ref
  project: { type: String, required: true },
  // 是否启用
  enable: { type: Boolean, default: true },
  // 电池标记
  mark: String,
  // 二维码
  qr: String,
  // 该电池是否是占位电池，占位电池用于替代未知电池
  isPlaceholder: { type: Boolean, default: false },
  // 去向
  locate: { type: Number, required: true, enums: constants.CORE_BATTERY_LOCATE_ENUMS, default: constants.CORE_BATTERY_LOCATE.在库 },
  // 是否在充电
  isCharging: { type: Boolean, default: false, required: true },
  // 是否满电可用
  isFull: { type: Boolean, default: true, required: true },
  // 所在仓库，若不在仓库，则表示发出该电池的站点 ref
  station: String,
  // 所在运营人员 ref
  inspector: String,
  // 所属巡检订单 ref
  inspectionOrder: String,
  // 所在车辆 ref
  bike: String,
  // 是否疑似丢失，绑定在车辆上时，车辆若检测到高压断电，则认为该电池疑似丢失
  isSuspectedLost: { type: Boolean, default: false },
  // 定位信息
  location: {
    // 绑定的设备号
    imei: String,
    // 定位
    lngLat: {
      wgs84: [Number],
      gcj02: [Number],
    },
    // 速度
    speed: Number,
    // 方向角
    course: Number,
  },
});

schema.index({ qr: 1 }, { unique: true, sparse: true });
schema.index({ mark: 1 }, { unique: true, sparse: true });
schema.index({ 'location.imei': 1 }, { unique: true, sparse: true });
schema.index({ 'location.lngLat.gcj02': '2dsphere' }, { sparse: true });

const { mangoPlugin } = require('../../mango');

schema.plugin(require('mongoose-better-id'), { connection });
schema.plugin(mangoPlugin);

module.exports = connection.model('battery', schema);