// 巡检计价规则

const connection = require('../../connections').config;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // 是否启用
  enable: { type: Boolean, default: true },
  // 名称
  name: { type: String, required: true },
  // 单价
  unit: {
    // 拖回单价
    backToStation: { type: Number, default: 0 },
    // 换电
    changeBattery: { type: Number, default: 0 },
    // 回栏
    moveInServiceArea: { type: Number, default: 0 },
    // 难寻找到
    hardToFind: { type: Number, default: 0 },
    // 投放
    putOn: { type: Number, default: 0 },
    // 普通任务
    normal: { type: Number, default: 0 },
    // 拖回未完成
    backToStationUnfinished: { type: Number, default: 0 },
    // 错误换电
    changeBatteryMistake: { type: Number, default: 0 },
    // 丢失电池
    lostBattery: { type: Number, default: 0 },
  },
});

schema.index({ name: 1 }, { unique: true });

schema.plugin(require('mongoose-better-id'), { connection });

module.exports = connection.model('inspection_price_rule', schema);