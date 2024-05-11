import styled from './CadastroColetas.module.css';
import FormLocaisCadastro from '../../components/organism/formLocaisCadastro/index';

import * as React from 'react';

function CadastroColetas() {
  return (
    <div className={styled.container}>
      <FormLocaisCadastro 
      isEditing={false} />
    </div>
  );
}

export default CadastroColetas;
