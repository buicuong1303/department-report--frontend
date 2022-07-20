/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

//Layout
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import { AuthGuard } from 'components';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <AuthGuard><Redirect to="/export/panel" /></AuthGuard>
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('scenes/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('scenes/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('scenes/Error500'))
      },
      {
        // eslint-disable-next-line react/no-multi-comp
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '*/',
    component: DashboardLayout,
    routes: [
      {
        path: '/export/:frame',
        exact: true,
        component: lazy(() => import('scenes/Export')),
      },
      {
        path: '/import/:frame',
        exact: true,
        component: lazy(() => import('scenes/Import')),
      },
      {
        path: '/data-center',
        exact: true,
        component: lazy(() => import('scenes/DataCenter')),
      },
      {
        path: '/log',
        exact: true,
        component: lazy(() => import('scenes/Log')),
      },
      {
        path: '/configuration',
        exact: true,
        component: lazy(() => import('scenes/Configuration')),
      },
    ]
  }
];

export default routes;
