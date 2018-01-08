// 巡检区域

const connection = require('../../connections').config;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // 名称
  name: { type: String, required: true },
  // 启用状态
  enable: { type: Boolean, default: false },
  // 创建人 ref
  creator: { type: String, required: true },
  // 多边形
  geometry: {
    wgs84: Schema.Types.Polygon,
    gcj02: Schema.Types.Polygon,
    // 多边形边界的hash值
    hash: String,
    // 多边形的中心
    center: {
      wgs84: Schema.Types.Point,
      gcj02: Schema.Types.Point,
    },
  },
  // 所在城市
  city: { type: String, required: true },
});

schema.index({ 'geometry.center.gcj02': '2dsphere' });
schema.index({ 'geometry.gcj02': '2dsphere', city: 1 });
schema.index({ 'geometry.hash': 1 }, { unique: true });

schema.plugin(require('mongoose-better-id'), { connection });

module.exports = connection.model('inspection_area', schema);