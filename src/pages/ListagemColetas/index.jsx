import FullCardInfo from '../../components/molecules/FullCardInfo';
import { useContext } from 'react';
import UsuariosContext from '../../context/usuariosContext';
import Styles from './ListagemColetas.module.css';

function ListagemColetas() {
  const { locaisColetas } = useContext(UsuariosContext);
  
  console.log(locaisColetas)
  return (
    <div className={Styles.section}>
      <div className={Styles.cardbox}>
        <h1>Lista de locais de coleta Cadastrados</h1>
        {locaisColetas.map((coletas, index) => (
          <FullCardInfo
            dadoTitulo={coletas.nomelocal}
            dadoSubtitulo={coletas.descricao}
            dado3={{ titulo: 'Bairro:', descricao: coletas.bairro }}
            dado4={{
              titulo: 'Endereço:',
              descricao: `${coletas.rua}, ${coletas.ncasa}`,
            }}
            dado5={{ titulo: 'Por:', descricao: coletas.identiuser }}
            dado6={{ titulo: 'Cidade', descricao: coletas.cidade }}
            dado7={{ titulo: "Link de Google Maps:", descricao: coletas.googleMapsLink}}
            showColetaIcon={true}
            showResiduos={{
              titulo: 'Residuos Aceitos:',
              descricao: coletas.residuos_aceitos.join(', '),
            }}
            key={index}
            endpoint="locaisColeta"
            dataid={coletas.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ListagemColetas;
