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
      width: '75%',
      height: 65,
      border: '.25px solid primary',
      boxShadow: 2,
      // backgroundColor: 'red',
      color: 'white',
      borderRadius: 3,
      fontSize: 22,
    }; // sxButton

  return (
    <Button sx={sxButton} variant="contained" color="error"
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
