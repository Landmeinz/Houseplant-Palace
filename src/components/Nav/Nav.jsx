import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// import './Nav.css';

// --- MUI --- // 
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import OpacityIcon from '@mui/icons-material/Opacity';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AppsIcon from '@mui/icons-material/Apps';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


function Nav() {

  const user = useSelector((store) => store.user);

  const sxNavContent = {
    border: '1px solid purple',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    // mx: 'auto',
    position: 'fixed',
    width: 355,
    height: 55,
    bottom: 10,
    // borderRadius: 0,
    background: 'white',
    pt: 1,

  }; // sxNavContent



  const handleClick = (pageDirection) => {
    console.log('clicked on a Nav icon');
  }; // handleClick



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
              <FormatListBulletedIcon fontSize="large"/>
            </Link>

            <Link className="navLink" to="/collection">
              <AppsIcon fontSize="large"/>
            </Link>

            <Link className="navLink" to="/add_plant">
              <AddBoxIcon fontSize="large"/>
            </Link>

            <Link className="navLink" to="/user_profile">
              <AccountBoxIcon fontSize="large"/>
            </Link>

            {/* <BottomNavigation sx={{ width: 500 }} >
              <BottomNavigationAction
                label="Dashbaord"
                onClick={() => handleClick('/dashboard')}
                icon={<OpacityIcon />}
            
              />
              <BottomNavigationAction
                label="Collection"
                value="collection"
                icon={<OpacityIcon />}
              />
              <BottomNavigationAction
                label="Add Plant"
                value="add_plant"
                icon={<OpacityIcon />}
              />
              <BottomNavigationAction
                label="User Profile"
                value="user_profile"
                icon={<OpacityIcon />}
              />
            </BottomNavigation> */}

          </>
        )}

      </Box>

    </div>
  );
}

export default Nav;
