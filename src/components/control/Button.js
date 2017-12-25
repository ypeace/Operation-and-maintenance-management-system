import React from 'react';
import style from './style.less';

export default ({ children, className, disabled, fullWidth, flat, onClick = _ => null }) => {
  return (
    <button
      className={[style.button, className, flat && 'flat', fullWidth && 'full-width'].join(' ')}
      onClick={_ => onClick()}
      disabled={disabled}
    >{children}</button>
  );
}