import FullCardInfo from '../../components/molecules/FullCardInfo';
import { useContext, useEffect, useState } from 'react';
import UsuariosContext from '../../context/usuariosContext';
import Styles from './listagemusaurios.module.css';

function ListagemUsuarios() {
  const [deleteOk, setDeleteOk] = useState(false);
  const [editOk, setEditOk] = useState(false);


  useEffect(() => {
    if (localStorage.getItem('deleteOk')) {
      setDeleteOk(true);
      localStorage.removeItem('deleteOk');
    }

    if (localStorage.getItem('editOk')) {
      setEditOk(true);
      localStorage.removeItem('editOk');
    }

  }, []);

  const { usuarios } = useContext(UsuariosContext);
  return (
    <div className={Styles.sectionUserList}>
      <div className={Styles.cardbox}>
      {deleteOk && (
        <div className={Styles.deleteOk}>
          <b>Apagado com sucesso!</b>
        </div>)}
        {editOk && (
        <div className={Styles.editOk}>
          <b>Editado com sucesso!</b>
        </div>)}
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
              dado7={{ titulo: false, descricao: false }}
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
