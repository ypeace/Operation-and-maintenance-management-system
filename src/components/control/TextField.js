import React, { Component } from 'react';
import style from './style.less';

export default class TextField extends Component {
  _isCompositionStarted = false;

  state = {
    value: '',
  };

  render () {
    let { value = '', defaultValue, className, onChange = _ => null, onEnter = _ => null, valueTransformer = v => v, ...others } = this.props;

    const optimizeOnChange = value => {
      value = valueTransformer(value);
      this.setState({
        value
      });
      if(this._isCompositionStarted) return;
      onChange(value);
    };

    return (
      <input
        className={[style['text-field'], className].join(' ')}
        defaultValue={defaultValue}
        onChange={e => optimizeOnChange(e.target.value, e)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            onEnter(e.target.value);
          }
        }}
        value={this._isCompositionStarted ? this.state.value : value}
        onCompositionStart={_ => {
          this._isCompositionStarted = true;
        }}
        onCompositionEnd={e => {
          this._isCompositionStarted = false;
          optimizeOnChange(e.target.value);
        }}
        {...others}
      />
    );
  }
}