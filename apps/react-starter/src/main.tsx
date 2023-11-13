/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxApplicationContext } from '@siemens/ix-react';
import '@siemens/ix/dist/siemens-ix/siemens-ix.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import ComponentOverview from './pages/component-overview';
import HomePage from './pages/home';
import Example from './pages/example';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/page1',
        element: <ComponentOverview />,
      },
      {
        path: '/page2',
        element: <Example />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IxApplicationContext>
      <RouterProvider router={router} />
    </IxApplicationContext>
  </React.StrictMode>
);
