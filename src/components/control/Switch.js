import React from 'react';
import style from './style.less';

export default ({ className, label, toggled, onToggle= _ =>{} }) => {
  return (
    <a
      className={[style.toggle, className].join(' ')}
      onClick={_ => onToggle(!toggled)}
    >
      <i
        className={`fa ${toggled ? 'fa-toggle-on' : 'fa-toggle-off'}`}
      >{label}</i>
    </a>
  );
};


