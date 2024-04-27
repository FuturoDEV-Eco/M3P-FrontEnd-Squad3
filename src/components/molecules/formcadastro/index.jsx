import { TextField } from '@mui/material';
import styled from './formCadastro.module.css';
import Cbutton from '../../atoms/Cbutton/Cbutton.jsx';
import Divider from '@mui/material/Divider';
import useFetch from '../../../hooks/useFetch.jsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function FormCadastro() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { nome: '', email: '' } });

  const handleCep = async () => {
    const cep = getValues('cep');

    if (!!cep) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((dados) => {
          setValue('bairro', dados.bairro);
          setValue('rua', dados.logradouro);
          setValue('cidade', dados.localidade);
          setValue('estado', dados.uf);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <div className={styled.boxlogin}>
        <form className={styled.boxform}>
          <div className={styled.inputsbetween}>
            <TextField
              // helperText="error"
              name="nome"
              label="Nome"
              variant="outlined"
              size="small"
              type="Text"
              placeholder="Digite o seu nome"
              sx={{
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
              }}
              {...register('nome')}
            ></TextField>
            <TextField
              // helperText="error"
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
              {...register('sexo')}
            ></TextField>
          </div>
          <div className={styled.inputsbetween}>
            <TextField
              helperText="error"
              name="cpf"
              label="CPF"
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
              helperText="Data de Nacsimento"
              variant="outlined"
              name="ndata"
              size="small"
              type="date"
              placeholder="Datada de nascimento"
              {...register('ndata')}
            ></TextField>
          </div>
          <TextField
            // helperText="error"
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
            {...register('email')}
          ></TextField>
          <TextField
            // helperText="error"
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
              helperText={errors?.cep}
              label="CEP"
              name="cep"
              variant="outlined"
              size="small"
              type="text"
              onBlur={() => handleCep()}
              placeholder="Digite seu CEP"
              sx={{
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
              }}
            ></TextField>
            <TextField
              // helperText="error"
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
              // helperText="error"
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
            // helperText="error"
            disabled
            label="Bairro"
            name="bairro"
            // value={dados.bairro}
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
              // helperText="error"
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
              // helperText="error"
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
              {...register('ncasa')}
            ></TextField>
          </div>
          <div className={styled.boxbuttons}>
            <Cbutton type="submit">Cadastrar</Cbutton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCadastro;
