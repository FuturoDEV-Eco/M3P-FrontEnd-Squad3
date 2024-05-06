import { TextField } from '@mui/material';
import styled from './formCadastro.module.css';
import Cbutton from '../../atoms/Cbutton/Cbutton.jsx';
import Divider from '@mui/material/Divider';
import useFetch from '../../../hooks/useFetch.jsx';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UsuariosContext from '../../../context/usuariosContext.jsx';

function FormUserCadastro() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { nomeusuario: '', email: ''} });

  const { cadastrarUsuario } = useContext(UsuariosContext);


  async function saveForm(formValue) {
    const cadastroResult = await cadastrarUsuario(formValue);

    if (cadastroResult.error) {
      if (cadastroResult.error.message === 'cpf já existe') {
        setError('cpf', {
          type: 'custom',
          message: 'Este CPF já está registrado',
        });
      } else if (cadastroResult.error.message === 'cpf falta/sobra numeros'){
        setError('cpf', {
          type: 'custom',
          message: 'Seu CPF deve conter 11 digitos',
        });
      }
      } else {
        console.log(cadastroResult.error.message);
    }
  }

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
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
    } else if (!!cep) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((dados) => {
          if (dados.erro) {
            setError('cep', {
              type: 'custom',
              message: 'Digite um CEP valido',
            })
          } else {
            setValue('bairro', dados.bairro);
            setValue('rua', dados.logradouro);
            setValue('cidade', dados.localidade);
            setValue('estado', dados.uf);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <div className={styled.boxlogin}>
        <form className={styled.boxform} onSubmit={handleSubmit(saveForm)}>
          <div className={styled.inputsbetween}>
            <TextField
              {...register('nomeusuario', {
                required: 'Este campo é obrigatorio',
                maxLength: {
                  value: 50,
                  message: 'Este campo aceita no máximo 50 carateres',
                },
              })}
              helperText={errors.nomeusuario?.message}
              name="nomeusuario"
              label="Nome"
              variant="outlined"
              size="small"
              type="Text"
              onBlur={handleCapitalize}
              placeholder="Digite o seu nome"
              sx={{
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
              }}
            ></TextField>
            <TextField
              {...register('sexo', {
                required: false,
                maxLength: {
                  value: 50,
                  message: 'Este campo aceita no máximo 8 carateres',
                },
              })}
              helperText={errors.sexo?.message}
              label="Sexo"
              name="sexo"
              variant="outlined"
              size="small"
              type="text"
              placeholder="Digite seu sexo"
              sx={{
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
              }}
            ></TextField>
          </div>
          <div className={styled.inputsbetween}>
            <TextField
              {...register('cpf', {
                required: 'Este campo é obrigatorio',
                maxLength: {
                  value: 11,
                  message: 'Quantiade de digitos incorreta',
                },
              })}
              helperText={errors.cpf?.message}
              name="cpf"
              label="CPF (somente numeros)"
              variant="outlined"
              size="small"
              type="number"
              placeholder="Digite seu CPF"
              sx={{
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
              }}
              {...register('cpf')}
            ></TextField>
            <TextField
              {...register('ndata', { required: 'Este campo é obrigatorio' })}
              helperText={errors.ndata?.message || 'Data de Nascimento'}
              variant="outlined"
              name="ndata"
              size="small"
              type="date"
              placeholder="Data de nascimento"
              sx={{
                '& .MuiFormHelperText-root': {
                  color: errors.ndata ? 'red' : 'initial',
                },
              }}
            ></TextField>
          </div>
          <TextField
            {...register('email', {
              required: 'Este campo é obrigatorio',
              maxLength: {
                value: 60,
                message: 'Este campo só aceita maximo 60 carateres',
              },
            })}
            helperText={errors.email?.message}
            label="E-mail"
            variant="outlined"
            size="small"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            sx={{
              '& .MuiFormHelperText-root': {
                color: 'red',
              },
            }}
          ></TextField>
          <TextField
            {...register('senha', {
              required: 'Este campo é obrigatorio',
              maxLength: {
                value: 11,
                message: 'Quantiade de digitos incorreta',
              },
            })}
            helperText={errors.senha?.message}
            label="Senha"
            name="senha"
            variant="outlined"
            size="small"
            type="password"
            placeholder="Cadastre sua senha"
            sx={{
              '& .MuiFormHelperText-root': {
                color: 'red',
              },
            }}
            {...register('senha')}
          ></TextField>
          <Divider>Endereço</Divider>
          <div className={styled.inputsbetween}>
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
              defaultValue="Cidade"
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
              size="small"
              defaultValue="UF"
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
            size="small"
            defaultValue="bairro"
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
              defaultValue="Nome da rua"
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
            <Cbutton type="submit" >Cadastrar</Cbutton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormUserCadastro;
