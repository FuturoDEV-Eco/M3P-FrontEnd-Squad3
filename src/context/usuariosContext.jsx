
import { createContext, useEffect, useState } from "react";


export const UsuariosContext = createContext()


export const UsuariosContextProvider = ({children}) => {
    const [usuarios, setUsuarios] = useState([])


    function getUsuarios(){
        fetch("http://localhost:3000/usuarios")
        .then((response) => response.json())
        .then((data) => setUsuarios(data))
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getUsuarios()
    }, [])


    function cadastrarUsuario(usuario){
        if(usuario.nome == "") {
            alert("o usuario precisa ter um nome")
        }

        setUsuarios([...usuario, usuario])

    }
    
    return (
        <UsuariosContext.Provider value={{usuarios, cadastrarUsuario}}>
            {children}
        </UsuariosContext.Provider>
    )
}