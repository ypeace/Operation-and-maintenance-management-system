import React from 'react';
import style from './style.less';
import Button from './Button';
import TextField from './TextField';

const textFieldValueTransformer = value => parseInt(value) || 1;

export default ({ data, actions }) => {
  const { page, limit } = data;
  const { onUpdatePageSize, onUpdatePage, onRefresh, onToPrevPage, onToNextPage } = actions;
  return (
    <div className={style.pagination}>
      <Button
        flat
        onClick={onToPrevPage}
      >上一页</Button>
      第
      <TextField
        value={page}
        valueTransformer={textFieldValueTransformer}
        onChange={value => onUpdatePage(value)}
        onEnter={_ => onRefresh()}
      />
      页 | 每页
      <TextField
        value={limit}
        valueTransformer={textFieldValueTransformer}
        onChange={value => onUpdatePageSize(value)}
        onEnter={_ => onRefresh()}
      />
      条
      <Button
        flat
        onClick={onToNextPage}
      >下一页</Button>
    </div>
  );
};