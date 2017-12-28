import React from 'react';
import style from './style.less';

export default ({children, className, disabled, fullWidth, flat, show, onToggleDialog}) => {
  return (
    <div>

      {show ? (
        <div className="dialogue" style={{display: show ? 'block' : 'none'}}>
          <div className="contain">
            <div className="contain-bottom">
              <button className="close"  onClick={onToggleDialog}>确定</button>
              <button
                className="cancel"
                onClick={onToggleDialog}
              >取消
              </button>
            </div>
          </div>
        </div>

      ) : null}
    </div>
  );
}
