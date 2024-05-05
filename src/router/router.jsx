import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CadastroColetas from '../pages/CadastroColetas';
import ListagemColetas from '../pages/ListagemColetas';
import LoginSignup from '../pages/login-signup';
import Dashboard from '../pages/Dashboard';
import ListagemUsuarios from '../pages/ListagemUsuarios'
import CadastroUsuarios from '../pages/CadastroUsuarios'

let isAutenticated = JSON.parse(localStorage.getItem("isAutenticated")) || false 

const PrivateRouter = ({children}) => {
 return isAutenticated ? children : <Navigate to="/login" />
}

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <LoginSignup />,
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
        path: '/dashboard',
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
      {
        path: '/cadastro-usuarios',
        element: <CadastroUsuarios />,
      },
      {
        path: '/listagem-usuarios',
        element: <ListagemUsuarios />,
      },
     
    ],
  },

  ,
]);

export default routes;
