import { createContext, useEffect, useState } from 'react';

export const UsuariosContext = createContext();

export const UsuariosContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [locaisColetas, setLocaisColeta] = useState([]);
  const [userNumbers, setUserNumbers] = useState();
  const [locaisColetasNumber, setlocaisColetasNumber] = useState();
  const [usuarioMaxColetas, setUsuarioMaxColetas] = useState();
  const [localTopResiduos, setLocalTopResiduos] = useState();

  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState(null);
 

  function getUsuarios() {
    fetch('http://localhost:4000/usuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.log(error));
  }

  function getLocaisColeta() {
    fetch('http://localhost:4000/locaisColeta')
      .then((response) => response.json())
      .then((data) => setLocaisColeta(data))
      .catch((error) => console.log(error));
  }

  const getDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:3000/dashboard/');
      if (!response.ok) {
        throw new Error('Error na resposta da aPI');
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      setDashboardError(error.message);
    } finally {
      setDashboardLoading(false); 
    }
  };


  useEffect(() => {
    getUsuarios();
    getLocaisColeta();
    getDashboardData();
  }, []);

  useEffect(() => {
    setUserNumbers(usuarios.length);
  }, [usuarios]);

  useEffect(() => {
    setlocaisColetasNumber(locaisColetas.length);

    if (usuarios.length > 0) {
      let maxColetas = usuarios[0].ncoletas || 0;
      let usuarioMaxColetasLocal = usuarios[0];

      usuarios.map((usuario) => {
        if (usuario.ncoletas > maxColetas) {
          maxColetas = usuario.ncoletas;
          usuarioMaxColetasLocal = usuario.nomeusuario;
        }
      });

      setUsuarioMaxColetas(usuarioMaxColetasLocal);
    }
  }, [locaisColetas]);

  useEffect(() => {
    let topResiduos = 0;
    let localTopResiduos = '';

    locaisColetas.forEach((local) => {
      if (
        local.residuos_aceitos &&
        local.residuos_aceitos.length > topResiduos
      ) {
        topResiduos = local.residuos_aceitos.length;
        localTopResiduos = local.nomelocal;
      }
    });

    setLocalTopResiduos(localTopResiduos);
  }, [locaisColetas]);

  async function getGeocoding(coleta) {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${coleta.ncasa}+${coleta.rua},+${coleta.cidade},+SC&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Erro ao procurar endereço');
    }

    const data = await response.json();

    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      const latitud = location.lat;
      const longitud = location.lng;

      return { latitud, longitud };
    } else {
      throw new Error('Resultados não encontrados');
    }
  }

  async function cadastrarColeta(coleta) {
    try {
      const currentUser = localStorage.getItem('currentUser');
      const { latitud, longitud } = await getGeocoding(coleta);
      coleta.geocode = [latitud, longitud];

      const googleMapsLink = `https://www.google.com/maps?q=${latitud},${longitud}`;


      await fetch('http://localhost:4000/locaisColeta', {
        method: 'POST',
        body: JSON.stringify(coleta),
        headers: {
          'Content-Type': 'application/json',
          CurrentUser: currentUser,
          googleMapsLink: googleMapsLink,
        },
      });
      localStorage.setItem('cadastroColetaOk', 'true');
      getLocaisColeta();
      window.location.href = '/listagem-coletas';
      return {};
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  function deleteData(endpoint, id) {
    fetch(`http://localhost:4000/${endpoint}/` + id, {
      method: 'DELETE',
    })
      .then(() => {
        localStorage.setItem('deleteOk', 'true');
        getUsuarios();
        if (endpoint === 'usuarios') {
          window.location.href = '/listagem-usuarios';
        } else if (endpoint === 'locaisColeta') {
          window.location.href = '/listagem-coletas';
        }      })
      .catch(() => alert('Erro ao apagar usuário'));
  }

  async function editData(data, endpoint, id) {
    try {
      const response = await fetch(`http://localhost:4000/${endpoint}/` + id);
      const dados = await response.json();

      if (endpoint === 'usuarios') {
        if (data.cpf.length !== 11) {
          throw new Error('O CPF deve ter exatamente 11 caracteres.');
        }
      }

      if (endpoint === 'locaisColeta') {
        const { latitud, longitud } = await getGeocoding(data);
        data.geocode = [latitud, longitud];
      }

      await fetch(`http://localhost:4000/${endpoint}/` + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('editOk', 'true');
      getUsuarios();
      if (endpoint === 'usuarios') {
        window.location.href = '/listagem-usuarios';
      } else if (endpoint === 'locaisColeta') {
        window.location.href = '/listagem-coletas';
      }
      console.log(data);

      return {};
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  async function cadastrarUsuario(usuario) {
    try {
      // const response = await fetch('http://localhost:3000/usuario');
      // const dados = await response.json();    
      // dados.map((usuarios) => {
      //   if (usuario.cpf.length !== 11) {
      //     throw new Error('cpf falta/sobra numeros');
      //   }
      //   if (usuarios.cpf == usuario.cpf) {
      //     throw new Error('cpf já existe');
      //   }
      // });

      const enderecoCompleto = `${usuario.rua}, ${usuario.bairro}, ${usuario.cidade}, ${usuario.estado}`;
      usuario.endereco = enderecoCompleto;

      delete usuario.rua;
      delete usuario.bairro;
      delete usuario.cidade;
      delete usuario.estado;

      usuario.ncoletas = 0;

      await fetch('http://localhost:4000/usuario', {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('signInOk', 'true');
      getUsuarios();
      window.location.href = '/login';
      return {};
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  async function login(email, senha) {
    try {
      // const response = await fetch('http://localhost:3000/usuarios');
      // const dados = await response.json();
      // let usuarioExist = false;
      
      const data = {email, senha}

      const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

      const result = await response.json();


      if (!response.ok) {
        throw new Error('Falha no login. Verifique suas credenciais.');
      }

      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('currentUser', "led"); 
        window.location.href = '/';
      } else {
        throw new Error('Token não recebido. Verifique o servidor.');
      }

      

      // antiga validação de usuario do front
      // dados.map((usuarios) => {
      //   if (usuarios.email == email) {
      //     usuarioExist = true;
      //     if (usuarios.senha == senha) {
      //       localStorage.setItem('isAutenticated', true);
      //       localStorage.setItem('currentUser', usuarios.nomeusuario);
      //       window.location.href = '/';
      //       return;
      //     }
      //     throw new Error('Senha incorreta');
      //   }
      // });

      // if (!usuarioExist) {
      //   throw new Error('Usuário não existe');
      // }
      return result;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
  
  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        locaisColetas,
        locaisColetasNumber,
        userNumbers,
        usuarioMaxColetas,
        localTopResiduos,
        dashboardData,
        dashboardLoading,
        dashboardError,
        login,
        cadastrarUsuario,
        getUsuarios,
        getLocaisColeta,
        cadastrarColeta,
        deleteData,
        editData,
        getGeocoding,
        getDashboardData
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export default UsuariosContext;
