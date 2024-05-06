import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import UsuariosContext from '../../../context/usuariosContext';


export default function MapColetas() {
    const { locaisColetas } = useContext(UsuariosContext);


    const locais = locaisColetas.map((coleta, index) => ({
        id: index,
        geocode: coleta.geocode,
        popUp: coleta.nomelocal
    })) 

    

    return (
        <div style={{ height: "500px" }}>
        <MapContainer center={ [-27.5969, -48.5495]} zoom={10}>
            <TileLayer 
            attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locais.map((locais, index)=> 
        <Marker key={index} position={locais.geocode}> 
        <Popup><h3>{locais.popUp}</h3></Popup>
        </Marker>    
        )
            }
        </MapContainer>
        </div>
    )
}