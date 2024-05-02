import styles from './basicCard.module.css'
import UsuariosContext from '../../../context/usuariosContext'
import { useContext, useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';






function BasicCardColetas({dadosColeta}) {


  // const { locaisColeta } = useContext(UsuariosContext);
  // // const usuarioslist = getUsuarios();
  

    return (
        <div className={styles.card}>
        <h3>{dadosColeta.nomelocal}</h3>
        <p><strong>Descrição:</strong> {dadosColeta.descricao}</p>
        <p><strong>Endereço:</strong> {dadosColeta.rua}, {dadosColeta.ncasa}, {dadosColeta.bairro}, {dadosColeta.cidade} </p>
        <Divider variant="middle"  />

      </div>
    )
}

export default BasicCardColetas