import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

// --- MUI --- // 
import Box from '@mui/material/Box';


function Nav() {

  const user = useSelector((store) => store.user);



  const sxNavContent = {
    border: 1,
    display: 'flex',
    justifyContent: 'center',
    mx: 'auto',
    position: 'fixed',
    width: '100%',
    height: 60,
    top: 750,

  }

  return (
    <div className="nav">

      {/* <Link to="/home">
        <h2 className="nav-title">P</h2>
      </Link> */}

      <Box sx={sxNavContent}>
    {/* If no user is logged in, show these links */}
    {user.id === null &&
      // If there's no user, show login/registration links
      <Link className="navLink" to="/login">
      Login / Register
      </Link>
    }

    {/* If a user is logged in, show these links */}
    {user.id && (
      <>
      <Link className="navLink" to="/dashboard">
      Dashboard
      </Link>

      <Link className="navLink" to="/collection">
      Collection
      </Link>

      <Link className="navLink" to="/add_plant">
      Add Plant
      </Link>

      <Link className="navLink" to="/user_profile">
      Profile
      </Link>

      <LogOutButton className="navLink" />
      </>
    )}

     

    </Box>

    </div>
  );
}

export default Nav;
