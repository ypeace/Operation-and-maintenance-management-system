import React from 'react';
import style from './style.less';
import Button from '../../components/control/Button';

export default ({ data, actions }) => {
  const { isOpen, frameSrc, title } = data;
  const { onClose } = actions;
  return (
    <div
      className={`${style.drawer} ${isOpen ? style.open : ''}`}
    >
      <span className="close-btn"
        onClick={onClose}
      >返回</span>
      <div
        className="container"
      >
        <h1>{title}</h1>
        <iframe
          className="frame"
          src={frameSrc}
        />
      </div>
    </div>
  );
};