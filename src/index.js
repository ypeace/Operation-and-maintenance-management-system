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
  },
};