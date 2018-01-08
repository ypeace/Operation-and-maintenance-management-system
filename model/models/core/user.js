// 用户

const connection = require('../../connections').core;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../../../utils/constants');

const schema = new Schema({
  // 是否启用
  enable: { type: Boolean, default: false },
  // authorization
  // 手机号
  tel: { type: String, required: true },
  // 密码
  password: { type: String, required: true },
  // 账户角色
  roles: [{ type: String, enums: constants.CORE_USER_ROLE_ENUMS }],
  // 权限
  permissions: [String],
  // profile
  // 姓名
  name: String,
  // 头像
  avatar: String,
  // 身份证认证
  idCardInfo: {
    // 身份证号
    no: String,
    // 户籍
    hometown: String,
    // 生日
    birthday: Date,
    // 性别
    gender: { type: String, enums: ['男', '女'] },
    // 正面照片
    pos: String,
    // 反面照片
    neg: String,
    // 审核状态
    state: { type: Number, enums: constants.CORE_USER_IDCARD_CERT_STATE_ENUMS, default: constants.CORE_USER_IDCARD_CERT_STATE.未提交 },
    // 号码认证尝试记录，用于判定多次尝试
    tried: [Date],
    // 自动审核通过时间
    autoResolvedAt: Date,
    // 人工审核提交时间
    manualAppliedAt: Date,
    // 人工审核通过时间
    manualResolvedAt: Date,
    // 驳回时间
    rejectedAt: Date,
    // 驳回原因
    rejectReason: String,
  },
  // 作为巡检人员，相关的信息
  inspectorInfo: {
    // 认证成为巡检人员需要的额外认证信息
    cert: {
      // 是否必须要审核通过后才能进行巡检工作
      isMustResolve: { type: Boolean, default: false },
      // 认证状态
      state: { type: Number, enums: constants.CORE_USER_INSPECTOR_CERT_STATE_ENUMS, default: constants.CORE_USER_INSPECTOR_CERT_STATE.未提交 },
      // 驳回原因
      rejectReason: String,
      // 提交时间
      appliedAt: Date,
      // 驳回时间
      rejectedAt: Date,
      // 通过时间
      resolvedAt: Date,
      // 手持身份证照片
      cardInHand: String,
      // 银行卡信息
      bankCard: {
        pos: String,
        neg: String,
        // 开户行
        bank: String,
        // 卡号
        no: String,
        // 户名
        name: String,
      },
      // 婚否
      isMarried: Boolean,
      // 住址
      address: String,
      // 驾驶证照片
      driveLicense: {
        pos: String,
        neg: String,
        // 驾驶证有效期
        expires: Date,
      },
      // 驾驶车辆信息
      vehicle: {
        // 车子类型
        type: { type: Number, enums: constants.CORE_USER_INSPECTOR_VEHICLE_TYPE_ENUMS },
        // 调度能力
        dispatchAbility: { type: Number, default: 0 },
        // 照片
        photo: String,
        // 行驶证照片
        license: {
          pos: String,
          neg: String,
          // 行驶证有效期
          expires: Date,
        },
        // 车牌号
        no: String,
      },
      // 交通强制险保单
      trafficInsurancePolicy: String,
      // 商业保险保单
      commercialInsurancePolicy: String,
    },
    // 身份
    identity: { type: Number, enums: constants.CORE_USER_IDENTITY_ENUMS, default: constants.CORE_USER_IDENTITY.司机 },
    // 所在城市
    city: String,
    // 分配的巡检区 ref
    inspectionAreas: [String],
    // 分配的任务组
    acceptTaskGroups: [Number],
    // 分配的项目 ref
    acceptProjects: [String],
    // 位置快照
    location: {
      lngLat: {
        wgs84: Schema.Types.Point,
        gcj02: Schema.Types.Point,
      },
      snappedAt: Date,
    },
    // 默认计价规则 ref
    defaultPriceRule: String,
    // 默认的代理计价规则 ref
    defaultAgentPriceRule: String,
    // 默认是否展示巡检订单的计费明细
    defaultIsShowPayment: { type: Boolean, default: false },
    // 是否正在巡检
    isWorking: { type: Boolean, default: false },
    // 当前分配的巡检区颜色
    inspectionAreaColor: String,
    // 当前进行中的巡检订单 ref  判断上下班
    processingInspectionOrder: String,
  },
  // 作为仓库管理员，相关的信息
  stationManager: {
    // 仓库管理员所属仓库  ref
    station: String,
  },
});

schema.index({ tel: 1 }, { unique: true });
schema.index({ 'idCardInfo.no': 1 }, { unique: true, sparse: true });
schema.index({ name: 1 });
schema.index({ enable: 1 });
schema.index({ roles: 1 });
schema.index({ 'inspectorInfo.city': 1 }, { sparse: true });
schema.index({
  'inspectorInfo.isWorking': 1,
  'inspectorInfo.inspectionAreas': 1,
  'inspectorInfo.acceptTaskGroups': 1,
  'inspectorInfo.acceptProjects': 1,
  'inspectorInfo.location.lngLat.gcj02': '2dsphere',
}, {
  name: 'search_match_inspector',
});
schema.index({
  'inspectorInfo.processingInspectionOrder': 1,
}, { sparse: true });

const { mangoPlugin } = require('../../mango');

schema.plugin(require('mongoose-better-id'), { connection });
schema.plugin(mangoPlugin);

module.exports = connection.model('user', schema);