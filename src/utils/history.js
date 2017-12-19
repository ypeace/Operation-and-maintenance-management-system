import createHashHistory from 'history/createHashHistory';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createHashHistory({
  hashType: 'noslash'
});

const push = history.push;

history.push = (...params) => {
  if(params[0] === history.location.pathname) return;
  return push(...params);
};

export default history;

export const browserHistory = createBrowserHistory();