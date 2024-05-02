import { createContext, useEffect, useState } from 'react';

export const UsuariosContext = createContext();

export const UsuariosContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [locaisColetas, setLocaisColeta] = useState([]);
  const [userNumbers, setUserNumbers] = useState()
  const [locaisColetasNumber, setlocaisColetasNumber ] = useState()
  const [usuarioMaxColetas, setUsuarioMaxColetas] = useState()
  const [cidadeMaxColetas, setCidadeMaxColetas] = useState()

    

  function getUsuarios() {
    fetch('http://localhost:3000/usuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.log(error));
  }
  
  function getLocaisColeta() {
    fetch('http://localhost:3000/locaisColeta')
      .then((response) => response.json())
      .then((data) => setLocaisColeta(data))
      .catch((error) => console.log(error))
  }



  useEffect(() => {
    getUsuarios();
    getLocaisColeta() 
  }, []);


  useEffect(() => {
    setUserNumbers(usuarios.length);
  }, [usuarios]);

  useEffect(() => {
    setlocaisColetasNumber(locaisColetas.length);
  
    if (usuarios.length > 0) {
      let maxColetas = usuarios[0].ncoletas || 0;
      let usuarioMaxColetasLocal = usuarios[0]; 
  
      usuarios.map(usuario => {
        if (usuario.ncoletas > maxColetas) {
          maxColetas = usuario.ncoletas;
          usuarioMaxColetasLocal = usuario.nomeusuario; 
        }
      });
  
      setUsuarioMaxColetas(usuarioMaxColetasLocal); 
    }
  }, [usuarios]);

console.log(usuarioMaxColetas, ' usuario con mas coletas')


// useEffect(() => {

//    if (locaisColetas.length > 0) {
//     let maxColetas = locaisColetas[0].ncoletas || 0;
//     let cidadeMaxColetas = usuarios[0]; 

//     usuarios.map(usuario => {
//       if (usuario.ncoletas > maxColetas) {
//         maxColetas = usuario.ncoletas;
//         cidadeMaxColetas = usuario.nomeusuario; 
//       }
//     });

//     setUsuarioMaxColetas(usuarioMaxColetasLocal); 
//   }

// }, [locaisColetas]);


  async function cadastrarUsuario(usuario) {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const dados = await response.json();
      dados.map((usuarios) => {
        if (usuario.cpf.length !== 11) {
          throw new Error('cpf falta/sobra numeros');
        }
        if (usuarios.cpf == usuario.cpf) {
          throw new Error('cpf já existe');
        }
      });
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('usuario cadastrado com sucesso');
      getUsuarios();
      window.location.reload();
      return {};
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  async function login(email, senha) {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const dados = await response.json();
      let usuarioExist = false;

      dados.map((usuarios) => {
        if (usuarios.email == email) {
          usuarioExist = true;
          if (usuarios.senha == senha) {
            localStorage.setItem('isAutenticated', true);
            localStorage.setItem('currentUser', usuarios.nomeusuario)
            window.location.href = '/dashboard';
            return;
          }
          throw new Error('Senha incorreta');
        }
      });

      if (!usuarioExist) {
        throw new Error('Usuário não existe');
      }
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  return (
    <UsuariosContext.Provider
      value={{ usuarios, locaisColetas, locaisColetasNumber, userNumbers, usuarioMaxColetas, login, cadastrarUsuario, getUsuarios,  getLocaisColeta}}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export default UsuariosContext;
