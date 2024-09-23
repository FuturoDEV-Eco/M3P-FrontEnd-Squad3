import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CadastroColetas from '../pages/CadastroColetas';
import ListagemColetas from '../pages/ListagemColetas';
import LoginSignup from '../pages/login-signup';
import Dashboard from '../pages/Dashboard';
import ListagemUsuarios from '../pages/ListagemUsuarios';
import CadastroUsuarios from '../pages/CadastroUsuarios';
import EditarUsuariosEColetas from '../pages/EditarUsuariosEColetas';

let isAuthenticated =
  JSON.parse(localStorage.getItem('isAutenticated')) || false;

const PrivateRouter = ({ children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/cadastro-usuarios',
        element: <CadastroUsuarios />,
      },
      {
        path: '/loginSignup',
        element: <LoginSignup />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <PrivateRouter>
        <App />
      </PrivateRouter>
    ),
    children: [
      {
        path: '/cadastro-coletas',
        element: <CadastroColetas />,
      },
      {
        path: '/listagem-coletas',
        element: <ListagemColetas />,
      },
      {
        path: '/listagem-usuarios',
        element: <ListagemUsuarios />,
      },
      {
        path: '/editar/:endpoint/:dataid/',
        element: <EditarUsuariosEColetas />,
      },
    ],
  },
]);

// const routes = createBrowserRouter([
//   {
//     path: '/login',
//     element: <LoginSignup />,
//   },
//   {
//     path: '/',
//     element: (
//       <PrivateRouter>
//         <App />
//       </PrivateRouter>
//     ),
//     children: [
//       {
//         path: '/dashboard',
//         element: <Dashboard />,
//       },
//       {
//         path: '/cadastro-coletas',
//         element: <CadastroColetas />,
//       },

//       {
//         path: '/listagem-coletas',
//         element: <ListagemColetas />,
//       },
//       {
//         path: '/cadastro-usuarios',
//         element: <CadastroUsuarios />,
//       },
//       {
//         path: '/listagem-usuarios',
//         element: <ListagemUsuarios />,
//       },
//       {
//         path: '/editar/:endpoint/:dataid/',
//         element: <EditarUsuariosEColetas />,
//       },
//     ],
//   },

//   ,
// ]);

export default routes;
