import React from 'react';
import style from './style.less';

export default ({ name,defaultValue = '' ,parameter,onClick = _ => null }) => {
  return <div  className={style.changInput}>
        <span className='name'>{name}:</span>
        <input
          placeholder={defaultValue}
          type="text"
          onKeyUp={(e)=>{
            if(e.keyCode == "13"){
              onClick(parameter, e.target.value);
              e.target.value = null;
            }
          }}
        />
        <i onClick={(ev)=>{
          onClick();
          alert(ev.target.value)
        }}>*回车键进行保存</i>
      </div>

}


