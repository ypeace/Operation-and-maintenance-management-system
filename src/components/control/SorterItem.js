import React from 'react';
import style from './style.less';

export default ({ data, actions }) => {
  const { mode, label } = data;
  const { onUpdateMode } = actions;
  return (
    <div className={[style['sort-item'], 'sorter-item'].join(' ')}>
      <span>{label}</span>
      <div className={`arrow-box ${mode}`}>
        <i
          onClick={_ => onUpdateMode(mode === 'asc' ? 'none' : 'asc')}
          className="fa fa-angle-up"
        />
        <i
          onClick={_ => onUpdateMode(mode === 'desc' ? 'none' : 'desc')}
          className="fa fa-angle-down"
        />
      </div>
    </div>
  );
};