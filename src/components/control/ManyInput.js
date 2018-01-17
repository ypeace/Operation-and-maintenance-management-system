import React from 'react';
import style from './style.less';

export default ({name, parameter = '', arr = [],onClick = _ => null}) => {
  arr.unshift('');
  return <span
    className={style.manyInput}>
        <span className='name'>{name}:</span>
        <select
          onChange={(e)=>{
            onClick(parameter,e.target.value);
          }}
          className="select"
        >
          {arr.map((item,index)=>{
            return <option
              key = {index}
            >{item}</option>
          })}}
        </select>
   </span>

}



