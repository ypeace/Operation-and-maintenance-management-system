import React from 'react';
import style from './style.less';

export default ({data, actions, componentBeforeMenu}) => {
  const {frameSrc, menus, activeMenu} = data;
  const {onOpen, onFrameLoaded} = actions;
  const height = document.documentElement.clientHeight;
  return (
    <div style={{height}}>
      <div className={`${style['secondary-frame']} full`}>
        <div rounded={false} className="sidebar">
          {componentBeforeMenu}
          <ul className="menu">{menus.map((menu, index) => {
            const hashName = window.location.hash?window.location.hash.split('#')[1].split('/')[0]:'';
            const active = hashName === menu.icon;
            return <li key={index} className={`menu-item ${menu === activeMenu ? 'active' : ''}`}>
                <div
                  className={active ? 'active' + " button" : "button"}
                  onClick={_ => onOpen(menu)}
                >{menu.name}</div>
              </li>

          })}</ul>
        </div>
        <iframe onLoad={onFrameLoaded} className="frame" src={frameSrc}> </iframe>
      </div>
    </div>
  );
};
