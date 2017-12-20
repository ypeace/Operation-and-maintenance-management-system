import React from 'react';
import connect from 'connect-store';
import LoginStore from './LoginStore';
import style from './style.less';

const LoginView = ({data, actions}) => {
  const {userName, passWord} = data;
  const {onUserKeyUP, onPassWordKeyUP, onLogin } = actions;
  return (
    <div className={style.box} >
      <div>
        <div className="login-form">
          <div>
            <span>
              <img
                className="img-logo"
                src= './image/logo.png'
                alt=""/>
            </span>
          </div>
          <div className="login-top">
              <div className="login-ic">
                <img src = "image/m.png"/>
                <input
                  type="text"
                  placeholder="User name"
                  value={userName}
                  onChange={ev =>{
                    console.log(ev.target.value)
                    onUserKeyUP(ev.target.value)
                  }}
                />
              </div>
              <div className="login-ic">
                <img src = "image/l.png"/>
                <input
                  type="password"
                  placeholder="password"
                  value={passWord}
                  onChange={ev =>{
                    onPassWordKeyUP(ev.target.value)
                  }}
                />
              </div>

              <div className="log-bwn">
                <input
                  type="button"
                  value="登录"
                  onClick={_ => {
                    onLogin()
                  }}
                />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default _ => connect(LoginView, new LoginStore());