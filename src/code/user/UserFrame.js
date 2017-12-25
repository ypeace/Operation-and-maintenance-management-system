import React from 'react';
import SecondaryNaviView from '../SecondaryNaviView';
import connect from 'connect-store';
import UserFrameStore from './UserFrameStore';

export default _ => connect(({data,actions})=>{return <SecondaryNaviView {...{data, actions}}/> }, new UserFrameStore());