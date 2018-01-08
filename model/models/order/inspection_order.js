// 巡检订单

const connection = require('../../connections').order;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../../../utils/constants');

const schema = new Schema({
  // 巡检人员 ref
  inspector: {
    id: { type: String, required: true },
    // 姓名
    name: String,
    // 手机号
    tel: String,
    // 身份
    identity: { type: Number, enums: constants.CORE_USER_IDENTITY_ENUMS, default: constants.CORE_USER_IDENTITY.司机 },
    // 车辆类型
    vehicleType: { type: Number, enums: constants.CORE_USER_INSPECTOR_VEHICLE_TYPE_ENUMS },
    // 调度能力
    dispatchAbility: { type: Number, default: 0 },
  },
  // 所属城市
  city: { type: String, required: true },
  //
  state: { type: Number, required: true, enums: constants.ORDER_INSPECTION_ORDER_STATE_ENUMS, default: constants.ORDER_INSPECTION_ORDER_STATE.派单中 },
  // 价格设置
  price: {
    // 巡检人员的计价规则
    inspector: {
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
    // 代理的计价规则
    agent: {
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
  },
  // 电池情况
  battery: {
    // 领用列表
    receive: [String],
    // 当前携带
    current: [String],
    // 可用电池数
    currentValid: { type: Number, default: 0 },
    // 归还列表
    returnBack: [String],
    // 归还未知数量
    returnBackCorrectionValue: { type: Number, default: 0 },
  },
  // 已巡检的车辆列表
  inspectedBikes: [{
    // 车辆ID
    id: String,
    // 车牌号
    no: String,
    // 车辆所属项目
    project: String,
    // 开始时状态
    start: {
      // 任务列表快照
      taskList: [],
      // 开始时间
      time: Date,
      // 车辆去向
      locate: Number,
      // 电池
      battery: {
        id: String,
        // 二维码
        qr: String,
        // 电池标记
        mark: String,
        // 是否是占位电池
        isPlaceholder: Boolean,
      },
    },
    // 结束时的状态（最后一次打卡）
    finish: {
      // 任务快照
      taskList: [],
      // 结束时间
      time: Date,
      // 车辆去向
      locate: Number,
      // 电池
      battery: {
        id: String,
        qr: String,
        mark: String,
        isPlaceholder: Boolean,
      },
    },
    offWork: {
      // 任务快照
      taskList: [],
      time: Date,
      // 去向
      locate: Number,
      // 电池
      battery: {
        id: String,
        qr: String,
        mark: String,
        isPlaceholder: String,
      },
    },
    // 是否是自己的任务：以最终打卡为准
    isSelf: Boolean,
    // 是否有效任务：以最终打卡为准
    isValid: Boolean,
    // 释放的任务列表
    releasedTasks: [Number],
    // 添加的任务列表
    addedTasks: [Number],
    // 是否找到：以最终打卡为准
    hasFound: Boolean,
    // 电池锁是否锁定：最终打卡
    isBatteryLockOn: Boolean,
    // 最终该车是否正常
    isBikeFinalValid: Boolean,
    // 最终导致不正常的任务
    finalInvalidTasks: [Number],
    // 是否换电：最终打卡
    isChangeBattery: Boolean,
    // 是否回栏：最终打卡
    isMoveInServiceArea: Boolean,
    // 是否难寻找到：最终打卡
    isHardToFindButFound: Boolean,
    // 是否挪出不合法区域：最终打卡
    isMoveOutInvalidArea: Boolean,
    // 是否挪入合法区域：最终打卡
    isMoveInValidArea: Boolean,
    // 是否唤醒：最终打卡
    isWeakUp: Boolean,
    // 是否普通任务：最终打卡
    isNormal: Boolean,
    // 是否拖回：最终打卡
    isBackToStation: Boolean,
    // 是否投放：下最终打卡
    isPutOn: Boolean,
    // 是否错误换电：下班快照
    isChangeBatteryMistake: Boolean,
    // 是否拖回未完成：下班快照
    isBackToStationUnfinished: Boolean,
  }],
  // 分项目统计数据：非互斥统计
  statisticsOfProject: [{
    // 项目 ref
    project: String,
    // 巡检总数
    total: Number,
    // 找到数
    found: Number,
    // 拖回数
    backToStation: Number,
    // 换电数
    changeBattery: Number,
    // 回栏数
    moveInServiceArea: Number,
    // 难寻找到数
    hardToFindButFound: Number,
    // 投放数
    putOn: Number,
    // 挪出不合法区域数
    moveOutInvalidArea: Number,
    // 挪入合法区域数
    moveInValidArea: Number,
    // 唤醒数
    weakUp: Number,
  }],
  //  ：互斥统计
  statistic: {
    // 巡检总数
    total: Number,
    // 找到数
    found: Number,
    // 拖回数
    backToStation: Number,
    // 换电数
    changeBattery: Number,
    // 回栏数
    moveInServiceArea: Number,
    // 难寻找到数
    hardToFindButFound: Number,
    // 投放数
    putOn: Number,
    // 普通任务
    normal: Number,
    // 未完成拖回数
    backToStationUnfinished: Number,
    // 错误换电数
    changeBatteryMistake: Number,
    // 丢失电池数
    lostBattery: Number,
    // 巡检里程
    mileage: Number,
  },
  // 修正统计巡检数据
  fixedStatistic: {
    // 巡检总数
    total: Number,
    // 找到数
    found: Number,
    // 拖回数
    backToStation: Number,
    // 换电数
    changeBattery: Number,
    // 回栏数
    moveInServiceArea: Number,
    // 难寻找到数
    hardToFindButFound: Number,
    // 投放数
    putOn: Number,
    // 普通任务
    normal: Number,
    // 未完成拖回数
    backToStationUnfinished: Number,
    // 错误换电数
    changeBatteryMistake: Number,
    // 丢失电池数
    lostBattery: Number,
    // 巡检里程
    mileage: Number,
  },
  // 计费明细
  payment:  {
    // 计费项目
    projects: [{
      name: String,
      count: Number,
      price: {
        inspector: Number,
        agent: Number,
      },
      total: {
        inspector: Number,
        agent: Number,
      },
    }],
    // 额外计费项目
    extraProjects: [{
      id: String,
      name: String,
      total: {
        inspector: Number,
        agent: Number,
      },
    }],
    // 总计
    total: {
      inspector: { type: Number, default: 0 },
      agent: { type: Number, default: 0 },
    },
    // 结算流水号
    tradeNo: String,
  },
});

schema.index({ 'inspector.id': 1, state: 1 });
schema.index({ 'inspector.id': 1, _id: -1 });
schema.index({ 'inspector.tel': 1 });
schema.index({ 'inspector.name': 1 });
schema.index({ city: 1 });

const { mangoPlugin } = require('../../mango');

schema.plugin(require('mongoose-better-id'), { connection });
schema.plugin(mangoPlugin);

module.exports = connection.model('inspection_order', schema);