import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// import './Nav.css';

// --- MUI --- // 
import Box from '@mui/material/Box';
import OpacityIcon from '@mui/icons-material/Opacity';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AppsIcon from '@mui/icons-material/Apps';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


function Nav() {

  const user = useSelector((store) => store.user);

  const sxNavContent = {
    // border: '1px solid purple',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    // mx: 'auto',
    position: 'fixed',
    width: 355,
    height: 55,
    bottom: 10,
    borderRadius: 1,
    bgcolor: 'info.main',
    pt: 1.5,

  }; // sxNavContent



  return (
    <div className="nav">

      <Box sx={sxNavContent}>

        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.id > 0 & user.access_level < 5 ? (
          <>
            <Link to="/dashboard">
              <FormatListBulletedIcon color="secondary" fontSize="large" />
            </Link>

            <Link to="/collection">
              <AppsIcon color="secondary" fontSize="large" />
            </Link>

            <Link to="/add_plant">
              <AddBoxIcon color="secondary" fontSize="large" />
            </Link>

            <Link to="/user_profile">
              <AccountBoxIcon color="secondary" fontSize="large" />
            </Link>
          </>
        ) : <></>}

        {/* If no user's access level is greater than 5 then show admin links */}
        {user.id > 0 & user.access_level >= 5 ? (
          // If there's no user, show login/registration links
          <>
            <Link to="/admin">
              <FormatListBulletedIcon color="secondary" fontSize="large" />
            </Link>

            <Link to="/user_profile">
              <AccountBoxIcon color="secondary" fontSize="large" />
            </Link>
          </>
        ) : <></>}

      </Box>

    </div>
  );
}

export default Nav;
