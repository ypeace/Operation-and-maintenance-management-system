// 车辆

const connection = require('../../connections').core;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../../../utils/constants');

const Polygon = {
  wgs84: Schema.Types.Polygon,
  gcj02: Schema.Types.Polygon,
};
const Point = {
  // wgs84经纬度
  wgs84: Schema.Types.Point,
  // gcj02经纬度
  gcj02: Schema.Types.Point,
};

const schema = new Schema({
  // 所属项目 ref
  project: { type: String, required: true },
  // 车辆编号
  no: { type: String, required: true },
  // 位置信息
  location: {
    lngLat: Point,
    // 定位时间
    time: Date,
    // 速度
    speed: Number,
    // 方向角
    course: Number,
    // 是否无定位
    isNoLocation: Boolean,
    // 无定位之后是否被扫码
    isScannedAfterNoLocation: Boolean,
    // 无定位后最后一次扫码时间
    latestScannedAfterNoLocationAt: Date,
    // 最近异常速度时间
    latestIllegalSpeedAt: Date,
    // 是否异常速度
    isIllegalSpeed: { type: Boolean, default: false },
  },
  // 位置业务数据
  gis: {
    // 运营范围，若无此字段，则不推算回栏任务
    serviceArea: Polygon,
    // 距离最近的合法区域，若无此字段，则不推算挪至合法区域任务
    validArea: Polygon,
    // 当前所在（由第三方提供的）不合法区域
    invalidArea: Polygon,
    // 当前所在（由调用芒果接口获取的）不合法区域ID
    invalidAreaId: String,
    // 运营范围外最小不可用距离：缓冲区
    minInvalidDistanceOutServiceArea: { type: Number, default: 0 },
    // 运营范围内最小安全距离
    minValidDistanceInServiceArea: { type: Number, default: 0 },
    // 计算的位置信息
    // 是否在服务区缓冲区外
    isOutServiceBufferArea: { type: Boolean, default: false },
    // 是否在服务区外
    isOutServiceArea: { type: Boolean, default: false },
    // 是否在服务区内
    isInServiceArea: { type: Boolean, default: true },
    // 是否在不合法区域内：特指禁行区
    isInInvalidArea: { type: Boolean, default: false },
    // 是否不在合法区域内
    isOutValidArea: { type: Boolean, default: false },
    // 距离服务区边界多远 + 在服务区内  - 在服务区外  null 无需计算
    distanceWithServiceArea: Number,
    // 距离不合法区域边界多远 - 在不合法区内 null 不在不合法区域内
    distanceWithInvalidArea: Number,
    // 距离合法区域边界多远 + 在合法区域内  - 在合法区域外  null 无需计算
    distanceWithValidArea: Number,
    // 当前所在巡检区
    inspectionArea: {
      id: String,
      name: String,
    },
  },
  // 电池信息
  battery: {
    // 绑定的电池id  ref
    id: String,
    // 电压
    voltage: Number,
    // 最低可用电压
    minValidVoltage: Number,
    // 最低满电电压
    minFullVoltage: Number,
    // 最高馈电电压
    maxEmptyVoltage: Number,
    // 电池型号
    model: String,
    // 额定电压
    ratedVoltage: Number,
    // 额定电流
    ratedCurrent: Number,
    // 总续航里程
    totalMileage: Number,
    // 是否断电
    isUnlink: Boolean,
    // 通过基础信息计算的信息
    // 电量
    power: { type: Number, min: 0, max: 100 },
    // 是否低电不可租
    isLowPowerInvalid: Boolean,
    // 是否零电：零电任务
    isNoPower: Boolean,
    // 是否极低电压：困难换电任务
    isVeryLowPower: Boolean,
    // 是否低电：低电任务
    isLowPower: Boolean,
    // 是否低压预警：低压预警任务
    isLowPowerWarning: Boolean,
    // 是否高压预警：高压预警任务
    isPowerWarning: Boolean,
    // 最近未断电时的电压
    latestLinkVoltage: { type: Number, default: 0 },
    // 最近为断电时的电量
    latestLinkPower: { type: Number, default: 0 },
    // 是否高压断电：被盗断电任务，除此之外为零电断电任务
    isAbnormalUnlink: Boolean,
  },
  // 使用信息
  use: {
    // 最近一笔订单信息
    latestOrder: {
      // 订单开始时间
      startedAt: Date,
      // 订单结束时间
      finishedAt: Date,
      // 用户姓名
      username: String,
      // 用户手机号
      tel: String,
      // 结束订单的位置
      finishedLocation: Point,
    },
    // 最近的扫码记录
    scan: [{
      // 扫码时间
      scannedAt: Date,
      // 扫码位置
      location: Point,
    }],
    // 最近一次扫码时间：扫码车任务
    latestScannedAt: Date,
  },
  // 状态信息
  status: {
    // 是否在线：离线任务
    isOnline: Boolean,
    // 是否离线复活
    isRevival: Boolean,
    // 是否高压离线
    isAbnormalOffline: Boolean,
    // 最后一次在线时间
    latestOnlineAt: Date,
    // 离线后是否被扫码
    isScannedAfterOffline: Boolean,
    // 离线后最后一次被扫码时间
    latestScannedAfterOfflineAt: Date,
    // GSM信号
    gsmSignal: Number,
    // 电门是否打开
    isAccOn: Boolean,
    // 是否设防
    isLockOn: Boolean,
    // 电池仓锁是否加锁
    isBatteryLockOn: Boolean,
  },
  // 业务状态
  biz: {
    // 损坏状态：损坏任务
    damageState: { type: Number, enums: constants.CORE_BIKE_DAMAGE_STATE_ENUMS, default: constants.CORE_BIKE_DAMAGE_STATE.完好 },
    // 车辆当前去向：待拖回任务、调度中任务、被扣押任务
    locate: { type: Number, enums: constants.CORE_BIKE_LOCATE_ENUMS, default: constants.CORE_BIKE_LOCATE.投放中 },
    // 丢失时间
    lostAt: Date,
    // 丢失后是否扫码
    isScannedAfterLost: Boolean,
    // 丢失后最近扫码时间
    latestScannedAfterLostAt: Date,
    // 扣押时间
    detainedAt: Date,
    // 开始调度时间
    dispatchedAt: Date,
    // 待拖回时间
    needBackAt: Date,
    // 其他占用时间
    holdAt: Date,
    // 投放时间
    putOnAt: Date,
    // 回仓时间
    backToStationAt: Date,
    // 车辆如果在库，在哪个仓库 ref
    station: String,
    // 最后一次更新去向时填写的备注
    latestUpdatedLocateRemark: String,
    // 最近一次挪车时间：唤醒任务
    latestMovedAt: Date,
    // 是否可租 由于运维原因引起的不可租
    isValid: { type: Boolean, default: true },
    // 不可租的原因
    invalidReasons: [{
      issuedAt: Date,
      code: { type: Number, enums: constants.CORE_BIKE_INVALID_REASON_ENUMS },
    }],
  },
  // 巡检信息
  inspection: {
    // 最近一次换电时间
    latestChangeBatteryAt: Date,
    // 最近一次挪回服务区时间
    latestMoveInServiceAreaAt: Date,
    // 最近一次挪出不合法区域时间
    latestMoveOutInvalidAreaAt: Date,
    // 最近一次挪入合法区域时间
    latestMoveInValidAreaAt: Date,
    // 最近一次拖回站点
    latestBackToStationAt: Date,
    // 最近一次投放时间
    latestPutOnAt: Date,
    // 最近一次巡检是否找到车辆
    hasFound: Boolean,
    // 最近一次巡检时间
    latestFoundAt: Date,
    // 最近一次找到时间
    latestFoundedSucceedAt: Date,
    // 最近一次未找到时间
    latestNotFoundAt: Date,
    // 未找到记录
    notFoundRecords: [{
      // 打卡时间
      time: Date,
      // 打卡人
      finder: {
        id: String,
        identity: { type: Number, enums: constants.CORE_USER_IDENTITY_ENUMS, default: constants.CORE_USER_IDENTITY.司机 },
        name: String,
        tel: String,
      },
      // 未找到原因
      reason: { type: Number, enums: constants.CORE_BIKE_FIND_FAILED_REASON_ENUMS },
      // 打卡地点
      lngLat: Point,
    }],
    // 难寻等级：难寻任务
    notFoundLevel: { type: Number, enums: constants.CORE_USER_IDENTITY_ENUMS },
    // 最近一次难寻找到时间
    latestHardToFindButFoundedAt: Date,
    // 最近一次完成唤醒任务时间
    latestWeakUpAt: Date,
    // 当前分配的巡检人员的姓名电话
    inspector: {
      id: String,
      name: String,
      tel: String,
    },
  },
  // 任务信息
  task: {
    // 是否可投放：待投放任务
    isAblePutOn: Boolean,
    // 是否有任务
    hasTask: Boolean,
    // 任务组
    taskList: [{
      code: { type: Number, enums: constants.CORE_BIKE_TASK_ENUMS },
      issuedAt: Date,
    }],
    // 最高权值任务
    highestTask: { type: Number, enums: constants.CORE_BIKE_TASK_ENUMS },
    // 任务组
    taskGroup: { type: Number, enums: constants.CORE_BIKE_TASK_GROUP_ENUMS },
    // 匹配任务组时间
    matchTaskGroupAt: Date,
    // 是否手动分配任务
    isManualAssignTask: Boolean,
  },
  // 是否可进行维护工作
  isAbleMaintain: { type: Boolean, default: true },
  // 最近一次上报数据时间，超过一定时间未上报数据，将不再维护
  latestReportedAt: Date,
  // 是否启用，停用的将不再维护
  enable: { type: Boolean, default: true },
  // 车辆备注
  remark: String,
});

schema.index({ no: 1, project: 1 }, { unique: true });
schema.index({ 'biz.locate': 1 });
schema.index({ 'biz.station': 1 });

const { mangoPlugin } = require('../../mango');

schema.plugin(require('mongoose-better-id'), { connection });
schema.plugin(mangoPlugin);

module.exports = connection.model('bike', schema);