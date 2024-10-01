import styled from './CadastroColetas.module.css';
import FormLocaisCadastro from '../../components/organism/formLocaisCadastro/index';

import * as React from 'react';

function CadastroColetas() {
  return (
    <div className={styled.container}>
<<<<<<< HEAD
      <h1>Cadastrar novo local de coleta</h1>
=======
      <h1>Cadastro de Locais de Coleta</h1>
>>>>>>> feature/modification-lists
      <FormLocaisCadastro isEditing={false} />
    </div>
  );
}

export default CadastroColetas;
