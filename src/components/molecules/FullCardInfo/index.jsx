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
  showUserIcon,
  showColetaIcon,
  showResiduos,
  endpoint,
  dataid,
}) {
  const { deleteData } = useContext(UsuariosContext);

  function editData(endpoint, dataid) {
    window.location.href = `/editar/${endpoint}/${dataid}`;
  }

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
      </div>
      <Divider variant="middle" />
      {showResiduos && (
        <div>
          <p>
            <b>{showResiduos.titulo} </b>
            {showResiduos.descricao}
          </p>
        </div>
      )}
      <div className={Styles.buttonbox}>
        <Cbutton onClick={() => deleteData(endpoint, dataid)}>Apagar</Cbutton>
        <Cbutton onClick={() => editData(endpoint, dataid)}>Editar</Cbutton>
      </div>
    </div>
  );
}

export default FullCardInfo;
