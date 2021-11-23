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
    textAlign: 'center',
    width: 350,
    mb: 8,

  }; // sxDashboardContainer


  // TODAY'S DATE //
  const sxDateBox = {
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid blue',
    position: 'sticky',
    top: -2,
    background: 'white',
    width: 355,
    zIndex: 50,
    mb: 2,
    display: 'flex',
    justifyContent: 'space-between',

  }; // sxDateBox


  // DATE font size and properties
  const sxDateHeader = {
    fontSize: 22,
    fontWeight: 500,
    width: 355,
    p: 1,

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
    border: '2px solid green',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    mb: 2,

  }; // sxInfoBox


  // TOP SECTION that holds the image and text info
  const sxTopSection = {
    border: '2px solid yellow',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 180,
    mb: 2,

  }; // sxTopSection


  // Box that holds our info;  // 
  const sxTextInfo = {
    border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    width: 230,
    // height: '100%',
  }; // sxButton


  // PHOTO to control the image size, border radius, ect.
  const sxPhotoBox = {
    border: '1px solid darkgray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: '50%',

  }; // sxPhotoBox


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
    width: 200,
    height: '100%',
    border: '2px solid'
  }; // sxButton


const sxNickname = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid blue',
  height: 40,
  width: 100,
  fontSize: 20,
  fontWeight: 500,
  lineHeight: 1.1,
  p: 1,
}

const sxNextWater = {
    height: 50,
    
}




  const showContent = (
    <Box >

      {/* <h2>DASHBOARD</h2> */}

      <Box sx={sxDateBox}>
        <Typography sx={sxDateHeader} color="primary.main">{current_date &&
          <>{current_date.year}-{current_date.month}-{current_date.day}</>}
        </Typography>
        {/* <Box sx={sxNumberBox}>

        </Box> */}
      </Box>


      {plants.map(plant => (
        <Box key={plant.id}>

          <Box sx={sxInfoContainer}>

            <Box sx={sxTopSection}>
              {/* the following 3 boxes make up the layout for each dashboard item */}
              <Box >
                <Typography sx={sxNickname}color="secondary">{plant.nickname}</Typography>

                <CardMedia sx={sxPhotoBox} component="img" image={plant.avatar_url}
                  onClick={() => handleClick('plantDetails', plant)} />
              </Box>

              <Box sx={sxTextInfo}>
                {current_date.current_date === plant.next_water ? <h4>Water Today!</h4> : <></>}
                {current_date.current_date > plant.next_water ? <h4>Remember to Water!</h4> : <></>}
                {current_date.tomorrow === plant.next_water ? <h4>Water Tomorrow</h4> : <></>}
                {current_date.tomorrow < plant.next_water ? <h4>Water Soon</h4> : <></>}

                <p>Water Every {plant.water_freq} Days</p>
                {/* <p>Last Watered: {plant.date_watered.split(`T`)[0]}</p> */}
                
                <Typography sx={sxNextWater}color="secondary"><h4>Next Water: {plant.next_water.split(`T`)[0]}</h4></Typography>
              </Box>
            </Box>


            <Box sx={sxButtonBox}>
              {current_date.current_date >= plant.next_water ?
                <Button sx={sxButton} size="medium" variant="outlined"
                  onClick={() => handleClick('markWatered', plant)} startIcon={<OpacityIcon />} endIcon={<OpacityIcon />}> Water </Button> :
                <></>}

              {current_date.tomorrow === plant.next_water ?
                <Button sx={sxButton} size="small" variant="outlined"
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
