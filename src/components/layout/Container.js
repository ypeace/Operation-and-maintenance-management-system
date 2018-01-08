import React from 'react';
import style from './style.less';

export default ({ children, className, }) => {
  return (
    <div className={[style.container, className].join(' ')}>{children}</div>
  );
};