import styled from "./InfoHeaderCard.module.css";
import Cbutton from "../../atoms/Cbutton/Cbutton";

function InfoHeaderCard({ numberData, infoData, typeClass, showButton, textButton, linkButton, buttonDisable }) {

    const handleButtonClick = () => {
        window.location.href = linkButton;
    };

    return (
        <div className={`${styled[typeClass]}`}>
            <h1>{numberData}</h1>
            <p><b>{infoData}</b></p>
            {showButton && (
                <Cbutton 
                    onClick={handleButtonClick} 
                    disabled={buttonDisable}
                    tooltip={buttonDisable ? "Precisa fazer login para acessar" : ""}
                >
                    {textButton}
                </Cbutton>
            )}
        </div>
    );
}

export default InfoHeaderCard;