
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LogOutButton from '../LogOutButton/LogOutButton';

// --- MUI --- // 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';


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
    bgcolor: 'secondary.main',
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
    width: 355,

  }; // sxHeader

  // Message Text
  const sxMessage = {
    fontSize: 22,
    fontWeight: 500,
    py: 2,
    textAlign: 'center',
    // borderBottom: '2px solid lightgray',
    width: 355,
    bgcolor: 'white',
    mb: 12,

  }; // sxMessage

  const sxPhotoBox = {
    // border: '1px solid black',
    boxShadow: 2,
    height: 220,
    width: 220,
    borderRadius: '50%',
    mx: 'auto',
    mt: 10,
    mb: 1,

  }; // sxPhotoBox

  return (
    <Box sx={sxProfileContainer}>


      <Box sx={sxHeaderBox}>
        <Typography sx={sxHeader} color="info.main"><span>USER PROFILE</span></Typography>
      </Box>
      
      <CardMedia sx={sxPhotoBox} component="img" image="HP_logo.png" />
      <Typography sx={sxMessage} color="info.main"><span>Keep on growing, {user.username}!</span></Typography>

      <LogOutButton />

    </Box>
  );

}; // Profile

export default Profile;
