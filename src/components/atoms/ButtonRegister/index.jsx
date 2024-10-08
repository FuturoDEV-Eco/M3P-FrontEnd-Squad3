import * as React from 'react';
import Styles from './ButtonRegister.module.css';
import Cbutton from '../Cbutton/Cbutton';

function ButtonRegister() {
  function ToLoginRegister() {
    window.location.href = `/cadastro-usuarios`;
  }

  return (
    <div>
      <Cbutton onClick={() => ToLoginRegister()}>Cadastro</Cbutton>
    </div>
  );
}

export default ButtonRegister;
