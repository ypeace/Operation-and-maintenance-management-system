import React from 'react';
import TextField from './TextField';
import style from './style.less';

export default ({ data, actions }) => {
  const { value, label } = data;
  const { onUpdateValue } = actions;
  return (
    <div className={style['filter-item']}>
      <span>{label}</span>：
      <TextField
        value={value}
        onChange={value => onUpdateValue(value)}
      />
    </div>
  );
};