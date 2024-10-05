import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import UsuariosContext from '../../../context/usuariosContext';
import Styles from './map.module.css'; 


export default function MapColetas() {
  const { locaisColetas } = useContext(UsuariosContext);

  const locais = locaisColetas.map((coleta, index) => ({
    id: index,
    geocode: coleta.geocode,
    nomeLocal: coleta.nomelocal,
    descricao: coleta.descricao,
    rua: coleta.rua,
    ncasa: coleta.ncasa,
    bairro: coleta.bairro,
    residuos_aceitos: coleta.residuos_aceitos,
  }));

  return (
    <div style={{ height: '500px' }}>
      <MapContainer center={[-27.5969, -48.5495]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         {locais.map((local, index) => (
          <Marker key={index} position={local.geocode}>
            <Popup>
              <div className={Styles.popupcontent}>
                <div className={Styles.popupheader}>
                  <h3>{local.nomeLocal}</h3>
                </div>
                <div className={Styles.popupbody}>
                <p>{`${local.rua}, ${local.ncasa}`}</p>
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