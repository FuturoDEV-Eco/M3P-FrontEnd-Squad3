import { TextField, InputLabel } from '@mui/material';
import styled from './formLogin.module.css';
import Cbutton from '../../atoms/Cbutton/Cbutton.jsx';
import { useContext, useEffect, useState } from 'react';
import UsuariosContext from '../../../context/usuariosContext.jsx';
import { useForm } from 'react-hook-form';

function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useContext(UsuariosContext);

  async function realizarLogin(formValue) {
    await login(formValue.email, formValue.senha);
  }

  return (
    <div className={styled.boxlogin}>
      <form className={styled.boxform} onSubmit={handleSubmit(realizarLogin)}>
        <InputLabel htmlFor="name">Email</InputLabel>
        <TextField
          {...register('email', {
            required: 'Este campo é obrigatorio',
            maxLength: {
              value: 50,
              message: 'Este campo aceita no máximo 50 carateres',
            },
          })}
          helperText={errors.email?.message}
          name="email"
          variant="outlined"
          size="small"
          type="email"
          placeholder="Digite o seu email"
          sx={{
            '& .MuiFormHelperText-root': {
              color: 'red',
            },
          }}
        ></TextField>
        <InputLabel htmlFor="senha">Senha</InputLabel>
        <TextField
        {...register('senha', {
          required: 'Este campo é obrigatorio',
          maxLength: {
            value: 50,
            message: 'Este campo aceita no máximo 50 carateres',
          },
        })}
          helperText={errors.senha?.message}
          name="senha"
          id="senha"
          variant="outlined"
          size="small"
          type="password"
          placeholder="Digite sua senha"
          sx={{
            '& .MuiFormHelperText-root': {
              color: 'red',
            },
          }}
        ></TextField>
        <div className={styled.boxbuttons}>
          <Cbutton variant="outlined">Esqueceu a senha?</Cbutton>
          <Cbutton type="submit">Entrar</Cbutton>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
