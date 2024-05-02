import { useContext } from "react";
import styled from "./InfoHeaderCard.module.css";
import UsuariosContext from "../../../context/usuariosContext";



function InfoHeaderCard({numberData, infoData, typeClass}) {

    return(
        <div className={`${styled[typeClass]}`}>
            <h1>{numberData}</h1>
            <p>{infoData}</p>
        </div>
    )
}

export default InfoHeaderCard