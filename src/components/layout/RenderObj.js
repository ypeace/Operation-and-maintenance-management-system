import React from 'react';
import style from './style.less';
export default ({ dataArr = [], title = '个人身份', className}) => {
  return (
    <div className={[style.renderObj, className].join(' ')}>
      <div className="title">{title}</div>
      <ul className={'body'}>
        {dataArr.length?dataArr.map((item, index) => {
          return (
            <li key={index}>
              <div className='key'>{item.key}</div>
              <div className='value'>{item.render()}</div>
            </li>
          );
        }):null}
      </ul>
    </div>
  );
};