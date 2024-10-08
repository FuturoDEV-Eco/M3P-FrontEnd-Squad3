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
    const token = localStorage.getItem('token'); 

    fetch('http://localhost:3000/usuario', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
    

        setUsuarios(data.maskedUsuarios);
      })
      .catch((error) => console.log('Error fetching data:', error));
  }

  function getLocaisColeta() {
    fetch('http://localhost:3000/local')
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
    console.log('função getGeocoding', coleta);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${coleta.numero}+${coleta.logradouro},+${coleta.localidade},+SC&key=${apiKey}`
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
    const token = localStorage.getItem('token');
    try {
      const currentUser = localStorage.getItem('currentUser');
      coleta.geocode = [latitud, longitud];


      await fetch('http://localhost:3000/local', {
        method: 'POST',
        body: JSON.stringify(coleta),
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
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
    let url;
    const token = localStorage.getItem('token');
    console.log("endpoint");

    if (endpoint === 'locaisColeta') {
        url = `http://localhost:3000/local/${id}`;  
    } else if (endpoint === 'usuarios') {
        url = `http://localhost:3000/usuario/${id}`;  
    } else {
        console.error('Endpoint no válido');
        return;
    }

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
       
    })
    .then(() => {
        localStorage.setItem('deleteOk', 'true');
        getUsuarios();  
        if (endpoint === 'usuarios') {
            window.location.href = '/listagem-usuarios';
        } else if (endpoint === 'locaisColeta') {
          window.location.href = '/listagem-coletas';
        }      })
      .catch(() => alert('Erro ao apagar item'));
  }




  async function editData(data, endpoint, id) {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/${endpoint}/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });
      
      console.log("dados do editdata antes do fetch")
      const dados = await response.json();

      if (endpoint === 'usuarios') {
        if (data.cpf.length !== 11) {
          throw new Error('O CPF deve ter exatamente 11 caracteres.');
        }
      }

      if (endpoint === 'locaisColeta') {
        const { latitud, longitud } = await getGeocoding(dados);
        dados.geocode = [latitud, longitud];
      }

      console.log("data antes del fetch", data)

      await fetch(`http://localhost:3000/${endpoint}/` + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      localStorage.setItem('editOk', 'true');
      getUsuarios();

      if (endpoint === 'usuario') {
        window.location.href = '/listagem-usuarios';
      } else if (endpoint === 'local') {
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

      const enderecoCompleto = `${usuario.rua}, ${usuario.bairro}, ${usuario.cidade}, ${usuario.estado}`;
      usuario.endereco = enderecoCompleto;

      delete usuario.rua;
      delete usuario.bairro;
      delete usuario.cidade;
      delete usuario.estado;
      delete usuario.ncoletas;

      await fetch('http://localhost:3000/usuario', {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(usuario);
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
      const data = {email, senha}

      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log("result304",result)

      if (!response.ok) {
        throw new Error('Falha no login. Verifique suas credenciais.');
      }

      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('currentUserName', result.name);
        localStorage.setItem('currentUserId', result.id);
        window.location.href = '/';
      } else {
        throw new Error('Token não recebido. Verifique o servidor.');
      }

    
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
        getDashboardData,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export default UsuariosContext;
