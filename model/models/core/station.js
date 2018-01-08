// 站点

const connection = require('../../connections').core;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // 城市
  city: { type: String, required: true },
  // 电池修正值：用于记录仓库中未知电池数量，以校准仓库中电池总数
  batteryCountCorrectionValue: { type: Number, default: 0 },
  // 名称
  name: { type: String, required: true },
  // 是否启用
  enable: { type: Boolean, default: true },
  // 负责人 ref
  managers: [String],
  // 地址
  location: {
    lngLat: {
      wgs84: Schema.Types.Point,
      gcj02: Schema.Types.Point,
    },
  },
});

schema.index({ project: 1 });
schema.index({ city: 1, name: 1 }, { unique: true });
schema.index({ 'location.lngLat.gcj02': '2dsphere' });

const { mangoPlugin } = require('../../mango');

schema.plugin(require('mongoose-better-id'), { connection });
schema.plugin(mangoPlugin);

module.exports = connection.model('station', schema);