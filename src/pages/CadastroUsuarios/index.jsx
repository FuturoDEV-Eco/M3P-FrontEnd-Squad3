import FormUserCadastro from '../../components/organism/formUsercadastro/index';
import Styles from './cadastroUsuarios.module.css';

function CadastroUsuarios() {
  return (
    <div className={Styles.section}>
      <div className={Styles.container}>
        <h1>Cadastrar novo usuário</h1>
        <div className={Styles.boxForms}>
          <FormUserCadastro isEditing={false} />
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuarios;
