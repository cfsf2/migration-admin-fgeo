import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));

const routes = [
  { path: '/', name: '', component: Dashboard },

];

export default routes;
