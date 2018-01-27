module.exports = {
  libs: {
    ol: [
      require.resolve('ol'),
      require.resolve('geojson-vt'),
    ],
  },
  pages: {
    index: {
      template: 'index.tmpl.html',
      title: '芒果运维管理平台',
    },
    login: {
      template: 'index.tmpl.html',
      title: '芒果运维管理平台-登陆2',
    },
    'code/user_frame': {
      template: 'index.tmpl.html',
      title: '用户管理'
    },
    'code/user/userMessage_frame': {
      template: 'index.tmpl.html',
      title: '用户管理-用户信息展示'
    },
    'code/user/userDetail_frame': {
      template: 'index.tmpl.html',
      title: '用户管理-用户信息展示-用户信息详情'
    },
    'code/user/inspectorMessageDetail_frame': {
      template: 'index.tmpl.html',
      title: '用户管理-用户信息展示-巡检认证信息详情'
    },
    'code/user/inspector_frame': {
      template: 'index.tmpl.html',
      title: '巡检管理'
    },
    'code/user/inspectorDetail_frame': {
      template: 'index.tmpl.html',
      title: '巡检管理'
    },
    'code/operate_frame': {
      template: 'index.tmpl.html',
      title: '运营管理'
    },
    'code/project_frame': {
      template: 'index.tmpl.html',
      title: '项目管理'
    },
    'code/project/settingDetail_frame': {
      template: 'index.tmpl.html',
      title: '项目管理'
    },
    'code/map_frame': {
      template: 'index.tmpl.html',
      title: '地图'
    },
    'code/inspectOrder_frame': {
      template: 'index.tmpl.html',
      title: '巡检订单管理'
    },
    'code/inspectOrder/inspectOrderPrice_frame': {
      template: 'index.tmpl.html',
      title: '巡检订单价格管理'
    },
  },
};