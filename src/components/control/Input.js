import React from 'react';
import style from './style.less';

export default ({ name,defaultValue = '' ,onClick = _ => {},onChange =_=>{} }) => {
  return <span  className={style.changInput}>
        <span className='name'>{name}:</span>
        <input
          placeholder={defaultValue}
          type="text"
          onClick = {()=>{
            onClick
          }}
          onChange={
            ()=>{
              onChange
            }
          }
        />
      </span>
}



