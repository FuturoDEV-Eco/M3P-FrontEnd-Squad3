import Styles from './FullCardInfo.module.css';
import Divider from '@mui/material/Divider';
import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RecyclingIcon from '@mui/icons-material/Recycling';
import Cbutton from '../../atoms/Cbutton/Cbutton';
import { useContext } from 'react';
import UsuariosContext from '../../../context/usuariosContext';

function FullCardInfo({
  dadoTitulo,
  dadoSubtitulo,
  dado3,
  dado4,
  dado5,
  dado6,
  dado7,
  showUserIcon,
  showColetaIcon,
  showResiduos,
  endpoint,
  dataid,
  showDado7 = true,
}) {
  const { deleteData } = useContext(UsuariosContext);

  function editData(endpoint, dataid) {
    window.location.href = `/editar/${endpoint}/${dataid}`;
  }

  const currentUser = localStorage.getItem('currentUser');

  function getDeleteButtonProps() {
    if (typeof dado5.descricao === 'string') {
      if (dado5.descricao === currentUser) {
        return { disabled: false, tooltip: '' };
      } else {
        return { disabled: true, tooltip: 'Só pode apagar locais de coleta cadastrados por você' };
      }
    } 
    else if (typeof dado5.descricao === 'number') {
      if (dado5.descricao === 0) {
        return { disabled: false, tooltip: '' };
      } else {
        return { disabled: true, tooltip: 'Não pode apagar usuários com pontos de coleta cadastrados' };
      }
    } else {
      return { disabled: true, tooltip: 'Erro: Tipo de usuário inválido' };
    }
  }
  
  function getEditButtonProps() {
    if (typeof dado5.descricao === 'string') {
      if (dado5.descricao === currentUser) {
        return { disabled: false, tooltip: '' };  
      } else {
        return { disabled: true, tooltip: 'Só pode editar locais de coleta cadastrados por você' };  
      }
    } 
    else if (typeof dado5.descricao === 'number') {
      return { disabled: false, tooltip: '' };  
    } else {
      return { disabled: true, tooltip: 'Erro: Tipo de usuário inválido' };
    }
  }

  const deleteButtonProps = getDeleteButtonProps();
  const editButtonProps = getEditButtonProps();

  return (
    <div className={Styles.cardbox}>
      <div className={Styles.titlebox}>
        <div className={Styles.titlename}>
          {showUserIcon && <AccountCircleIcon fontSize="large" />}
          {showColetaIcon && <RecyclingIcon fontSize="large" />}
          <div>
            <h3>{dadoTitulo}</h3>
            <p>{dadoSubtitulo}</p>
          </div>
        </div>
        <div>
          <p>
            <b>{dado5.titulo} </b>
            {dado5.descricao}
          </p>
        </div>
      </div>
      <div className={Styles.dados}>
        <p>
          <b>{dado6.titulo} </b>
          {dado6.descricao}
        </p>
        <p>
          <b>{dado3.titulo} </b>
          {dado3.descricao}{' '}
        </p>
        <p>
          <b>{dado4.titulo} </b>
          {dado4.descricao}
        </p>
        {showDado7 && dado7.titulo && dado7.descricao && (
          <p>
            <b>{dado7.titulo} </b>
            <a href={dado7.descricao} target="_blank">{dado7.descricao}</a>
          </p>
        )}
      </div>
      
      {showResiduos && (
        <div>
          <p>
            <b>{showResiduos.titulo} </b>
            {showResiduos.descricao}
          </p>
        </div>
      )}
      <div className={Styles.buttonbox}>
        <Cbutton 
          disabled={deleteButtonProps.disabled} 
          onClick={() => deleteData(endpoint, dataid)}
          tooltip={deleteButtonProps.tooltip}
        >
          Apagar
        </Cbutton>
        <Cbutton 
          disabled={editButtonProps.disabled} 
          onClick={() => editData(endpoint, dataid)}
          tooltip={editButtonProps.tooltip}
        >
          Editar
        </Cbutton>
      </div>
    </div>
  );
}

export default FullCardInfo;
