import * as React from 'react';
import Styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppBar, Toolbar } from '@mui/material';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Cbutton from '../../atoms/Cbutton/Cbutton';




function Header() {
 
  const currentUser = localStorage.getItem('currentUser');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAutenticated');
    localStorage.removeItem('currentUser');
    window.location.href= '/login'
  }

  return (
    <AppBar component="nav" position="static" className={Styles.headercontainer}>
      <div className={Styles.headerprimari}>
      <div className={Styles.boxback}>
        <Link to="/dashboard" className={Styles.title}>
          Recicla365
        </Link>
      </div>
      <div className={Styles.boxbutton}>
        <Cbutton
        className={Styles.custombutton}
          id="fade-button"
          showIcon={true}
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Oi, <b>{currentUser}</b>
        </Cbutton>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() =>window.location.href= '/cadastro-usuarios'}>Adicionar Usuarios</MenuItem>
          <MenuItem onClick={() => window.location.href= '/cadastro-coletas'}>Adicionar locais de coleta</MenuItem>
          <MenuItem onClick={() => handleLogout()}>Sair</MenuItem>
        </Menu>
      </div>
      </div>
    </AppBar>
  );
}

export default Header;
