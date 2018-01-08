import React from 'react';
import style from './style.less';
import Button from '../../../components/control/Button';

export default ({data, actions}) => {
  const {isOpen, title, content, bottom} = data;
  const {onClose} = actions;
  return (
    <div
      className={`${style.dialog} ${isOpen ? style.open : ''}`}
    >
      <div className="container">
        <div
          className="content"
           >
          <h1>{title}</h1>
          <div className="text">{content}</div>
        </div>
        <div className="p">{bottom}
        </div>
      </div>
    </div>
  );
};