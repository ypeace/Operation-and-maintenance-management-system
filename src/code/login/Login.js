import React from 'react';
import connect from 'connect-store';
import LoginStore from './LoginStore';

const LoginView = ({ data, actions }) => {
  return (
    <div>
      <button
        onClick={_ => {
          window.location.href = '/';
        }}
      >登陆
      </button>
    </div>
  );
};

export default _ => connect(LoginView, new LoginStore());