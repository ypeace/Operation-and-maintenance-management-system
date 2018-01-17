import React from 'react';
import style  from './popUP.less';

export default ({title,content,control=[]})=>{
  console.log(content);
  return (
    <div className={style.back}>
      <div  className={style.box}>
        <h3>{title}</h3>
        <div className={style.content}>
          {content}
        </div>
        <div className={style.control}>
          {
            control.length?control.map((item,index)=><div className={style.items} key={index}>{item}</div>):null
          }
        </div>
      </div>
    </div>
  )
}
