import styled from './dashboard.module.css';
import BasicCardColetas from '../../components/molecules/BasicCardColetas';
import MapColetas from '../../components/organism/map/index';
import { useContext } from 'react';
import UsuariosContext from '../../context/usuariosContext';
import InfoHeaderCard from '../../components/molecules/InfoHeaderCards/InfoHeaderCard'

import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Dashboard() {
  const { usuarios, locaisColetas, locaisColetasNumber, userNumbers, usuarioMaxColetas } = useContext(UsuariosContext);

  return (
    <div className={styled.bodygeral}>
      <div className={styled.containerBox}>
        <div className={styled.sidebar}>
          <h1> sidebar </h1>
        </div>
        <div className={styled.boxright}>
          <div className={styled.headerinfo}>
            <InfoHeaderCard numberData={userNumbers} infoData='Usuarios Cadastrados' typeClass='cardnumber'/>
            <InfoHeaderCard numberData={locaisColetasNumber} infoData='Locais de coletas'  typeClass='cardnumber'/>
            <InfoHeaderCard numberData={usuarioMaxColetas} infoData='Usuário com mais cad. locais' typeClass='cardtext'/>
            <InfoHeaderCard numberData={usuarioMaxColetas} infoData='Cidade com mais locais' typeClass='cardtext'/>

          </div>
          <div className={styled.mapinfo}>
            <div className={styled.boxmap}>
              <MapColetas />
            </div>
            <div className={styled.boxmapright}>
              <h2>Locais de coletas</h2>
              <Stack spacing={2}>
              {locaisColetas.map((locaisColetas, index) => (
                <BasicCardColetas dadosColeta={locaisColetas} key={index} />
              ))}
                <Pagination count={2} shape="rounded" />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
