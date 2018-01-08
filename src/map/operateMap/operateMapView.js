import React from 'react';
import style from './style.less';
import popUP from '../../components/popUP/popUP';
import buttonModule from '../../components/control/Button';
import { CORE_USER_IDENTITY, CORE_BIKE_TASK_GROUP } from '../../common/contants';
import { updateInspector } from '../../service/user/inspector'

const jsonToMap = require('@mangoebike/utils/jsonToMap');

export default ({ data, actions }) => {
  const { inspector, selectCity, loading, menuIndex, drawState, selected, popUPState, popUPInfo, inspectorsData, currentInspectorId, cityList } = data;
  const { onSearchInspector, onSelectCityMethod, onUpdateInspectorTaskgroup, onAssignInspectorClick, onInspectorIsHavOrder, onMenuClick, onDrawClick, onPropChange, onPropKeyDown, onRemoveClick, onEnableClick, onPopUPfunction, onUpdateInspectorType } = actions;
  const menuItems = ['司机任务', '车辆信息', '编辑功能'];
  return (
    <div className={style.options}>
      {loading ? <span className={style.load}>正在加载,请稍等 ...</span> : null}
      {popUPState ? popUP(popUPInfo) : null}
      <div className={style.sidebar}>
        <div className={style.menu}>
          {menuItems.map((item, index) => (
            menuIndex === index ? <span key={index} className={style.selected}>{item}</span> :
              <span key={index} className={style.unselected} onClick={_ => onMenuClick(index)}>{item}</span>
          ))}
        </div>
        <h2 className={style.title}>{menuItems[menuIndex]}</h2>
        {
          (_ => {
            switch (menuItems[menuIndex]) {
              case '司机任务':
                if (inspectorsData) {
                  return (
                    <div className={style.driverList}>
                      <div className={style.select}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>城市分类:&nbsp;&nbsp;</span>
                        <select onChange={e => onSelectCityMethod(e.target.value)}>
                          <option value='无'>无</option>
                          {
                            cityList.map((item, index) => (
                              <option key={index} value={item}>{item}</option>
                            ))
                          }
                        </select>
                      </div>

                      <div className={style.search}>
                        <span>搜索:&nbsp;&nbsp;</span><input className={style.searchInput} type="text"
                                                           placeholder='请输入巡检员姓名'
                                                           onChange={e => onSearchInspector(e.target.value)}/>
                      </div>
                      {
                        inspectorsData.map((item, index) => {
                          if (selectCity === '无') {
                            if (!inspector) {
                              const { _id, name, tel, inspectorInfo, avatar } = item;
                              const { identity, inspectionAreas, acceptTaskGroups, processingInspectionOrder } = inspectorInfo;
                              return (
                                <div key={index} className={style.driverItems}>
                                  <div className={style.driver}>
                                    <img src={avatar}/>
                                    <span>{name}&nbsp;&nbsp;{tel}</span>
                                  </div>
                                  <div className={style.work}>
                          <span
                            onClick={_ => onPopUPfunction('司机类型', Object.keys(CORE_USER_IDENTITY).map((typeValue, index) => {
                              return <lable key={index} onClick={_ => {
                                onUpdateInspectorType(_id, index);
                              }}>
                                <input name={CORE_USER_IDENTITY}
                                       type="radio" value={index}
                                       defaultChecked={identity === index}/>{typeValue}
                              </lable>
                            }), [buttonModule({
                              children: '取消',
                              onClick: _ => onPopUPfunction()
                            })])}>司机类型
                          </span>
                                    <span
                                      onClick={_ => !processingInspectionOrder ? onPopUPfunction('请选择城市', cityList.map((city, index) => {
                                        return <lable key={index} onClick={_ => {
                                          onInspectorIsHavOrder(item, processingInspectionOrder, city);
                                        }}>
                                          <input name='cities'
                                                 type="radio" value={index}
                                                 defaultChecked={item.city === city}/>{city}
                                        </lable>
                                      }), [buttonModule({
                                        children: '取消',
                                        onClick: _ => onPopUPfunction()
                                      })]) : onInspectorIsHavOrder(item, processingInspectionOrder)}
                                      className={processingInspectionOrder ? style.offwork : null}>{processingInspectionOrder ? '下班' : '上班'}</span>
                                  </div>
                                  <div className={style.management}>
                                    <div className={style.taskGroup}>
                                      {acceptTaskGroups.length ? acceptTaskGroups.map((item, index) => {
                                        return <p key={index}>{jsonToMap(CORE_BIKE_TASK_GROUP)[item]}</p>
                                      }) : null}
                                    </div>
                                    <div className={style.assignInspectionArea}>
                                      {inspectionAreas.length ? inspectionAreas.map((item, index) => {
                                        return <p key={index}>{item.name}</p>
                                      }) : null}
                                    </div>
                                  </div>
                                  <div className={style.assign}>
                                 <span
                                   onClick={_ => onPopUPfunction('分配任务组',
                                     Object.keys(CORE_BIKE_TASK_GROUP).map((type, typeValue) => {
                                       let isChecked = acceptTaskGroups.includes(typeValue);
                                       return <lable key={typeValue}>
                                         <input name={CORE_BIKE_TASK_GROUP}
                                                type="checkbox"
                                                value={typeValue}
                                                defaultChecked={isChecked}
                                                onClick={_ => onUpdateInspectorTaskgroup(_id, typeValue, isChecked)}/>{type}
                                       </lable>
                                     }), [buttonModule({
                                       children: '取消',
                                       onClick: _ => onPopUPfunction()
                                     })])}>分配任务组</span>
                                    <span
                                      onClick={_ => onAssignInspectorClick(item)}
                                      className={currentInspectorId === item._id ? style.distribution : null}>{currentInspectorId === item._id ? '分配中' : '分配巡检区'}</span>
                                  </div>
                                </div>
                              )
                            }
                            if (inspector === item.name) {
                              const { _id, name, tel, inspectorInfo, avatar } = item;
                              const { identity, inspectionAreas, acceptTaskGroups, processingInspectionOrder } = inspectorInfo;
                              return (
                                <div key={index} className={style.driverItems}>
                                  <div className={style.driver}>
                                    <img src={avatar}/>
                                    <span>{name}&nbsp;&nbsp;{tel}</span>
                                  </div>
                                  <div className={style.work}>
                          <span
                            onClick={_ => onPopUPfunction('司机类型', Object.keys(CORE_USER_IDENTITY).map((typeValue, index) => {
                              return <lable key={index} onClick={_ => {
                                onUpdateInspectorType(_id, index);
                              }}>
                                <input name={CORE_USER_IDENTITY}
                                       type="radio" value={index}
                                       defaultChecked={identity === index}/>{typeValue}
                              </lable>
                            }), [buttonModule({
                              children: '取消',
                              onClick: _ => onPopUPfunction()
                            })])}>司机类型
                          </span>
                                    <span
                                      onClick={_ => !processingInspectionOrder ? onPopUPfunction('请选择城市', cityList.map((city, index) => {
                                        return <lable key={index} onClick={_ => {
                                          onInspectorIsHavOrder(item, processingInspectionOrder, city);
                                        }}>
                                          <input name='cities'
                                                 type="radio" value={index}
                                                 defaultChecked={item.city === city}/>{city}
                                        </lable>
                                      }), [buttonModule({
                                        children: '取消',
                                        onClick: _ => onPopUPfunction()
                                      })]) : onInspectorIsHavOrder(item, processingInspectionOrder)}
                                      className={processingInspectionOrder ? style.offwork : null}>{processingInspectionOrder ? '下班' : '上班'}</span>
                                  </div>
                                  <div className={style.management}>
                                    <div className={style.taskGroup}>
                                      {acceptTaskGroups.length ? acceptTaskGroups.map((item, index) => {
                                        return <p key={index}>{jsonToMap(CORE_BIKE_TASK_GROUP)[item]}</p>
                                      }) : null}
                                    </div>
                                    <div className={style.assignInspectionArea}>
                                      {inspectionAreas.length ? inspectionAreas.map((item, index) => {
                                        return <p key={index}>{item.name}</p>
                                      }) : null}
                                    </div>
                                  </div>
                                  <div className={style.assign}>
                                 <span
                                   onClick={_ => onPopUPfunction('分配任务组',
                                     Object.keys(CORE_BIKE_TASK_GROUP).map((type, typeValue) => {
                                       let isChecked = acceptTaskGroups.includes(typeValue);
                                       return <lable key={typeValue}>
                                         <input name={CORE_BIKE_TASK_GROUP}
                                                type="checkbox"
                                                value={typeValue}
                                                defaultChecked={isChecked}
                                                onClick={_ => onUpdateInspectorTaskgroup(_id, typeValue, isChecked)}/>{type}
                                       </lable>
                                     }), [buttonModule({
                                       children: '取消',
                                       onClick: _ => onPopUPfunction()
                                     })])}>分配任务组</span>
                                    <span
                                      onClick={_ => onAssignInspectorClick(item)}
                                      className={currentInspectorId === item._id ? style.distribution : null}>{currentInspectorId === item._id ? '分配中' : '分配巡检区'}</span>
                                  </div>
                                </div>
                              )
                            }
                          }
                          if (selectCity === item.inspectorInfo.city) {
                            if (inspector === item.name) {
                              const { _id, name, tel, inspectorInfo, avatar } = item;
                              const { identity, inspectionAreas, acceptTaskGroups, processingInspectionOrder } = inspectorInfo;
                              return (
                                <div key={index} className={style.driverItems}>
                                  <div className={style.driver}>
                                    <img src={avatar}/>
                                    <span>{name}&nbsp;&nbsp;{tel}</span>
                                  </div>
                                  <div className={style.work}>
                          <span
                            onClick={_ => onPopUPfunction('司机类型', Object.keys(CORE_USER_IDENTITY).map((typeValue, index) => {
                              return <lable key={index} onClick={_ => {
                                onUpdateInspectorType(_id, index);
                              }}>
                                <input name={CORE_USER_IDENTITY}
                                       type="radio" value={index}
                                       defaultChecked={identity === index}/>{typeValue}
                              </lable>
                            }), [buttonModule({
                              children: '取消',
                              onClick: _ => onPopUPfunction()
                            })])}>司机类型
                          </span>
                                    <span
                                      onClick={_ => !processingInspectionOrder ? onPopUPfunction('请选择城市', cityList.map((city, index) => {
                                        return <lable key={index} onClick={_ => {
                                          onInspectorIsHavOrder(item, processingInspectionOrder, city);
                                        }}>
                                          <input name='cities'
                                                 type="radio" value={index}
                                                 defaultChecked={item.city === city}/>{city}
                                        </lable>
                                      }), [buttonModule({
                                        children: '取消',
                                        onClick: _ => onPopUPfunction()
                                      })]) : onInspectorIsHavOrder(item, processingInspectionOrder)}
                                      className={processingInspectionOrder ? style.offwork : null}>{processingInspectionOrder ? '下班' : '上班'}</span>
                                  </div>
                                  <div className={style.management}>
                                    <div className={style.taskGroup}>
                                      {acceptTaskGroups.length ? acceptTaskGroups.map((item, index) => {
                                        return <p key={index}>{jsonToMap(CORE_BIKE_TASK_GROUP)[item]}</p>
                                      }) : null}
                                    </div>
                                    <div className={style.assignInspectionArea}>
                                      {inspectionAreas.length ? inspectionAreas.map((item, index) => {
                                        return <p key={index}>{item.name}</p>
                                      }) : null}
                                    </div>
                                  </div>
                                  <div className={style.assign}>
                                 <span
                                   onClick={_ => onPopUPfunction('分配任务组',
                                     Object.keys(CORE_BIKE_TASK_GROUP).map((type, typeValue) => {
                                       let isChecked = acceptTaskGroups.includes(typeValue);
                                       return <lable key={typeValue}>
                                         <input name={CORE_BIKE_TASK_GROUP}
                                                type="checkbox"
                                                value={typeValue}
                                                defaultChecked={isChecked}
                                                onClick={_ => onUpdateInspectorTaskgroup(_id, typeValue, isChecked)}/>{type}
                                       </lable>
                                     }), [buttonModule({
                                       children: '取消',
                                       onClick: _ => onPopUPfunction()
                                     })])}>分配任务组</span>
                                    <span
                                      onClick={_ => onAssignInspectorClick(item)}
                                      className={currentInspectorId === item._id ? style.distribution : null}>{currentInspectorId === item._id ? '分配中' : '分配巡检区'}</span>
                                  </div>
                                </div>
                              )
                            }
                            if (!inspector) {
                              const { _id, name, tel, inspectorInfo, avatar } = item;
                              const { identity, inspectionAreas, acceptTaskGroups, processingInspectionOrder } = inspectorInfo;
                              return (
                                <div key={index} className={style.driverItems}>
                                  <div className={style.driver}>
                                    <img src={avatar}/>
                                    <span>{name}&nbsp;&nbsp;{tel}</span>
                                  </div>
                                  <div className={style.work}>
                          <span
                            onClick={_ => onPopUPfunction('司机类型', Object.keys(CORE_USER_IDENTITY).map((typeValue, index) => {
                              return <lable key={index} onClick={_ => {
                                onUpdateInspectorType(_id, index);
                              }}>
                                <input name={CORE_USER_IDENTITY}
                                       type="radio" value={index}
                                       defaultChecked={identity === index}/>{typeValue}
                              </lable>
                            }), [buttonModule({
                              children: '取消',
                              onClick: _ => onPopUPfunction()
                            })])}>司机类型
                          </span>
                                    <span
                                      onClick={_ => !processingInspectionOrder ? onPopUPfunction('请选择城市', cityList.map((city, index) => {
                                        return <lable key={index} onClick={_ => {
                                          onInspectorIsHavOrder(item, processingInspectionOrder, city);
                                        }}>
                                          <input name='cities'
                                                 type="radio" value={index}
                                                 defaultChecked={item.city === city}/>{city}
                                        </lable>
                                      }), [buttonModule({
                                        children: '取消',
                                        onClick: _ => onPopUPfunction()
                                      })]) : onInspectorIsHavOrder(item, processingInspectionOrder)}
                                      className={processingInspectionOrder ? style.offwork : null}>{processingInspectionOrder ? '下班' : '上班'}</span>
                                  </div>
                                  <div className={style.management}>
                                    <div className={style.taskGroup}>
                                      {acceptTaskGroups.length ? acceptTaskGroups.map((item, index) => {
                                        return <p key={index}>{jsonToMap(CORE_BIKE_TASK_GROUP)[item]}</p>
                                      }) : null}
                                    </div>
                                    <div className={style.assignInspectionArea}>
                                      {inspectionAreas.length ? inspectionAreas.map((item, index) => {
                                        return <p key={index}>{item.name}</p>
                                      }) : null}
                                    </div>
                                  </div>
                                  <div className={style.assign}>
                                 <span
                                   onClick={_ => onPopUPfunction('分配任务组',
                                     Object.keys(CORE_BIKE_TASK_GROUP).map((type, typeValue) => {
                                       let isChecked = acceptTaskGroups.includes(typeValue);
                                       return <lable key={typeValue}>
                                         <input name={CORE_BIKE_TASK_GROUP}
                                                type="checkbox"
                                                value={typeValue}
                                                defaultChecked={isChecked}
                                                onClick={_ => onUpdateInspectorTaskgroup(_id, typeValue, isChecked)}/>{type}
                                       </lable>
                                     }), [buttonModule({
                                       children: '取消',
                                       onClick: _ => onPopUPfunction()
                                     })])}>分配任务组</span>
                                    <span
                                      onClick={_ => onAssignInspectorClick(item)}
                                      className={currentInspectorId === item._id ? style.distribution : null}>{currentInspectorId === item._id ? '分配中' : '分配巡检区'}</span>
                                  </div>
                                </div>
                              )
                            }

                          }
                        })
                      }
                    </div>
                  );
                } else {
                  return <p>请稍等</p>
                }
              case '车辆信息':
                if (selected && selected.getProperties().clickType === 'bike') {
                  const { gis, task, no, location, battery, use, status, biz, inspection, isAbleMaintain, latestReportedAt, enable, remark } = selected.getProperties() || {};
                  return (
                    <div className={style.bikeList}>
                      <div className={style.itemBox}>
                        <h4 className={style.itemBoxTitle}>车辆信息</h4>
                        <p>车牌号:&nbsp;&nbsp;{no ? no : ''}</p>
                        <p>电池型号:&nbsp;&nbsp;{battery.model ? battery.model : ''}</p>
                        <p>最低可用电压:&nbsp;&nbsp;{battery.minValidVoltage ? battery.minValidVoltage : ''}</p>
                        <p>最低满电电压:&nbsp;&nbsp;{battery.minFullVoltage ? battery.minFullVoltage : ''}</p>
                        <p>最高馈电电压:&nbsp;&nbsp;{battery.maxEmptyVoltage ? battery.maxEmptyVoltage : ''}</p>
                        <p>电量:&nbsp;&nbsp;{battery.power ? battery.power : ''}</p>
                        <p>电压:&nbsp;&nbsp;{battery.voltage ? battery.voltage : ''}</p>
                        <p>当前所在巡检区:&nbsp;&nbsp;{gis.inspectionArea ? gis.inspectionArea : ''}</p>
                        <p>距离服务区边界:&nbsp;&nbsp;{gis.distanceWithServiceArea ? gis.distanceWithServiceArea : ''}&nbsp;m</p>
                        <p>距离合法区域边界:&nbsp;&nbsp;{gis.distanceWithValidArea ? gis.distanceWithValidArea : ''}&nbsp;m</p>
                        <p>距离不合法区域边界:&nbsp;&nbsp;{gis.distanceWithInvalidArea ? gis.distanceWithInvalidArea : ''}&nbsp;m</p>
                      </div>
                      <div className={style.itemBox}>
                        <h4 className={style.itemBoxTitle}>车辆状态</h4>
                        <p>在线:&nbsp;&nbsp;{status.isOnline ? status.isOnline : ''}</p>
                        <p>离线复活:&nbsp;&nbsp;{status.isRevival ? status.isRevival : ''}</p>
                        <p>高压离线:&nbsp;&nbsp;{status.isAbnormalOffline ? status.isAbnormalOffline : ''}</p>
                        <p>最后一次在线时间:&nbsp;&nbsp;{status.latestOnlineAt ? new Date(status.latestOnlineAt).toLocaleString() : ''}</p>
                        <p>离线后是否被扫码:&nbsp;&nbsp;{status.isScannedAfterOffline ? new Date(status.isScannedAfterOffline).toLocaleString() : ''}</p>
                        <p>离线后最后一次被扫码时间:&nbsp;&nbsp;{status.latestScannedAfterOfflineAt ? status.latestScannedAfterOfflineAt : ''}</p>
                        <p>GSM信号:&nbsp;&nbsp;{status.gsmSignal ? status.gsmSignal : ''}</p>
                        <p>电门是否打开:&nbsp;&nbsp;{status.isAccOn ? status.isAccOn : ''}</p>
                        <p>是否设防:&nbsp;&nbsp;{status.isLockOn ? status.isLockOn : ''}</p>
                        <p>电池仓锁是否加锁:&nbsp;&nbsp;{status.isBatteryLockOn ? status.isBatteryLockOn : ''}</p>
                      </div>
                      <div className={style.itemBox}>
                        <h4 className={style.itemBoxTitle}>业务状态</h4>
                        <p>损坏状态:&nbsp;&nbsp;{biz.damageState ? biz.damageState : ''}</p>
                        <p>车辆当前去向:&nbsp;&nbsp;{biz.locate ? biz.locate : ''}</p>
                        <p>丢失时间:&nbsp;&nbsp;{biz.lostAt ? biz.lostAt : ''}</p>
                        <p>丢失后是否扫码:&nbsp;&nbsp;{biz.isScannedAfterLost ? biz.isScannedAfterLost : ''}</p>
                        <p>丢失后最近扫码时间:&nbsp;&nbsp;{biz.latestScannedAfterLostAt ? new Date(biz.latestScannedAfterLostAt).toLocaleString() : ''}</p>
                        <p>扣押时间:&nbsp;&nbsp;{biz.detainedAt ? new Date(biz.detainedAt).toLocaleString() : ''}</p>
                        <p>开始调度时间:&nbsp;&nbsp;{biz.dispatchedAt ? new Date(biz.dispatchedAt).toLocaleString() : ''}</p>
                      </div>
                      <div className={style.itemBox}>
                        <h4 className={style.itemBoxTitle}>巡检信息</h4>
                        <p>最近一次换电时间:&nbsp;&nbsp;{biz.latestChangeBatteryAt ? new Date(biz.latestChangeBatteryAt).toLocaleString() : ''}</p>
                        <p>最近一次挪回服务区时间:&nbsp;&nbsp;{biz.latestMoveInServiceAreaAt ? new Date(biz.latestMoveInServiceAreaAt).toLocaleString() : ''}</p>
                        <p>最近一次拖回站点:&nbsp;&nbsp;{biz.latestBackToStationAt ? biz.latestBackToStationAt : ''}</p>
                        <p>最近一次巡检是否找到车辆:&nbsp;&nbsp;{biz.hasFound ? biz.hasFound : ''}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <h5 style={{ width: '100%', textAlign: 'center' }}>请点击车辆,查看详情</h5>
                  )
                }
              case '编辑功能':
                return (
                  <div className={style.edit}>
                    <h3>区块编辑</h3>
                    <div className={style.editButton}>
                      <span className={drawState ? style.selected : style.unselected}
                            onClick={_ => onDrawClick()}>{drawState ? '退出绘制' : '开始绘制'}</span>
                    </div>
                    <h3>区块状态</h3>
                    <div className={style.editButton}>
                      <span className={style.unselected} onClick={_ => onRemoveClick()}>删除区块</span>
                    </div>
                    <h3>区块信息编辑</h3>
                    {(_ => {
                      if (selected && selected.getProperties().clickType === 'inspectionArea') {
                        let { name, city, enable, polygonType, creator } = selected.getProperties();
                        return (
                          <div>
                            <div className={style.inputBox}>
                              <span>名称:&nbsp;&nbsp;</span>
                              <input type="text" value={name}
                                     onChange={(e) => onPropChange('name', e.target.value)}
                                     onKeyDown={e => onPropKeyDown(e)}
                                     className={style.enterInput}/>
                            </div>
                            <div className={style.inputBox}>
                              <span>类型:&nbsp;&nbsp;{polygonType}</span>
                            </div>
                            <div className={style.inputBox}>
                              <span>城市:&nbsp;&nbsp;</span>
                              <input type="text" value={city}
                                     onChange={(e) => onPropChange('city', e.target.value)}
                                     onKeyDown={e => onPropKeyDown(e)}
                                     className={style.enterInput}/>
                            </div>
                            <div className={style.inputBox}>
                              <span>启用:&nbsp;&nbsp;</span>
                              <button onClick={_ => onEnableClick(enable)}>{enable ? '是' : '否'}</button>
                            </div>
                            {creator ? <div className={style.inputBox}>
                              <span>创建人:&nbsp;&nbsp;{creator.name}</span>
                            </div> : null}
                            {creator ? <div className={style.inputBox}>
                              <span>创建时间:&nbsp;&nbsp;</span>
                            </div> : null}
                          </div>
                        )
                      } else {
                        return <p>选中后编辑信息</p>
                      }
                    })()
                    }
                  </div>
                );
            }
          })()
        }
      </div>
    </div>
  )
}