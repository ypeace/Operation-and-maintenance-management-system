// 项目
// 项目以商户×城市为单位

const connection = require('../../connections').core;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // 项目名称，如：芒果电单车-北京
  name: { type: String, required: true },
  // 城市
  city: { type: String, required: true },
  // 配置
  settings: {
    // 车辆牌号解析规则
    noParser: { type: String, required: true },
    // 请求加签密钥
    requestSignatureSecretKey: { type: String, required: true },
    // 返回值加密密钥
    responseEncryptionSecretKey: { type: String, required: true },
    // 返回值加密iv
    responseEncryptionIV: { type: String, required: true },
    // 下行接口回调地址
    callbackURI: String,
    // 任务单价配置
    unitPrice: {
      // 换电
      changeBattery: { type: Number, default: 0 },
      // 挪回服务区
      moveInServiceArea: { type: Number, default: 0 },
      // 挪出不合法区域
      moveOutInvalidArea: { type: Number, default: 0 },
      // 挪入合法区域
      moveInValidArea: { type: Number, default: 0 },
      // 拖回站点
      backToStation: { type: Number, default: 0 },
      // 投放
      putOn: { type: Number, default: 0 },
      // 难寻
      hardToFind: { type: Number, default: 0 },
      // 唤醒
      weakUp: { type: Number, default: 0 },
    },
  },
  // 电池修正值：用于校准项目中电池总数的值
  batteryCountCorrectionValue: { type: Number, default: 0 },
  // 是否启用
  enable: { type: Boolean, default: true },
});

schema.index({ name: 1 }, { unique: true });
schema.index({ city: 1 });

const { mangoPlugin } = require('../../mango');

schema.plugin(require('mongoose-better-id'), { connection });
schema.plugin(mangoPlugin);

module.exports = connection.model('project', schema);