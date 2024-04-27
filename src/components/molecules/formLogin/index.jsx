import { TextField, InputLabel } from '@mui/material';
import styled from './formLogin.module.css';
import Cbutton from '../../atoms/Cbutton/Cbutton.jsx';

function FormLogin() {
  return (
    <div className={styled.boxlogin}>
      <form className={styled.boxform}>
        <InputLabel htmlFor="name">Email</InputLabel>
        <TextField
          helperText="error"
          id="email"
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
          helperText="error"
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
