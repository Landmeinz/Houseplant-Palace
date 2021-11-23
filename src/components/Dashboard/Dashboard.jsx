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



  // hold all page content
  const sxDashboardContainer = {
    // border: '1px solid yellow',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    // overflow: 'auto',
    mb: 10,

  }; // sxDashboardContainer


  // holds image, title, and all other info and buttons
  const sxInfoContainer = {
    border: '2px solid green',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '350px',
    mb: 2,

  }; // sxInfoBox

  // to control the image size, border radius, ect.
  const sxPhotoBox = {
    border: '1px solid darkgray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    width: '100px',
    borderRadius: '50%',

  }; // sxPhotoBox

  // 
  const sx = {
    border: 1,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: 100,
    // width: 100,
    // m: 0,
    // mb: 2,

  }; // sx

  const sxButton = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 500,
    lineHeight: 2,
    width: 50,
    height: '100%',
  }; // sxButton


  const sxHeader = {
    fontSize: 30,
  }

  


  const showContent = (
    <Box >

      <h2>DASHBOARD</h2>

      {current_date && <h3>{current_date.year}-{current_date.month}-{current_date.day}</h3>}

      {plants.map(plant => (
        <Box key={plant.id}>
          
          <Box sx={sxInfoContainer}>

            {/* the following 3 boxes make up the layout for each dashboard item */}
            <Box >
              <Typography color="secondary"><h3>{plant.nickname}</h3></Typography>

              <CardMedia sx={sxPhotoBox} component="img" image={plant.avatar_url}
                onClick={() => handleClick('plantDetails', plant)} />

            </Box>

            <Box>


              {current_date.current_date === plant.next_water ? <h4>Water Today!</h4> : <></>}
              {current_date.current_date > plant.next_water ? <h4>Remember to Water!</h4> : <></>}
              {current_date.tomorrow === plant.next_water ? <h4>Water Tomorrow</h4> : <></>}
              {current_date.tomorrow < plant.next_water ? <h4>Water Soon</h4> : <></>}

              <p>Water Every {plant.water_freq} Days</p>
              {/* <p>Last Watered: {plant.date_watered.split(`T`)[0]}</p> */}
              <h4>Next Water: {plant.next_water.split(`T`)[0]}</h4>
            </Box>

            <Box >
              {current_date.current_date >= plant.next_water ?
                <Button sx={sxButton} size="small" variant="outlined"
                  onClick={() => handleClick('markWatered', plant)} startIcon={<OpacityIcon />}>Water</Button> :
                <></>}

              {current_date.tomorrow === plant.next_water ?
                <Button sx={sxButton} size="small" variant="outlined"
                  onClick={() => handleClick('markWatered', plant)} startIcon={<OpacityIcon />}>Water</Button> :
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
