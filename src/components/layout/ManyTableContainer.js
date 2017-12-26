import React from 'react';
import style from './style.less';

export default ({ children, className }) => {
  return (
    <div className={[style.ManyTableContainer, className].join(' ')}>{children}</div>
  );
};