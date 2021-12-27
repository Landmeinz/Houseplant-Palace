import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// --- MUI --- // 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const sxInput = {
  display: 'flex',
  justifyContent: 'center',
  // border: '1px solid blue',
  mb: 2,
  mx: 'auto',
  width: '90%',
  fontSize: 50,

}; // sxInput

// Header Text
const sxHeader = {
  fontSize: 30,
  fontWeight: 700,
  py: 2,
  textAlign: 'center',
  width: 355,
  mt: 2,

}; // sxHeader

// BUTTON // 
const sxRegister = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 700,
  lineHeight: 2,
  width: '90%',
  height: 60,
  border: '.25px solid primary',
  boxShadow: 2,
  mx: 'auto',
  color: 'info.main',
  fontSize: 22,
}; // sxLogin


const sxFormBox = {
  // border: '1px solid green',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

}; // sxFormBox


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    if(password === passwordConfirm) {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
        },
      });
      dispatch({ type: 'FETCH_PLANTS' });
      dispatch({ type: 'FETCH_PHOTOS' });
      // window.location.reload(false);
      alert('Be sure to remember your password. Password recovery is not currently available')
      history.push('/dashboard')
    } else {
      alert('Make sure your passwords match')
    }
    
  }; // end registerUser

  return (
    <form onSubmit={registerUser}>

      {/* <h2>Register User</h2> */}

      <Box sx={sxFormBox}>
        <Typography sx={sxHeader} color="info.main"><span>Register New User</span></Typography>

        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}

        <Box>
          {/* USERNAME */}
          <TextField sx={sxInput}
            id="username"
            type="text"
            required
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Box>

        <Box>
          {/* PASSWORD */}
          <TextField sx={sxInput}
            id="password"
            type="password"
            required
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {/* PASSWORD CONFIRM */}
          <TextField sx={sxInput}
            id="confirm-password"
            type="password"
            required
            label="Confirm Password"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </Box>

        <Box>
          <Button type="submit" sx={sxRegister} size="large" variant="contained" color="secondary">Register & Login</Button>
        </Box>

      </Box>

    </form>
  );
}

export default RegisterForm;
