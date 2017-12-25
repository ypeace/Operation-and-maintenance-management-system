import React from 'react';
import TextFilterStore from './stores/TextFilterStore';
import FilterTextItem from './FilterTextItem';
import style from './style.less';

import connect from 'connect-store';

export default ({ data, tags = [] }) => {
  const { filters } = data;
  return (
    <div className={style.filter}>{filters.map(filterStore => {
      if(tags.length > 0 && !tags.includes(filterStore._tag)) return null;
      if (filterStore instanceof TextFilterStore) {
        return connect(FilterTextItem, filterStore);
      } else return null;
    })}</div>
  );
};