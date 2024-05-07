import FormUserCadastro from '../../components/organism/formUsercadastro/index';
import Styles from './cadastroUsuarios.module.css';

function CadastroUsuarios() {
  return (
    <div>
      <div className={Styles.container}>
        <h1>Cadastrar ou editar usuarios</h1>
        <div className={Styles.boxForms}>
          <FormUserCadastro />
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuarios;
