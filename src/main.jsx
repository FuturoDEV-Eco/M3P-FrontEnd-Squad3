import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './router/router.jsx';

import {
  UsuariosContext,
  UsuariosContextProvider,
} from '../src/context/usuariosContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UsuariosContextProvider>
    <RouterProvider router={routes} />
  </UsuariosContextProvider>
);
