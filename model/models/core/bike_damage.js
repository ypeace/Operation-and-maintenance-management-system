// 车辆损坏记录

const connection = require('../../connections').core;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../../../utils/constants');

const schema = new Schema({
  // 车辆 ref
  bike: { type: String, required: true },
  // 损坏描述
  description: { type: String, required: true },
  // 照片
  photo: String,
  // 状态
  isRepaired: { type: Boolean, default: false },
  // 录损时间
  recordedAt: Date,
  // 提交人 ref
  submitter: String,
  // 修复信息
  repair: {
    // 修复时间
    time: Date,
    // 修复描述
    description: String,
    // 照片
    photo: String,
    // 修复人 ref
    repairer: String,
  },
  // 损坏程度
  state: { type: Number, required: true, enums: constants.CORE_BIKE_DAMAGE_STATE_ENUMS },
});

schema.index({ bike: 1, state: 1 });
schema.index({ bike: 1, isRepaired: 1 });

const { mangoPlugin } = require('../../mango');

schema.plugin(require('mongoose-better-id'), { connection });
schema.plugin(mangoPlugin);

module.exports = connection.model('bike_damage', schema);