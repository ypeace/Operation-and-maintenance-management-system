export default class TextFilterStore {
  // 文本值
  value = '';

  label = '';

  get filter () {
    if (!this.value) return {};
    if (!this._fuzzy) {
      return {
        [this._key]: this.value
      };
    } else {
      return {
        [this._key]: { $regex: this.value }
      };
    }
  }

  constructor ({
    key = 'key', fuzzy = false,
    label = '', defaultValue = '',
    tag = '',
  }) {
    this._key = key;
    this._fuzzy = fuzzy;
    this._tag = tag;
    this.label = label;
    this.value = defaultValue;
  }

  updateValue (value) {
    this.value = value;
  }

}