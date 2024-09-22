import * as React from 'react';
import Styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import ProfileDropdown from '../Profile-dropdown';
import Cbutton from '../../atoms/Cbutton/Cbutton';
import ButtonLoginRegister from '../../atoms/ButtonLoginRegister';

function Header() {

  let isAutenticated = JSON.parse(localStorage.getItem("isAutenticated")) || false;

  return (
    <AppBar
      component="nav"
      position="static"
      className={Styles.headercontainer}
    >
      <div className={Styles.headerprimari}>
        <div className={Styles.boxback}>
          <Link to="/" className={Styles.title}>
            RecycleMap
          </Link>
          <div></div>
        </div>
          <div>
          {isAutenticated ? (
            <ProfileDropdown />
          ) : (
            <ButtonLoginRegister />
          )}
          </div>
      </div>
    </AppBar>
  );
}

export default Header;
