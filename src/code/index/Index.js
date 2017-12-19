import React from 'react';
import connect from 'connect-store';
import IndexStore from './IndexStore';

const IndexView = ({ data, actions }) => {
  return (
    <div>
      <button
        onClick={_ => {
          window.location.href = '/login.html';
        }}
      >登出
      </button>
    </div>
  );
};

export default _ => connect(IndexView, new IndexStore());