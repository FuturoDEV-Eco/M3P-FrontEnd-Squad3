import { useContext } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { UsuariosContext, UsuariosContextProvider,
} from './context/usuariosContext';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
      <UsuariosContextProvider>
      <Outlet />
      </UsuariosContextProvider>
    </>
  );
}

export default App;
