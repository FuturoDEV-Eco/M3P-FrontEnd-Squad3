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
    setError,
    formState: { errors },
  } = useForm();

  const { login } = useContext(UsuariosContext);

  async function realizarLogin(formValue) {
    const loginResult = await login(formValue.email, formValue.senha);

    if (loginResult.error) {
      if (loginResult.error.message === 'Usuário não existe') {
        setError('email', {
          type: 'custom',
          message: loginResult.error.message,
        });
      } else if (loginResult.error.message === 'Senha incorreta') {
        setError('senha', {
          type: 'custom',
          message: loginResult.error.message,
        });
      } else {
        console.log(loginResult.error.message);
      }
    }
  }

  return (
    <div className={styled.boxlogin}>
      <form className={styled.boxform} onSubmit={handleSubmit(realizarLogin)}>
        <div className={styled.inputWrapper}>
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
            fullWidth
            sx={{
              '& .MuiFormHelperText-root': {
                color: 'red',
              },
            }}
          ></TextField>
        </div>
        <div className={styled.inputWrapper}>
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
            fullWidth
            sx={{
              '& .MuiFormHelperText-root': {
                color: 'red',
              },
            }}
          ></TextField>
        </div>
        <div className={styled.boxbuttons}>
          <Cbutton type="submit">Entrar</Cbutton>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
