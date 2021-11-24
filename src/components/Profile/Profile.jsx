
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LogOutButton from '../LogOutButton/LogOutButton';

// --- MUI --- // 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Profile(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState('Functional Component');

  const sxProfileContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }; // sxProfileContainer

  // HEADER BOX // 
  const sxHeaderBox = {
    // border: '1px solid blue',
    position: 'sticky',
    top: 0,
    background: 'white',
    zIndex: 50,
    mx: 'auto',
    width: 355,
    mb: 2,

  }; // sxDateBox


  // Header Text
  const sxHeader = {
    fontSize: 22,
    fontWeight: 500,
    py: 2,
    textAlign: 'center',
    borderBottom: '2px solid lightgray',
    width: 355,

  }; // sxHeader

  

  return (
    <Box sx={sxProfileContainer}>


      <Box sx={sxHeaderBox}>
        <Typography sx={sxHeader} color="primary"><>USER PROFILE</></Typography>
        <Typography sx={sxHeader} color="primary"><>Keep on growing, {user.username}</></Typography>
      </Box>
      <LogOutButton className="navLink" />

    </Box>
  );

}; // Profile

export default Profile;
