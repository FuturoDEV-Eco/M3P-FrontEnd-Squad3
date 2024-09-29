import styled from './CadastroColetas.module.css';
import FormLocaisCadastro from '../../components/organism/formLocaisCadastro/index';

import * as React from 'react';

function CadastroColetas() {
  return (
    <div className={styled.container}>
      <h1>Cadastrar novo local de coleta</h1>
      <FormLocaisCadastro isEditing={false} />
    </div>
  );
}

export default CadastroColetas;
