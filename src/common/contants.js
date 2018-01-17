const jsonToEnums = require('@mangoebike/utils/jsonToMap');

// 用户身份认证类型
exports.CORE_USER_CERT_TYPE = {
  身份证: 0,
};
exports.CORE_USER_CERT_TYPE_ENUMS = jsonToEnums(exports.CORE_USER_CERT_TYPE);

// 用户账户类型
exports.CORE_USER_ROLE = {
  超级管理员: 'super',
  管理员: 'admin',
  线上运营: 'manager',
  巡检人员: 'inspector',
  仓库管理员: 'storage',
};
exports.CORE_USER_ROLE_ENUMS = jsonToEnums(exports.CORE_USER_TYPE);

// 运营人员身份
exports.CORE_USER_IDENTITY = {
  司机: 0,
  白班: 1,
  公关: 2,
  候命: 3,
  高手: 4,
};
exports.CORE_USER_IDENTITY_ENUMS = jsonToEnums(exports.CORE_USER_IDENTITY);

// 运营人员身份证认证状态
exports.CORE_USER_IDCARD_CERT_STATE = {
  未提交: 0,
  号码审核通过: 1,
  待人工审核: 2,
  人工审核通过: 3,
  人工审核驳回: 4,
};
exports.CORE_USER_IDCARD_CERT_STATE_ENUMS = jsonToEnums(exports.CORE_USER_IDCARD_CERT_STATE);

// 巡检人员认证状态
exports.CORE_USER_INSPECTOR_CERT_STATE = {
  未提交: 0,
  待审核: 1,
  审核通过: 2,
  驳回: 3,
};
exports.CORE_USER_INSPECTOR_CERT_STATE_ENUMS = jsonToEnums(exports.CORE_USER_INSPECTOR_CERT_STATE);

// 巡检人员驾驶车辆类型
exports.CORE_USER_INSPECTOR_VEHICLE_TYPE = {
  面包车: 1,
  金杯: 2,
  箱货: 3,
  平板车: 4,
};
exports.CORE_USER_INSPECTOR_VEHICLE_TYPE_ENUMS = jsonToEnums(exports.CORE_USER_INSPECTOR_VEHICLE_TYPE);

// 车辆去向
exports.CORE_BIKE_LOCATE = {
  在库: 0,
  投放中: 1,
  调度中: 2,
  待拖回: 3,
  疑似丢失: 4,
  丢失: 5,
  扣押: 6,
  其他占用: 7,
};
exports.CORE_BIKE_LOCATE_ENUMS = jsonToEnums(exports.CORE_BIKE_LOCATE);

// 车辆损坏状态
exports.CORE_BIKE_DAMAGE_STATE = {
  完好: 0,
  损坏可租: 1,
  损坏不可租: 2,
  报废: 3,
};
exports.CORE_BIKE_DAMAGE_STATE_ENUMS = jsonToEnums(exports.CORE_BIKE_DAMAGE_STATE);

// 不可租原因
exports.CORE_BIKE_INVALID_REASON = {
  未投放: 1,
  损坏: 2,
  待拖回: 3,
  调度中: 4,
  被扣押: 5,
  丢失: 6,
  其他占用: 7,
  设备离线: 8,
  断电: 9,
  服务区外: 10,
  不可用区域内: 11,
  可用区域外: 12,
  低电: 13,
};
exports.CORE_BIKE_INVALID_REASON_ENUMS = jsonToEnums(exports.CORE_BIKE_INVALID_REASON);

