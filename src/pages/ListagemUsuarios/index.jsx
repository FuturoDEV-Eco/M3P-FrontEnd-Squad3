import FullCardInfo from '../../components/molecules/FullCardInfo';
import { useContext } from 'react';
import UsuariosContext from '../../context/usuariosContext';
import Styles from './listagemusaurios.module.css';

function ListagemUsuarios() {
  const { usuarios } = useContext(UsuariosContext);
  return (
    <div className={Styles.sectionUserList}>
      <div className={Styles.cardbox}>
        <h1>Lista de Usuários Cadastrados</h1>
        <div className={Styles.cardboxlist}>
          {usuarios.map((usuarios, index) => (
            <FullCardInfo
              dadoTitulo={usuarios.nomeusuario}
              dadoSubtitulo={usuarios.email}
              dado3={{ titulo: 'CPF:', descricao: usuarios.cpf }}
              dado4={{
                titulo: 'Endereço:',
                descricao: `${usuarios.rua}, ${usuarios.ncasa}, ${usuarios.bairro}, ${usuarios.cidade}`,
              }}
              dado5={{
                titulo: 'Número de locais:',
                descricao: usuarios.ncoletas,
              }}
              dado6={{ titulo: 'Data de nascimento', descricao: usuarios.ndata }}
              dado7={false}
              key={index}
              showUserIcon={true}
              endpoint="usuarios"
              dataid={usuarios.id}
            />
          ))}
       </div> 
      </div>
    </div>
  );
}

export default ListagemUsuarios;
