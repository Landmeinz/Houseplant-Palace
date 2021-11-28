import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
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


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: { username: username, password: password },
        history
      });
      dispatch({ type: 'FETCH_USER' })
      // dispatch({type: 'FETCH_PLANTS'});
      // dispatch({type: 'FETCH_PHOTOS'});

    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login




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
  const sxLogin = {
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


  return (
    <form className="formPanel" onSubmit={login}>
      <Box sx={sxFormBox}>
        <Typography sx={sxHeader} color="info.main"><span>Login</span></Typography>

        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
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
        </Box>

        <Box>
          <Button type="submit" sx={sxLogin} size="large" variant="contained" color="secondary">Login</Button>
        </Box>

      </Box>
    </form>
  );
}

export default LoginForm;
