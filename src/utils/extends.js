const moment = require('moment');

Date.prototype.format = function (format) {
  return moment(this).format(format);
};

Date.prototype.unix = function () {
  return Math.round(this.getTime() / 1000);
};

Date.prototype.toSimpleString = function () {
  return moment(this).format('YYYY-MM-DD hh:mm:ss');
};

Date.prototype.toNanoString = function () {
  return moment(this).format('YYYYMMDDhhmmss');
};

Number.prototype.toCNY = function (precision = 2) {
  return `${(Math.round(this) / 100).toFixed(precision)}元`;
};

Array.prototype.add = function (element) {
  if (this.includes(element)) return -1;
  return this.push(element);
};

Array.prototype.remove = function (element) {
  return this.splice(this.indexOf(element), 1);
};

Array.prototype.search = function (query) {
  return this.find(e => Object.keys(query).every(key => e[key] === query[key]));
};