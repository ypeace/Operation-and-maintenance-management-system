import React from 'react';
import connect from 'connect-store';
import IndexStore from './IndexStore';
import style from "./style.less";

const IndexView = ({data, actions}) => {
  const {tel, menus, activeMenu, frameSrc, prompt} = data;
  const {onLogout, onOpen, onFrameLoaded} = actions;
  const height = document.documentElement.clientHeight;
  const index = '-1';
  return (
    <div style={{height}}>
      <div className={style.index}>
        <header
          className="header">
          <img
            className="logo"
            src='./image/logo.png'/>
          <div
            className="logOut"
            onClick={_ => {
              onLogout()
            }}
          >{prompt ? "退出登录" : '请登录'}
          </div>
          <p
            className="header-txt"
          >登录账号：{tel}</p>
        </header>
        <main>
          <aside>
            {menus.map((menu, index) => {
              const hashName = window.location.hash?window.location.hash.split('#')[1].split('/')[0]:'';
              const active = hashName === menu.icon;
              return (
                <div
                  className={active ? "menu" + " active" : "menu"}
                  key={index}
                  onClick={() => {
                    onOpen(menu);
                  }}>
                  {menu.name}
                </div>
              );
            })
            }
          </aside>
          <iframe onLoad={onFrameLoaded} className="frame" src={frameSrc}></iframe>
        </main>
      </div>
    </div>

  );
};

export default _ => connect(IndexView, new IndexStore());