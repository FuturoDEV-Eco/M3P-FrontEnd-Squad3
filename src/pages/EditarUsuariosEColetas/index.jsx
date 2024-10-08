import { useParams } from 'react-router-dom';
import FormUserCadastro from '../../components/organism/formUsercadastro';
import { useContext, useEffect, useState } from 'react';
import Styles from './EditarUsuariosEColetas.module.css';
import FormLocaisCadastro from '../../components/organism/formLocaisCadastro';

function EditarUsuariosEColetas() {
  const { endpoint, dataid } = useParams();

  const [userData, setUserData] = useState(null);

 useEffect(() => {
  async function fetchData() {
    const token = localStorage.getItem('token');

    const response = await fetch(
      `http://localhost:3000/${endpoint}/${dataid}`, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  
        },
      }
    );

    const userData = await response.json();
    if (userData && userData.ndata) {
      userData.ndata = userData.ndata.split('/').reverse().join('-');
    }
    setUserData(userData);
  }
  
  fetchData();
}, [endpoint, dataid]);

  return (
    <div className={Styles.container}>
      {userData ? (
        <>
          <h1>
            {endpoint === 'usuarios'
              ? 'Editar usuarios'
              : 'Editar local de coletas'}
          </h1>
          {endpoint === 'usuarios' ? (
            <FormUserCadastro
              className={Styles.boxform}
              endpoint={endpoint}
              dataid={dataid}
              userData={userData}
              isEditing={true}
            />
          ) : (
            <FormLocaisCadastro
              className={Styles.boxform}
              endpoint={endpoint}
              dataid={dataid}
              userData={userData}
              isEditing={true}
            />
          )}
        </>
      ) : (
        <p>Carregando informações...</p>
      )}
    </div>
  );
}

export default EditarUsuariosEColetas;
