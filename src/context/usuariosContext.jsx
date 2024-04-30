import { createContext, useEffect, useState } from 'react';

export const UsuariosContext = createContext();

export const UsuariosContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);

  function getUsuarios() {
    fetch('http://localhost:3000/usuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUsuarios();
  }, []);


  async function cadastrarUsuario(usuario) {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const dados = await response.json();
      dados.map((usuarios) => {
        if (usuario.cpf.length !== 11) {
          throw new Error('cpf falta/sobra numeros')
        }
        if (usuarios.cpf == usuario.cpf) {
          throw new Error('cpf já existe');
        }
      });
      await fetch('http://localhost:3000/usuarios',
        {
          method: 'POST',
          body: JSON.stringify(usuario),
          headers: {
            'Content-Type': 'application/json',
          },
        });

      alert('usuario cadastrado com sucesso');
      getUsuarios();
      window.location.reload()
      return {}
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
      value={{ usuarios, login, cadastrarUsuario, getUsuarios }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export default UsuariosContext;
