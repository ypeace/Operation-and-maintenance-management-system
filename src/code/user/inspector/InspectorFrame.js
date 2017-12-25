import React from 'react';

import connect from 'connect-store';
import InspectorFrameStore from './InspectorFrameStore';

const InspectorFrameView = ({ data, actions }) => {
  return (
    <div>巡检端页面</div>
  );
};

export default _ => connect(InspectorFrameView, new InspectorFrameStore());