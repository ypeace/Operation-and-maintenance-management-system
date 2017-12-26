import React from 'react';
import style from './style.less';
import Button from '../../../components/control/Button';

export default ({ data, actions }) => {
  const { isOpen,  title='巡检时候的is你付款金额防洪堤偶数捣鼓捣鼓' } = data;
  const { onClose } = actions;
  return (
    <div
      className={`${style.dialog} ${isOpen ? style.open : ''}`}
    >


      <div
        className="content"
        zDepth={2}
      >
        <h1>{title}</h1>
        {'33333333333333333333333333333333333333333333333333333333333333333333333333333333333'}
        <span className="close-close"
              onClick={()=>{
                onClose()
              }}
        >取消</span>
        <span className="close-btn"
              onClick={()=>{
                onClose()
              }}
        >确认</span>
      </div>
    </div>
  );
};