
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LogOutButton from '../LogOutButton/LogOutButton';

// --- MUI --- // 
import Box from '@mui/material/Box';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Profile(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState('Functional Component');

  const sxProfileContainer = {
    border: 1,
    m: 2,
    overflow: 'scroll',

  }; // sxProfileContainer

  return (
    <Box sx={sxProfileContainer}>

      <h3>Hello, {user.username}</h3>
      <LogOutButton className="navLink" />
      
    </Box>
  );

}; // Profile

export default Profile;
