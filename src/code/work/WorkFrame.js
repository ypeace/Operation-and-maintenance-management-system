import React from 'react';

import connect from 'connect-store';
import WorkFrameStore from './WorkFrameStore';

const WorkFrameView = ({ data, actions }) => {
  return (
    <div>hello world 我是业务页面</div>
  );
};

export default _ => connect(WorkFrameView, new WorkFrameStore());