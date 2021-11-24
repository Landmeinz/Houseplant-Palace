import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';


function LogOutButton(props) {

  const dispatch = useDispatch();

    // BUTTON CONTAINER
    const sxButtonBox = {
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center',
      // fontWeight: 500,
      // lineHeight: 2,
      // width: 200,
      // height: '100%',
    }; // sxButton
  
  
    // BUTTON // 
    const sxButton = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 700,
      lineHeight: 2,
      width: '90%',
      height: 75,
      border: '.25px solid primary',
      mt: '100%',
      boxShadow: 2,
      bgcolor: 'red',
      color: 'white',
      borderRadius: 3,
    }; // sxButton

  return (
    <Button sx={sxButton}
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
