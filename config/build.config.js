const paths = require('./paths');
const path = require('path');
const { libs, pages } = require('../src');

const pageNames = Object.keys(pages);
const libNames = Object.keys(libs);

module.exports = {
  entries: [
    ...libNames.map(name => {
      return {
        chunk: name,
        files: libs[name],
      };
    }),
    ...pageNames.map(name => {
      return {
        chunk: name,
        files: [
          path.resolve(paths.appEntries, `${name}.js`)
        ]
      }
    })
  ],
  commonsChunks: [{
    name: 'common',
    chunks: pageNames
  }, ...libNames.map(name => {
    return {
      name,
      minChunks: Infinity,
      chunks: pageNames.filter(pageName => {
        const { depChunks = [] } =pages[pageName];
        return depChunks.includes(name);
      })
    };
  }), {
    name: 'manifest',
  }],
  pages: pageNames.map(name => {
    const { depChunks = [], template, title } = pages[name];
    return {
      chunks: ['manifest', 'common', ...depChunks, name],
      template,
      title,
      filename: `${name}.html`,
    };
  })
};