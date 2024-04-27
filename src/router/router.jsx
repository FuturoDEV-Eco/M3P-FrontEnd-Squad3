import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CadastroColetas from '../pages/CadastroColetas';
import ListagemColetas from '../pages/ListagemColetas';
import LoginSignup from '../pages/login-signup';
import Dashboard from '../pages/Dashboard';

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <LoginSignup />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/cadastro-coletas',
        element: <CadastroColetas />,
      },
      {
        path: '/listagem-coletas',
        element: <ListagemColetas />,
      },
    ],
  },

  ,
]);

export default routes;