// 车辆任务
exports.CORE_BIKE_TASK = {
  超一天离线扫码车: 0,
  超一天无定位扫码车: 1,
  一天内离线扫码车: 2,
  一天内无定位扫码车: 3,
  超一天离线: 4,
  一天内离线: 5,
  被盗断电: 6,
  零电断电: 7,
  零电: 8,
  困难换电: 9,
  无定位: 10,
  低电: 11,
  围栏外非缓冲区: 12,
  低压预警: 13,
  高压预警: 14,
  围栏外缓冲区: 15,
  待拖回: 16,
  调度中: 17,
  超一天丢失扫码车: 18,
  一天内丢失扫码车: 19,
  被扣押: 20,
  高手未找到: 21,
  白班未找到: 22,
  司机未找到: 23,
  空闲超速: 24,
  损坏不可租: 25,
  高压离线: 26,
  损坏可租: 27,
  四天未巡检: 28,
  四天未唤醒: 29,
  两天未唤醒: 30,
  一天未唤醒: 31,
  非法区域停车: 32,
  需挪至合法区域: 33,
  待投放: 34,
  离线复活: 35,
};
exports.CORE_BIKE_TASK_ENUMS = jsonToEnums(exports.CORE_BIKE_TASK);
// 车辆任务优先级
exports.CORE_BIKE_TASK_RATE = [
  exports.CORE_BIKE_TASK.离线复活,
  exports.CORE_BIKE_TASK.超一天离线扫码车,
  exports.CORE_BIKE_TASK.超一天无定位扫码车,
  exports.CORE_BIKE_TASK.一天内离线扫码车,
  exports.CORE_BIKE_TASK.一天内无定位扫码车,
  exports.CORE_BIKE_TASK.超一天离线,
  exports.CORE_BIKE_TASK.一天内离线,
  exports.CORE_BIKE_TASK.被盗断电,
  exports.CORE_BIKE_TASK.零电断电,
  exports.CORE_BIKE_TASK.零电,
  exports.CORE_BIKE_TASK.困难换电,
  exports.CORE_BIKE_TASK.无定位,
  exports.CORE_BIKE_TASK.低电,
  exports.CORE_BIKE_TASK.围栏外非缓冲区,
  exports.CORE_BIKE_TASK.需挪至合法区域,
  exports.CORE_BIKE_TASK.低压预警,
  exports.CORE_BIKE_TASK.高压预警,
  exports.CORE_BIKE_TASK.围栏外缓冲区,
  exports.CORE_BIKE_TASK.待拖回,
  exports.CORE_BIKE_TASK.调度中,
  exports.CORE_BIKE_TASK.超一天丢失扫码车,
  exports.CORE_BIKE_TASK.一天内丢失扫码车,
  exports.CORE_BIKE_TASK.被扣押,
  exports.CORE_BIKE_TASK.高手未找到,
  exports.CORE_BIKE_TASK.白班未找到,
  exports.CORE_BIKE_TASK.司机未找到,
  exports.CORE_BIKE_TASK.空闲超速,
  exports.CORE_BIKE_TASK.损坏不可租,
  exports.CORE_BIKE_TASK.高压离线,
  exports.CORE_BIKE_TASK.损坏可租,
  exports.CORE_BIKE_TASK.四天未巡检,
  exports.CORE_BIKE_TASK.四天未唤醒,
  exports.CORE_BIKE_TASK.两天未唤醒,
  exports.CORE_BIKE_TASK.一天未唤醒,
  exports.CORE_BIKE_TASK.非法区域停车,
  exports.CORE_BIKE_TASK.待投放,
];
// 车辆任务组
exports.CORE_BIKE_TASK_GROUP = {
  拖车组: 0,
  调度组: 1,
  扣押组: 2,
  丢失风险组: 3,
  丢失高风险组: 4,
  断电任务组: 5,
  无法租赁组: 6,
  高压换电组: 7,
  低压换电组: 8,
  人工分配组: 9,
  无定位组: 10,
  高手难寻组: 11,
  白班难寻组: 12,
  司机难寻组: 13,
  未巡检组: 14,
  困难换电组: 15,
  复活组: 16,
};
exports.CORE_BIKE_TASK_GROUP_ENUMS = jsonToEnums(exports.CORE_BIKE_TASK_GROUP);
// 任务组优先级
exports.CORE_BIKE_TASK_GROUP_RATE = [
  exports.CORE_BIKE_TASK_GROUP.拖车组,
  exports.CORE_BIKE_TASK_GROUP.调度组,
  exports.CORE_BIKE_TASK_GROUP.扣押组,
  exports.CORE_BIKE_TASK_GROUP.复活组,
  exports.CORE_BIKE_TASK_GROUP.高手难寻组,
  exports.CORE_BIKE_TASK_GROUP.白班难寻组,
  exports.CORE_BIKE_TASK_GROUP.司机难寻组,
  exports.CORE_BIKE_TASK_GROUP.丢失高风险组,
  exports.CORE_BIKE_TASK_GROUP.丢失风险组,
  exports.CORE_BIKE_TASK_GROUP.无定位组,
  exports.CORE_BIKE_TASK_GROUP.断电任务组,
  exports.CORE_BIKE_TASK_GROUP.困难换电组,
  exports.CORE_BIKE_TASK_GROUP.无法租赁组,
  exports.CORE_BIKE_TASK_GROUP.低压换电组,
  exports.CORE_BIKE_TASK_GROUP.高压换电组,
  exports.CORE_BIKE_TASK_GROUP.未巡检组,
  exports.CORE_BIKE_TASK_GROUP.人工分配组,
  exports.CORE_BIKE_TASK_GROUP.无用组,
];
// 任务所属任务组
exports.CORE_BIKE_GROUP_OF_TASK = {
  [exports.CORE_BIKE_TASK.待拖回]: exports.CORE_BIKE_TASK_GROUP.拖车组,
  [exports.CORE_BIKE_TASK.调度中]: exports.CORE_BIKE_TASK_GROUP.调度组,
  [exports.CORE_BIKE_TASK.被扣押]: exports.CORE_BIKE_TASK_GROUP.扣押组,
  [exports.CORE_BIKE_TASK.离线复活]: exports.CORE_BIKE_TASK_GROUP.复活组,
  [exports.CORE_BIKE_TASK.高手未找到]: exports.CORE_BIKE_TASK_GROUP.高手难寻组,
  [exports.CORE_BIKE_TASK.白班未找到]: exports.CORE_BIKE_TASK_GROUP.白班难寻组,
  [exports.CORE_BIKE_TASK.司机未找到]: exports.CORE_BIKE_TASK_GROUP.司机难寻组,
  [exports.CORE_BIKE_TASK.超一天离线]: exports.CORE_BIKE_TASK_GROUP.丢失高风险组,
  [exports.CORE_BIKE_TASK.超一天离线扫码车]: exports.CORE_BIKE_TASK_GROUP.丢失高风险组,
  [exports.CORE_BIKE_TASK.超一天无定位扫码车]: exports.CORE_BIKE_TASK_GROUP.丢失高风险组,
  [exports.CORE_BIKE_TASK.超一天丢失扫码车]: exports.CORE_BIKE_TASK_GROUP.丢失高风险组,
  [exports.CORE_BIKE_TASK.一天内离线]: exports.CORE_BIKE_TASK_GROUP.丢失风险组,
  [exports.CORE_BIKE_TASK.一天内离线扫码车]: exports.CORE_BIKE_TASK_GROUP.丢失风险组,
  [exports.CORE_BIKE_TASK.一天内无定位扫码车]: exports.CORE_BIKE_TASK_GROUP.丢失风险组,
  [exports.CORE_BIKE_TASK.一天内丢失扫码车]: exports.CORE_BIKE_TASK_GROUP.丢失风险组,
  [exports.CORE_BIKE_TASK.无定位]: exports.CORE_BIKE_TASK_GROUP.无定位组,
  [exports.CORE_BIKE_TASK.零电]: exports.CORE_BIKE_TASK_GROUP.断电任务组,
  [exports.CORE_BIKE_TASK.被盗断电]: exports.CORE_BIKE_TASK_GROUP.断电任务组,
  [exports.CORE_BIKE_TASK.零电断电]: exports.CORE_BIKE_TASK_GROUP.断电任务组,
  [exports.CORE_BIKE_TASK.困难换电]: exports.CORE_BIKE_TASK_GROUP.困难换电组,
  [exports.CORE_BIKE_TASK.损坏不可租]: exports.CORE_BIKE_TASK_GROUP.无法租赁组,
  [exports.CORE_BIKE_TASK.低电]: exports.CORE_BIKE_TASK_GROUP.无法租赁组,
  [exports.CORE_BIKE_TASK.围栏外非缓冲区]: exports.CORE_BIKE_TASK_GROUP.无法租赁组,
  [exports.CORE_BIKE_TASK.需挪至合法区域]: exports.CORE_BIKE_TASK_GROUP.无法租赁组,
  [exports.CORE_BIKE_TASK.高压预警]: exports.CORE_BIKE_TASK_GROUP.高压换电组,
  [exports.CORE_BIKE_TASK.低压预警]: exports.CORE_BIKE_TASK_GROUP.低压换电组,
  [exports.CORE_BIKE_TASK.四天未唤醒]: exports.CORE_BIKE_TASK_GROUP.未巡检组,
  [exports.CORE_BIKE_TASK.四天未巡检]: exports.CORE_BIKE_TASK_GROUP.未巡检组,
  [exports.CORE_BIKE_TASK.两天未唤醒]: exports.CORE_BIKE_TASK_GROUP.未巡检组,
  [exports.CORE_BIKE_TASK.一天未唤醒]: exports.CORE_BIKE_TASK_GROUP.人工分配组,
  [exports.CORE_BIKE_TASK.空闲超速]: exports.CORE_BIKE_TASK_GROUP.人工分配组,
  [exports.CORE_BIKE_TASK.损坏可租]: exports.CORE_BIKE_TASK_GROUP.人工分配组,
  [exports.CORE_BIKE_TASK.非法区域停车]: exports.CORE_BIKE_TASK_GROUP.人工分配组,
  [exports.CORE_BIKE_TASK.围栏外缓冲区]: exports.CORE_BIKE_TASK_GROUP.人工分配组,
  [exports.CORE_BIKE_TASK.高压离线]: exports.CORE_BIKE_TASK_GROUP.人工分配组,
  [exports.CORE_BIKE_TASK.待投放]: exports.CORE_BIKE_TASK_GROUP.人工分配组,
};

// 电池去向
exports.CORE_BATTERY_LOCATE = {
  在库: 0,
  巡检人员携带: 1,
  安装于车辆: 2,
  在外未知: 3,
  丢失: 4,
};
exports.CORE_BATTERY_LOCATE_ENUMS = jsonToEnums(exports.CORE_BATTERY_LOCATE);

// 巡检订单状态
exports.ORDER_INSPECTION_ORDER_STATE = {
  派单中: 0,
  暂停派单: 1,
  已取消: 2,
  已截单: 3,
  待线上确认: 4,
  已轧账: 5,
  已结算: 6,
};
exports.ORDER_INSPECTION_ORDER_STATE_ENUMS = jsonToEnums(exports.ORDER_INSPECTION_ORDER_STATE);

// 找车失败原因
exports.CORE_BIKE_FIND_FAILED_REASON = {
  定位点无车: 0,
  所在区域无法进入: 1,
};
exports.CORE_BIKE_FIND_FAILED_REASON_ENUMS = jsonToEnums(exports.CORE_BIKE_FIND_FAILED_REASON);
