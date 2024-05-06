import FullCardInfo from "../../components/molecules/FullCardInfo"
import { useContext } from 'react';
import UsuariosContext from '../../context/usuariosContext';
import Styles from './ListagemColetas.module.css'


function ListagemColetas() {
    
    const {
        locaisColetas,
      } = useContext(UsuariosContext);
    

    return (
        <div>
            <div className={Styles.cardbox}>
            <h1>Lista de locais de coleta Cadastrados</h1>
            {locaisColetas.map((coletas, index) => (
                    <FullCardInfo
                    dadoTitulo={coletas.nomelocal}
                    dadoSubtitulo={coletas.descricao}
                    dado3={{titulo: 'Bairro:', descricao: coletas.bairro }}
                    dado4={{titulo: 'Endereço:', descricao: `${coletas.rua}, ${coletas.ncasa}`}}
                    dado5={{titulo: 'Por:', descricao: coletas.identiuser}}
                    dado6={{titulo: 'Cidade', descricao: coletas.cidade}}
                    showColetaIcon={true}
                    showResiduos={{titulo: 'Residuos Aceitos:', descricao: coletas.residuos_aceitos.join(', ')}}
                    key={index}
                    />
                  ))}
            </div>
        </div>
    )
}

export default ListagemColetas