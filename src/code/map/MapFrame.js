import React from 'react';

import connect from 'connect-store';
import MapFrameStore from './MapFrameStore';

const WorkFrameView = ({ data, actions }) => {
  return (
    <div>hello world 我是地图页面</div>
  );
};

export default _ => connect(WorkFrameView, new MapFrameStore());