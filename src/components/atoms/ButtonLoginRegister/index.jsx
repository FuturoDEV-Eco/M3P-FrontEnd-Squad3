import * as React from 'react';
import Styles from './ButtonLoginRegister.module.css';
import Cbutton from '../../atoms/Cbutton/Cbutton';


function ButtonLoginRegister() {


    function ToLoginRegister() {
      window.location.href = `/loginSignup`;
  }

  
  return (
      <div>
        <Cbutton onClick={() => ToLoginRegister()}>Login/Cadastrar</Cbutton>
      </div>
  );
}

export default ButtonLoginRegister
