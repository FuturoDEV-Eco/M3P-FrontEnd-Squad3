
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
        if(usuarios.nome == "") {
            alert("o usuario precisa ter um nome")
        }
        setUsuarios([...usuarios, usuario])
        alert("usuario cadastrado")
    }
    
    async function login(email, senha){
        try {
            const response = await fetch("http://localhost:3000/usuarios")
            const dados = await response.json()
            let usuarioExist = false

            dados.map(usuarios => {
                if(usuarios.email == email){
                    usuarioExist = true
                    if(usuarios.senha == senha){
                        localStorage.setItem('isAutenticated', true)
                        window.location.href = '/'
                        return
                    }
                    alert('Senha incorreta')
                    return
                }
            })
            if(!usuarioExist){
                alert("usuario não existe")
            }
        } catch {

        }
    }

    return (
        <UsuariosContext.Provider value={{usuarios, login, cadastrarUsuario, getUsuarios}}>
            {children}
        </UsuariosContext.Provider>
    )
}

export default UsuariosContext
