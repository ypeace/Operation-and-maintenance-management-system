export default (obj = {}) => Object.keys(obj).reduce((memo, key) => {
  memo[obj[key]] = key;
  return memo
}, {})