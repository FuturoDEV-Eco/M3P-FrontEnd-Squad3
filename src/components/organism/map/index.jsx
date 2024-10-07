import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import UsuariosContext from '../../../context/usuariosContext';
import Styles from './map.module.css'; 


export default function MapColetas() {
  const { locaisColetas } = useContext(UsuariosContext);

  console.log("locaisColetas map",locaisColetas)

  const locais = locaisColetas.map((coleta, index) => {
    const coordenadasArray = coleta.coordenadas
      .split(',')               
      .map(coord => parseFloat(coord.trim()));  
    
    return {
      id: coleta.id,
      coordenadas: coordenadasArray,  
      nome: coleta.nome,
      descricao: coleta.descricao,
      logradouro: coleta.logradouro,
      numero: coleta.numero,
      bairro: coleta.bairro,
      residuos_aceitos: coleta.residuos_aceitos,
    };
  });

  return (
    <div style={{ height: '500px' }}>
      <MapContainer center={[-27.5969, -48.5495]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         {locais.map((local, index) => (
          <Marker key={index} position={local.coordenadas}>
            <Popup>
              <div className={Styles.popupcontent}>
                <div className={Styles.popupheader}>
                  <h3>{local.nome}</h3>
                </div>
                <div className={Styles.popupbody}>
                <p>{`${local.logradouro}, ${local.numero}`}</p>
                <h4>Bairro:</h4><p>{local.bairro}</p>                  
                <h4>Resíduos Aceitos:</h4>
                  <ul>
                    {local.residuos_aceitos.map((residuo, idx) => (
                      <li key={idx}>{residuo}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}