import styled from './formLocaisCadastro.module.css';
import Cbutton from '../../atoms/Cbutton/Cbutton.jsx';
import Divider from '@mui/material/Divider';
import { useForm } from 'react-hook-form';
import UsuariosContext from '../../../context/usuariosContext.jsx';

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

import { useContext, useEffect, useState } from 'react';

import { TextField, InputLabel } from '@mui/material';

function FormLocaisCadastro({ userData, endpoint, dataid, isEditing }) {
  const currentUser = localStorage.getItem('currentUser');
  const [googleMapsLink, setGoogleMapsLink] = useState('');


  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    identiuser: '',
  });

  const { cadastrarColeta, editData, getGeocoding } = useContext(UsuariosContext);

  useEffect(() => {
    if (isEditing) {
      reset({
        bairro: userData.bairro,
        rua: userData.rua,
        cidade: userData.cidade,
        estado: userData.estado,
        identiuser: userData.identiuser,
      });
    } else {
      reset({
        identiuser: currentUser,
      });
    }
  }, [isEditing, reset, userData]);



  async function submitForm(formValue) {
    console.log('FORM value IS:');
    console.log(formValue);

    if (isEditing == false) {
      await saveForm(formValue);
    } else {
      await editForm(formValue);
    }
  }

  useEffect(() => {
    register('residuos_aceitos', {
      required: 'Precisa seleccionar min 1 tipo de residuo',
    });
  }, [register]);



  async function saveForm(formColetaValue) {
    try {
      const latitude = getValues('geocode[1]');
      const longitude = getValues('geocode[0]');
      
      const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  
      formColetaValue.googleMapsLink = googleMapsLink;
  
      console.log(formColetaValue);
      const cadastroResult = await cadastrarColeta(formColetaValue);
    } catch (error) {
      console.log('Error saving form:', error);
    }
  }

  async function editForm(formValue) {
    const cadastroResult = await editData(formValue, endpoint, dataid);
  }

  const capitalizeWords = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleCapitalize = (e) => {
    const newValue = capitalizeWords(e.target.value);
    e.target.value = newValue;
  };

  const handleCep = async () => {
    const cep = getValues('cep');

    if (cep.length !== 8) {
      setError('cep', {
        type: 'custom',
        message: 'O CEP deve conter 8 digitos',
      });
      return;
    }
  
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await response.json();
      
      if (dados.erro) {
        setError('cep', {
          type: 'custom',
          message: 'Digite um CEP valido',
        });
        return;
      }
      
      setValue('bairro', dados.bairro);
      setValue('rua', dados.logradouro);
      setValue('cidade', dados.localidade);
      setValue('estado', dados.uf);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleLatitudeLongitude = async () => {
    try {
      const ncasa = getValues('ncasa');
      const rua = getValues('rua');
      const cidade = getValues('cidade');
    
      const coleta = { ncasa, rua, cidade };
      const { latitud, longitud } = await getGeocoding(coleta);
  
      setValue('geocode[1]', latitud);
      setValue('geocode[0]', longitud);
      const googleMapsLink = await getGoogleMapsLink()
      console.log(googleMapsLink)
    } catch (error) {
      console.log('Erro em obter latitude y longitude:', error);
    }
  };


  const getGoogleMapsLink = async () => {
    try {
      const latitude = getValues('geocode[1]');
      const longitude = getValues('geocode[0]');
  
      if (!latitude || !longitude) {
        const error = new Error("Incomplete location data");
        error.statusCode = 400;
        throw error;
      }
  
      const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
      setGoogleMapsLink(link)
      return link;
    } catch (error) {
      console.error("Error in getGoogleMapsLink:", error.message);
      error.statusCode = error.statusCode || 500;
      throw error;
    }
  }

  const verifyLinkButton = async () => {
    try {
      const googleMapsLink = getValues('googleMapsLink'); 
      if (googleMapsLink) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error verifying Google Maps link:", error);
      return false;
    }
  };
  

  
  return (
    <div className={styled.container}>
      <div className={styled.boxcontainer}>
        <form className={styled.boxform} onSubmit={handleSubmit(submitForm)}>
          <InputLabel>Nome do local de coleta</InputLabel>
          <TextField
            {...register('nomelocal', {
              required: 'Este campo é obrigatorio',
              maxLength: {
                value: 50,
                message: 'Este campo aceita no máximo 50 carateres',
              },
            })}
            helperText={errors.nomelocal?.message}
            name="nomelocal"
            defaultValue={isEditing ? userData.nomelocal : ''}
            variant="outlined"
            size="small"
            type="Text"
            onBlur={handleCapitalize}
            placeholder="Digite o nome do local de coleta"
            sx={{
              '& .MuiFormHelperText-root': {
                color: 'red',
              },
              marginBottom: '24px',
            }}
          ></TextField>
          <InputLabel>Descrição do local</InputLabel>
          <TextField
            {...register('descricao', {
              required: 'Este campo é obrigatorio',
              maxLength: {
                value: 60,
                message: 'Este campo só aceita maximo 60 carateres',
              },
            })}
            helperText={errors.descricao?.message}
            variant="outlined"
            defaultValue={isEditing ? userData.descricao : ''}
            size="small"
            name="descricao"
            type="descricao"
            placeholder="Descrição do local"
            sx={{
              '& .MuiFormHelperText-root': {
                color: 'red',
              },
              marginBottom: '24px',
            }}
          ></TextField>
          <InputLabel>Responsável pelo cadastro</InputLabel>
          <TextField
            {...register('identiuser')}
            disabled
            helperText={errors.identiuser?.message}
            name="identiuser"
            variant="outlined"
            defaultValue={isEditing ? userData.identiuser : ''}
            size="small"
            placeholder={currentUser}
            type="text"
            sx={{
              '& .MuiFormHelperText-root': {
                color: 'red',
              },
              marginBottom: '24px',
            }}
          ></TextField>
          <div className={styled.outerBox}>
            <div>
              <FormLabel component="legend">
                Tipos de residuos aceitos
              </FormLabel>
              <FormGroup sx={{ display: 'flex' }}>
                <section className={styled.checkResiduos}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Vidro"
                        value="Vidro"
                        type="checkbox"
                        {...register('residuos_aceitos')}
                        defaultChecked={
                          userData?.residuos_aceitos?.includes('Vidro') || false
                        }
                      />
                    }
                    label="Vidro"
                    sx={{ width: '123px', margin: '0', display: 'flex' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Metal"
                        value="Metal"
                        type="checkbox"
                        {...register('residuos_aceitos')}
                        defaultChecked={
                          userData?.residuos_aceitos?.includes('Metal') || false
                        }
                      />
                    }
                    label="Metal"
                    sx={{ width: '123px', margin: '0', display: 'flex' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Papel"
                        value="Papel"
                        type="checkbox"
                        {...register('residuos_aceitos')}
                        defaultChecked={
                          userData?.residuos_aceitos?.includes('Papel') || false
                        }
                      />
                    }
                    label="Papel"
                    sx={{ width: '123px', margin: '0', display: 'flex' }}
                  />
                   <FormControlLabel
                    control={
                      <Checkbox
                        name="Papelão"
                        value="Papelão"
                        type="checkbox"
                        {...register('residuos_aceitos')}
                        defaultChecked={
                          userData?.residuos_aceitos?.includes('Papelão') || false
                        }
                      />
                    }
                    label="Papelão"
                    sx={{ width: '123px', margin: '0', display: 'flex' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Plástico"
                        type="checkbox"
                        value="Plástico"
                        {...register('residuos_aceitos')}
                        defaultChecked={
                          userData?.residuos_aceitos?.includes('Plástico') ||
                          false
                        }
                      />
                    }
                    label="Plástico"
                    sx={{ width: '123px', margin: '0', display: 'flex' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Orgânicos"
                        type="checkbox"
                        value="Orgânicos"
                        {...register('residuos_aceitos')}
                        defaultChecked={
                          userData?.residuos_aceitos?.includes('Orgânicos') ||
                          false
                        }
                      />
                    }
                    label="Orgânicos"
                    sx={{ width: '123px', margin: '0', display: 'flex' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Baterias"
                        type="checkbox"
                        value="Baterias"
                        {...register('residuos_aceitos')}
                        defaultChecked={
                          userData?.residuos_aceitos?.includes('Baterias') ||
                          false
                        }
                      />
                    }
                    label="Baterias"
                    sx={{ width: '123px', margin: '0', display: 'flex' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Eletrônicos"
                        type="checkbox"
                        value="Eletrônicos"
                        {...register('residuos_aceitos')}
                        defaultChecked={
                          userData?.residuos_aceitos?.includes('Eletrônicos') ||
                          false
                        }
                      />
                    }
                    label="Eletrônicos"
                    sx={{ width: '123px', margin: '0', display: 'flex' }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Móveis"
                        type="checkbox"
                        value="Móveis"
                        {...register('residuos_aceitos')}
                        defaultChecked={
                          userData?.residuos_aceitos?.includes('Móveis') ||
                          false
                        }
                      />
                    }
                    label="Móveis"
                    sx={{ width: '123px', margin: '0', display: 'flex' }}
                  />
                </section>
                <div></div>
              </FormGroup>
              {errors.residuos_aceitos && (
                <FormHelperText errors style={{ color: 'red' }}>
                  {errors.residuos_aceitos?.message}
                </FormHelperText>
              )}{' '}
            </div>

            <Divider sx={{ marginY: '30px' }}>
              Endereço do local de coleta
            </Divider>

            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px', 
              }}
            >
              {/* Campo Latitude */}
              <TextField
                {...register('geocode[0]')}
                name="longitude"
                disabled={true}
                defaultValue={isEditing ? userData.geocode[0] : ''}
                variant="outlined"
                size="small"
                type="number"
                placeholder="longitude"
                fullWidth
                sx={{ flex: 1 }}
              />
              {/* Campo Longitude */}
              <TextField
                {...register('geocode[1]')}
                name="latitude"
                disabled={true}
                defaultValue={isEditing ? userData.geocode[1] : ''}
                variant="outlined"
                size="small"
                type="number"
                placeholder="latitude"
                fullWidth
                sx={{ flex: 1 }} 
              />
            </Box>
            <TextField
              {...register('cep', {
                required: 'Este campo é obrigatorio',
                maxLength: {
                  value: 8,
                  message: 'Este campo aceita no máximo 8 carateres',
                },
              })}
              helperText={errors.cep?.message}
              label="CEP"
              name="cep"
              variant="outlined"
              defaultValue={isEditing ? userData.cep : ''}
              size="small"
              type="number"
              onBlur={() => handleCep()}
              placeholder="Digite seu CEP"
              sx={{
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
              }}
            ></TextField>
            <TextField
              disabled
              label=""
              name="cidade"
              defaultValue={isEditing ? userData.cidade : ''}
              variant="outlined"
              size="small"
              type="text"
              placeholder="Cidade"
              sx={{
                marginLeft: '1%',
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
              }}
              {...register('cidade')}
            ></TextField>
            <TextField
              disabled
              label=""
              name="estado"
              variant="outlined"
              defaultValue={isEditing ? userData.estado : ''}
              size="small"
              type="text"
              placeholder="UF"
              sx={{
                marginLeft: '1%',
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
                width: 70,
              }}
              {...register('estado')}
            ></TextField>
          </div>
          <TextField
            disabled
            label=""
            name="bairro"
            variant="outlined"
            defaultValue={isEditing ? userData.bairro : ''}
            size="small"
            type="text"
            placeholder="Bairro"
            sx={{
              '& .MuiFormHelperText-root': {
                color: 'red',
              },
            }}
            {...register('bairro')}
          ></TextField>
          <div className={styled.inputsbetween}>
            <TextField
              label=""
              disabled
              name="rua"
              variant="outlined"
              defaultValue={isEditing ? userData.rua : ''}
              size="small"
              type="text"
              sx={{
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
                width: 350,
              }}
              {...register('rua')}
            ></TextField>
            <TextField
              {...register('ncasa', {
                required: 'Este campo é obrigatorio',
              })}
              helperText={errors.ncasa?.message}
              label="Número"
              name="ncasa"
              variant="outlined"
              size="small"
              defaultValue={isEditing ? userData.ncasa : ''}
              type="number"
              onBlur={() => handleLatitudeLongitude()}
              sx={{
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
                width: 100,
              }}
            ></TextField>
          </div>
          <div className={styled.boxbuttons}>
            <Cbutton type="submit">Salvar</Cbutton>
            <div className={styled.linkBoxButtons}>
              <div className={styled.boxbuttons}>
                <Cbutton type="button" disabled={!googleMapsLink} onClick={() => navigator.clipboard.writeText(googleMapsLink).then(() => alert('Link copiado para a área de transferência!'))}>Copiar Link</Cbutton>
              </div>
              <div className={styled.boxbuttons}>
                <Cbutton type="button" disabled={!googleMapsLink} onClick={() => window.open(googleMapsLink, '_blank')}>Abrir no Google Maps</Cbutton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLocaisCadastro;
