import React from 'react';
import connect from 'connect-store';
import IndexStore from './IndexStore';
import style from "./style.less";

const IndexView = ({data, actions}) => {
  const {userName, menus, activeMenu,frameSrc} = data;
  const {onLogout, onOpen, onFrameLoaded} = actions;
  console.log(frameSrc);
  return (
    <div className={style.index}>
      <header className="header">
        <button
          className="logOut"
          onClick={_ => {
            onLogout()
          }}
        >退出登录
        </button>
        <p
          className="header-txt"
        >你好,{userName}</p>
      </header>
      <main>
        <aside>
          {menus.map((menu, index) => {
            const {icon, name} = menu;
            const active = activeMenu === menu;
            return (
              <button
                key={index}
                onClick={()=>{
                    onOpen(menu);
                    console.log(menu)
                }
                }
                className={active ? 'active' : ''}
              >
                {menu.name}
              </button>
            );
          })
          }
        </aside>
        <iframe onLoad={onFrameLoaded} className="frame" src={frameSrc}> </iframe>
      </main>
    </div>
  );
};

export default _ => connect(IndexView, new IndexStore());