import pathToRegExp from 'path-to-regexp';

export default (routes = [], path) => {
  let result;
  const matched = routes.some(route => {
    const keys = [];
    const re = pathToRegExp(route, keys).exec(path);
    if (!re) return;
    result = keys.reduce((memo, key, index) => {
      memo[key.name] = re[index + 1];
      return memo;
    }, {});
    return true;
  });
  if(matched) {
    return result;
  }
};