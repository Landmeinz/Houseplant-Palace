import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

// --- MUI --- // 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CardMedia from '@mui/material/CardMedia';

function LoginPage() {

  const history = useHistory();

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
    height: 220,
    width: 220,
    borderRadius: '50%',
    mx: 'auto',
    mt: 2,
    p: 1,

  }; // sxPhotoBox

  const sxRegisterUser = {
    border: 1,
    borderColor: 'secondary.main',
    color: 'info.main',
    boxShadow: 1,
    mt: 2,
    width: '90%',

  }; // sxRegisterUser

  return (

    <Box sx={sxLoginPageContainer}>

      <Typography sx={sxHeader} color="info.main"><span>Houseplant Palace</span></Typography>

      <CardMedia sx={sxPhotoBox} component="img" image="HP_logo.png" />

      <LoginForm />

      {/* navigate to register page */}
      <center>
        <Button sx={sxRegisterUser}
          type="button"
          className="btn btn_asLink"
          onClick={() => { history.push('/registration') }}
        > Tap here to Register a as New User
        </Button>
      </center>

    </Box>
  );
}; // LoginPage

export default LoginPage;
