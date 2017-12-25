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
      title: '芒果运维管理平台-登陆',
    },
    'code/user_frame': {
      template: 'index.tmpl.html',
      title: '用户管理'
    },
    'code/user/userMessage_frame': {
      template: 'index.tmpl.html',
      title: '用户管理'
    },
    'code/user/inspector_frame': {
      template: 'index.tmpl.html',
      title: '巡检管理'
    },
    'code/work_frame': {
      template: 'index.tmpl.html',
      title: ''
    },
    'code/work/assembly_frame': {
      template: 'index.tmpl.html',
      title: ' '
    },
    'code/map_frame': {
      template: 'index.tmpl.html',
      title: '地图'
    },
  },
};