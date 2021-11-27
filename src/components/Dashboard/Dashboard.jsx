import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


// --- MUI --- // 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import WaterIcon from '@mui/icons-material/Water';
import OpacityIcon from '@mui/icons-material/Opacity';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Dashboard(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const history = useHistory();
  const plants = useSelector((store) => store.plants);
  const current_date = useSelector((store) => store.current_date);

  console.log('--- plants from the store in Dashboard,', plants);
  console.log('--- the current date:', current_date);


  function handleClick(input, plant) {

    switch (input) {
      case 'plantDetails':
        console.log('CLICKED on the image');
        console.log('this is the current plant from handleClick', plant);
        dispatch({ type: 'FETCH_SELECTED_PLANT', payload: plant.id });
        dispatch({ type: 'FETCH_SELECTED_PHOTO', payload: plant.id });
        history.push('/PlantDetails');
        break;

      case 'markWatered':
        console.log('CLICKED on Mark Watered');
        console.log('this is the current plant from handleClick', plant);
        dispatch({ type: 'UPDATE_WATER_DATE', payload: plant });
        dispatch({ type: 'FETCH_PLANTS' });
        break;

      default:
        break;
    }; // switch

  }; // handleClick



  // CONTAINER hold all page content
  const sxDashboardContainer = {
    // border: '1px solid yellow',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    mx: 'auto',
    mb: 8,

  }; // sxDashboardContainer



  // TODAY'S DATE //
  const sxDateBox = {
    // border: '1px solid blue',
    position: 'sticky',
    top: 0,
    background: 'white',
    zIndex: 50,
    mb: 2,
    mx: 'auto',

  }; // sxDateBox


  // DATE font size and properties
  const sxDateHeader = {
    fontSize: 22,
    fontWeight: 500,
    p: 2,
    textAlign: 'center',
    bgcolor: 'secondary.main',

  }; // sxHeader



  // NUMBER of waters today
  // const sxNumberBox = {
  //   border: '1px solid red',
  //   // position: 'fixed',
  //   right: 15,
  //   width: 64,
  //   height: '100%',

  // }; // sxNumberBox



  // INFO holds image, title, and all other info and buttons
  const sxInfoContainer = {
    border: '1px solid lightgray',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    mb: 2,
    boxShadow: 3,
    pb: 2,

  }; // sxInfoBox


  // NICKNAME
  const sxNickname = {
    // border: '1px solid blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1,
    // pl: 3,
    boxShadow: 1,
    mb: 2,
    borderRadius: 2,
    // backgroundColor: 'red',
  }; // sxNickname


  // Box that holds 'water today', 'water tomorrow', 'water soon', water_freq, & NEXT water date
  const sxTextInfo = {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    height: 100,
    p: 'none',
  }; // sxTextInfo


  // holds PHOTO
  const sxLeftSection = {
    // border: '1px solid yellow',
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    width: 130,
    height: 100,
  }; // sxTextInfo

  // PHOTO to control the image size, border radius, ect.
  const sxPhotoBox = {
    // border: '1px solid darkgray',
    boxShadow: 2,
    height: 100,
    width: 100,
    borderRadius: '50%',

  }; // sxPhotoBox


  // holds TEXT INFO
  const sxRightSection = {
    // border: '1px solid green',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: 225,
    height: 100,
    p: 'none',
    mx: 'auto',
  }; // sxTextInfo

  // Water TODAY text 
  const sxWaterToday = {
    fontSize: 14,
    fontWeight: 700,
  }; // sxWaterToday

  // REMEMBER to water text 
  const sxWaterRemember = {
    fontSize: 14,
    fontWeight: 700,
  }; // sxWaterRemember

  // Water TOMORROW + Water SOON text 
  const sxWaterSoon = {
    fontSize: 14,
    fontWeight: 500,
  }; // sxWaterSoon


  // 'WATER every 9 days' // 
  const sxWaterFreq = {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
  }; // sxWaterFreq

  // NEXT WATER date
  const sxNextWater = {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,

  }; // sxNextWater




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
    fontWeight: 500,
    lineHeight: 2,
    width: '90%',
    height: 35,
    border: '.25px solid primary',
    mt: 2,
    boxShadow: 2,
  }; // sxButton





  const showContent = (
    <Box >

      {/* <h2>DASHBOARD</h2> */}

      <Box sx={sxDateBox}>
        <Typography sx={sxDateHeader} color="info.main">{current_date &&
          <span>{current_date.year}-{current_date.month}-{current_date.day}</span>}
        </Typography>
      </Box>


      {plants.map(plant => (
        <Box key={plant.id}>

          <Box sx={sxInfoContainer}>

            {/* the following 3 boxes make up the layout for each dashboard item */}
            <Box >
              <Typography sx={sxNickname} color="info"><span>{plant.nickname}</span></Typography>
            </Box>

            {/* WATER TODAY OR TOMORROW OR SOON */}
            <Box sx={sxTextInfo}>

              <Box sx={sxLeftSection}>
                <CardMedia sx={sxPhotoBox} component="img" image={plant.avatar_url}
                  onClick={() => handleClick('plantDetails', plant)} />
              </Box>

              <Box sx={sxRightSection}>
                {current_date.current_date === plant.next_water ?
                  <Typography sx={sxWaterToday} color="error"><span>Water Today!</span></Typography> : <></>}

                {current_date.current_date > plant.next_water ?
                  <Typography sx={sxWaterRemember} color="error"><span>Remember To Water Today!</span></Typography> : <></>}

                {current_date.tomorrow === plant.next_water ?
                  <Typography sx={sxWaterSoon} color="primary"><span>Water Tomorrow</span></Typography> : <></>}

                {current_date.tomorrow < plant.next_water ?
                  <Typography sx={sxWaterSoon} color="primary"><span>Water Soon</span></Typography> : <></>}

                <Typography sx={sxWaterFreq} color="info.dark"><span>Water Every {plant.water_freq} Days</span></Typography>

                <Typography sx={sxNextWater} color="info.dark"><span>Water On {plant.next_water.split(`T`)[0]}</span></Typography>
              </Box>

            </Box>


            <Box sx={sxButtonBox}>
              {current_date.current_date >= plant.next_water ?
                <Button sx={sxButton} size="medium" variant="contained" color="primary"
                  onClick={() => handleClick('markWatered', plant)} startIcon={<OpacityIcon />} endIcon={<OpacityIcon />}> Water </Button> :
                <></>}

              {current_date.tomorrow === plant.next_water ?
                <Button sx={sxButton} size="small" variant="contained" color="primary"
                  onClick={() => handleClick('markWatered', plant)} startIcon={<OpacityIcon />} endIcon={<OpacityIcon />}> Water </Button> :
                <></>}
            </Box>

          </Box>
        </Box>
      ))
      }
    </Box >
  ); // showContent


  const showMessage = (
    <div>
      <p>showMessage</p>
      <p>tap on the + icon and start using the app by adding a new plant</p>
    </div>
  ); // showMessage



  return (
    <Box sx={sxDashboardContainer}>
      {plants.length > 0 ? showContent : showMessage}
    </Box>
  );
}; // Dashboard

export default Dashboard;
