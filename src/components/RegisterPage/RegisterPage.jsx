import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

// --- MUI --- // 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';



const sxLoginPageContainer = {
  // border: '1px solid red',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  mx: 'auto',

}; // sxLoginPageContainer

// Header Text
const sxHeader = {
  fontSize: 36,
  fontWeight: 700,
  py: 2,
  textAlign: 'center',
  width: 355,

}; // sxHeader

// PHOTO to control the image size, border radius, ect.
const sxPhotoBox = {
  // border: '1px solid black',
  boxShadow: 2,
  height: 180,
  width: 180,
  borderRadius: '50%',
  mx: 'auto',
  mt: 2,
  p: 1,

}; // sxPhotoBox

const sxUserLogin = {
  border: 1,
  borderColor: 'secondary.main',
  color: 'info.main',
  boxShadow: 1,
  mt: 2,
  width: '90%',
}; // sxRegisterUser



function RegisterPage() {
  const history = useHistory();

  return (
    <Box sx={sxLoginPageContainer}>

      <Typography sx={sxHeader} color="info.main"><span>Houseplant Palace</span></Typography>

      <CardMedia sx={sxPhotoBox} component="img" image="HP_logo.png" />

      <RegisterForm />

      {/* navigate to Login page */}
      <center>
        <Button sx={sxUserLogin}
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Tap here to Login with your username
        </Button>
      </center>
    </Box>
  );
}

export default RegisterPage;
