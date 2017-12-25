import React from 'react';
import connect from 'connect-store';
import SorterItem from './SorterItem';
import style from './style.less';
import Toggle from './Toggle';
import Tag from '../layout/Tag';

export default ({ data, actions }) => {
  const { sorters, unionSortQueue, sortMode } = data;
  const { onUpdateSortMode } = actions;
  const unionMode = sortMode === 1;
  return (
    <div className={style.sorter}>
      <div className="sorters">
        {sorters.map(sorterStore => connect(SorterItem, sorterStore))}
      </div>
      <Toggle
        label={unionMode ? '联合排序  * 选取排序项后点击[开始搜索]' : '单键排序'}
        toggled={unionMode}
        onToggle={toggled => onUpdateSortMode(toggled ? 1 : 0)}
        className="toggle"
      />
      <div className="union-box">
        {(_ => {
          if (unionMode) {
            return unionSortQueue.map(sorterStore => connect(({ data }) => {
              const arrow = <i className={`fa fa-angle-${data.mode === 'asc' ? 'up' : 'down'}`}/>;
              return (<Tag>
                {data.label}&nbsp;
                {arrow}
              </Tag>);
            }, sorterStore));
          }
        })()}
      </div>
    </div>
  );
}