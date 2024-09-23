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
          <InputLabel>Nome do Local de coleta</InputLabel>
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
            }}
          ></TextField>
          <InputLabel>Seu Nome</InputLabel>
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
            }}
          ></TextField>
          <div>
            <Box
              className={styled.checkResiduos}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <div></div>
              <div className={styled.checkResiduos}>
                <FormControl
                  sx={{ m: 1 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">
                    Tipos de residuos aceitos
                  </FormLabel>
                  <FormGroup>
                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Vidro"
                            value="Vidro"
                            type="checkbox"
                            {...register('residuos_aceitos')}
                            defaultChecked={
                              userData?.residuos_aceitos?.includes('Vidro') ||
                              false
                            }
                          />
                        }
                        label="Vidro"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Metal"
                            value="Metal"
                            type="checkbox"
                            {...register('residuos_aceitos')}
                            defaultChecked={
                              userData?.residuos_aceitos?.includes('Metal') ||
                              false
                            }
                          />
                        }
                        label="Metal"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Papel"
                            value="Papel"
                            type="checkbox"
                            {...register('residuos_aceitos')}
                            defaultChecked={
                              userData?.residuos_aceitos?.includes('Papel') ||
                              false
                            }
                          />
                        }
                        label="Papel"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Plástico"
                            type="checkbox"
                            value="Plástico"
                            {...register('residuos_aceitos')}
                            defaultChecked={
                              userData?.residuos_aceitos?.includes(
                                'Plástico'
                              ) || false
                            }
                          />
                        }
                        label="Plástico"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Orgânicos"
                            type="checkbox"
                            value="Orgânicos"
                            {...register('residuos_aceitos')}
                            defaultChecked={
                              userData?.residuos_aceitos?.includes(
                                'Orgânicos'
                              ) || false
                            }
                          />
                        }
                        label="Orgânicos"
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Baterias"
                            type="checkbox"
                            value="Baterias"
                            {...register('residuos_aceitos')}
                            defaultChecked={
                              userData?.residuos_aceitos?.includes(
                                'Baterias'
                              ) || false
                            }
                          />
                        }
                        label="Baterias"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Eletrônicos"
                            type="checkbox"
                            value="Eletrônicos"
                            {...register('residuos_aceitos')}
                            defaultChecked={
                              userData?.residuos_aceitos?.includes(
                                'Eletrônicos'
                              ) || false
                            }
                          />
                        }
                        label="eletrônicos"
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
                      />
                    </div>
                  </FormGroup>
                  {errors.residuos_aceitos && (
                    <FormHelperText errors style={{ color: 'red' }}>
                      {errors.residuos_aceitos?.message}
                    </FormHelperText>
                  )}{' '}
                </FormControl>
              </div>
            </Box>

            <Divider>Endereço do local de coleta</Divider>
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
              label="Cidade"
              name="cidade"
              defaultValue={isEditing ? userData.cidade : ''}
              variant="outlined"
              size="small"
              type="text"
              placeholder="Nome da rua"
              sx={{
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
              }}
              {...register('cidade')}
            ></TextField>
            <TextField
              disabled
              label="UF"
              name="estado"
              variant="outlined"
              defaultValue={isEditing ? userData.estado : ''}
              size="small"
              type="text"
              placeholder="UF"
              sx={{
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
            label="Bairro"
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
              label="Rua"
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
              label="Numero"
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
