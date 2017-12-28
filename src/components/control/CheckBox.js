import React, {Component} from 'react';
import style from './style.less';

export default ({ checked, label,onClick = _ => null }) => {
  return (
    <div  className={style.checkbox}>
      <div
        className="line"
        onClick={()=>{
          onClick();
        }}
      >
        <i className={checked?'active':''}>●</i>
        <span>{label}</span>
      </div>
    </div>
  );
}


