import styled from './Dashboard.module.css';
import BasicCardInfo from '../../components/molecules/BasicCardInfo';
import MapColetas from '../../components/organism/map/index';
import { useContext, useState } from 'react';
import UsuariosContext from '../../context/usuariosContext';
import InfoHeaderCard from '../../components/molecules/InfoHeaderCards/InfoHeaderCard';

import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

function Dashboard() {
  const {
    usuarios,
    locaisColetas,
    locaisColetasNumber,
    userNumbers,
    usuarioMaxColetas,
    localTopResiduos,
  } = useContext(UsuariosContext);

  const itemsPerPage = 4;
  const itemsPerPageUsuarios = 6;
  const [page, setPage] = useState(1);
  const [pageUsuarios, setPageUsuarios] = useState(1);

  let isAutenticated =
    JSON.parse(localStorage.getItem('isAutenticated')) || false;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageUsuarios = (event, newPageUsuarios) => {
    setPageUsuarios(newPageUsuarios);
  };

  const startIndexUsuarios = (pageUsuarios - 1) * itemsPerPageUsuarios;
  const endIndexUsuarios = startIndexUsuarios + itemsPerPageUsuarios;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className={styled.bodygeral}>
      <div className={styled.containerBox}>
        <div className={styled.sidebar}>
          <h3>Lista de Usuarios</h3>
          <Stack spacing={2}>
            {usuarios
              .slice(startIndexUsuarios, endIndexUsuarios)
              .map((usuarios, index) => (
                <BasicCardInfo
                  dadoTitulo={usuarios.nomeusuario}
                  dado2={usuarios.email}
                  dado3={usuarios.cidade}
                  key={index}
                />
              ))}
          </Stack>
          <Pagination
            count={Math.ceil(usuarios.length / itemsPerPageUsuarios)}
            page={pageUsuarios}
            onChange={handleChangePageUsuarios}
            shape="rounded"
          />
        </div>
        <div className={styled.boxright}>
          <div className={styled.headerinfo}>
            <InfoHeaderCard
              numberData={userNumbers}
              infoData="Usuarios Cadastrados"
              typeClass="cardnumber"
              showButton={true}
              textButton="Ver todos os usuarios"
              linkButton="/listagem-usuarios"
              buttonDisable={!isAutenticated}
            />
            <InfoHeaderCard
              numberData={usuarioMaxColetas}
              infoData="Usuário com mais cad. locais"
              typeClass="cardtext"
            />
            <InfoHeaderCard
              numberData={locaisColetasNumber}
              infoData="Locais de coletas"
              typeClass="cardnumber"
              showButton={true}
              textButton="Ver todos os locais"
              linkButton="/listagem-coletas"
              buttonDisable={!isAutenticated}
            />
            <InfoHeaderCard
              numberData={localTopResiduos}
              infoData="Local com mais residuos aceitos"
              typeClass="cardtext"
              showButton={true}
              textButton="Cadastrar mais locais"
              linkButton="/cadastro-coletas"
              buttonDisable={!isAutenticated}
            />
          </div>
          <div className={styled.mapinfo}>
            <div className={styled.boxmap}>
              <MapColetas />
            </div>
            <div className={styled.boxmapright}>
              <h2>Locais de coletas</h2>
              <Stack spacing={2}>
                {locaisColetas
                  .slice(startIndex, endIndex)
                  .map((dadosColeta, index) => (
                    <BasicCardInfo
                      dadoTitulo={dadosColeta.nomelocal}
                      dado2={dadosColeta.descricao}
                      dado3={`${dadosColeta.rua}, ${dadosColeta.ncasa}, ${dadosColeta.bairro}, ${dadosColeta.cidade}`}
                      key={index}
                    />
                  ))}
              </Stack>
              <Pagination
                count={Math.ceil(locaisColetas.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                shape="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
