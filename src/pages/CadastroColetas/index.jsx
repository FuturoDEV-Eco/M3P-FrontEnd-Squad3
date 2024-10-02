import styled from './CadastroColetas.module.css';
import FormLocaisCadastro from '../../components/organism/formLocaisCadastro/index';

import * as React from 'react';

function CadastroColetas() {
  return (
    <div className={styled.container}>
      <h1>Cadastro de Locais de Coleta</h1>
      <FormLocaisCadastro isEditing={false} />
    </div>
  );
}

export default CadastroColetas;
