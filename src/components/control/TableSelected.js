import React from 'react';
import style from './style.less';

export default ({dataSource = [], columns = [], className, onClick = _=>{} }) => {
  return (
    <div >
      <table className={[style.table, className].join(' ')}>
        <thead>
        <tr>
          {columns.map((column, index) => (
            <td
            key = {index}
            >{column.name}</td>
          ))}
        </tr>
        </thead>
        <tbody>
        {dataSource.map(( row, index) => {
          return (
            <tr
              onClick={()=>{
                onClick(row)
              }}
              key={index}>{columns.map(({render = _ => null}, index) => {
              return <td key={index}>{render(row)}</td>;
            })}</tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};