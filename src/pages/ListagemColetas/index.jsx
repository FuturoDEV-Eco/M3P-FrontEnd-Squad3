import FullCardInfo from '../../components/molecules/FullCardInfo';
import { useContext, useState, useEffect } from 'react';
import UsuariosContext from '../../context/usuariosContext';
import Styles from './ListagemColetas.module.css';
import { styled } from '@mui/material';

function ListagemColetas() {
  const [deleteOk, setDeleteOk] = useState(false);
  const [editOk, setEditOk] = useState(false);
  const [cadastroColetaOk, setCadastroColetaOk] = useState(false);
  const { locaisColetas } = useContext(UsuariosContext);
  console.log(locaisColetas);

  useEffect(() => {
    if (localStorage.getItem('cadastroColetaOk')) {
      setCadastroColetaOk(true);
      localStorage.removeItem('cadastroColetaOk');
    }
    if (localStorage.getItem('deleteOk')) {
      setDeleteOk(true);
      localStorage.removeItem('deleteOk');
    }

    if (localStorage.getItem('editOk')) {
      setEditOk(true);
      localStorage.removeItem('editOk');
    }
  }, []);

  return (
    <div className={Styles.section}>
      <div className={Styles.cardbox}>
        {cadastroColetaOk && (
          <div className={Styles.cadastroOk}>
            <b>Local de coleta cadastrado com sucesso!</b>
          </div>
        )}
        {editOk && (
          <div className={Styles.editOk}>
            <b>Editado com sucesso!</b>
          </div>
        )}
        {deleteOk && (
          <div className={Styles.deleteOk}>
            <b>Apagado com sucesso!</b>
          </div>
        )}
        <h1>Lista de locais de coleta Cadastrados</h1>
        {locaisColetas.map((coletas, index) => (
          <FullCardInfo
            dadoTitulo={coletas.nome}
            dadoSubtitulo={coletas.descricao}
            dado3={{ titulo: 'Bairro:', descricao: coletas.bairro }}
            dado4={{
              titulo: 'Endereço:',
              descricao: `${coletas.logradouro}, ${coletas.numero}`,
            }}
            dado5={{ titulo: 'ID do autor:', descricao: coletas.userId }}
            dado6={{ titulo: 'Cidade', descricao: coletas.localidade }}
            dado7={{
              titulo: 'Link de Google Maps:',
              descricao: coletas.googleMapsLink,
            }}
            showColetaIcon={true}
            showResiduos={{
              titulo: 'Residuos Aceitos:',
              descricao: coletas.residuos_aceitos.join(', '),
            }}
            key={index}
            endpoint="locaisColeta"
            dataid={coletas.id}
            isUserList={false}
          />
        ))}
      </div>
    </div>
  );
}

export default ListagemColetas;
