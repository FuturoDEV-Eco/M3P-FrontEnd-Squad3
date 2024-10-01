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

  const { cadastrarColeta, editData } = useContext(UsuariosContext);

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
    console.log(formColetaValue);
    const cadastroResult = await cadastrarColeta(formColetaValue);
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
                gap: '16px', // Espaço entre os campos
                marginBottom: '24px', // Margem inferior do form
              }}
            >
              {/* Campo Latitude */}
              <TextField
                {...register('latitude')}
                helperText={errors.latitude?.message}
                name="latitude"
                defaultValue={isEditing ? userData.latitude : ''}
                variant="outlined"
                size="small"
                type="number"
                placeholder="Digite a latitude (Opcional)"
                fullWidth
                sx={{ flex: 1 }} // Ocupa 50% do container
              />

              {/* Campo Longitude */}
              <TextField
                {...register('longitude')}
                helperText={errors.longitude?.message}
                name="longitude"
                defaultValue={isEditing ? userData.longitude : ''}
                variant="outlined"
                size="small"
                type="number"
                placeholder="Digite a longitude(Opcional)"
                fullWidth
                sx={{ flex: 1 }} // Ocupa 50% do container
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
                marginTop:'5%',
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
                marginTop:'5%',
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
                marginTop:'5%',
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
              type="text"
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLocaisCadastro;
