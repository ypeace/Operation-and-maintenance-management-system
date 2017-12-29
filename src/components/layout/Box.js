import React from 'react';
import style from './style.less';

export default ({ children, className }) => {
  const height = document.body.clientWidth + document.body.scrollTop ;
  const width = document.documentElement.clientWidth;
  return (
    <div style={{height}} className={[style.box, className].join(' ')}>
      {children}
    </div>
  );
};