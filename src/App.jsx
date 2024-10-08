import { useContext } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/molecules/header';

function App() {
  return (
    <main className="min">
      <Header />
      <Outlet />
    </main>
  );
}

export default App;
