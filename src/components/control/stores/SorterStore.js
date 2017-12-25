export default class SorterStore {
  // 排序方式 none 不排序 asc 升序 desc 降序
  mode = 'none';

  label = '';

  get sorter () {
    if (this.mode === 'none') {
      return {};
    } else if (this.mode === 'asc') {
      return { [this._key]: 1 };
    } else if (this.mode === 'desc') {
      return { [this._key]: -1 };
    }
  }

  constructor ({
    key = 'key', defaultMode = 'none',
    label = '',
  }) {
    this._key = key;
    this.mode = defaultMode;
    this.label = label;
  }

  updateMode (mode) {
    this.mode = mode;
    this._onUpdateMode(mode);
  }

  _onUpdateMode () {

  }
}