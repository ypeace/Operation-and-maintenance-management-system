import React from 'react';
import style from './style.less';

export default ({ className, label, toggled, onToggle }) => {
  return (
    <a
      className={[style.switch, className].join(' ')}
      onClick={_ => onToggle(!toggled)}
    >
      <i
        className={`fa ${toggled ? 'fa-toggle-on' : 'fa-toggle-off'}`}
      >{label}</i>
    </a>
  );
};


