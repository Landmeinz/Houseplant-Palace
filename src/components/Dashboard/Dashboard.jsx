import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// --- MUI --- // 
import Box from '@mui/material/Box';



// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Dashboard(props) {
  const dispatch = useDispatch();

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const plants = useSelector((store) => store.plants);
  const [heading, setHeading] = useState('Functional Component');

  console.log('--- plants from the store in Dashboard,', plants);



  const showContent = (
    <div>
      <p>showContent</p>
      {plants.map(plant => (
        <div key={plant.id}>
          <h3>{plant.nickname}</h3>
          <p>date_added : {plant.date_added.split(`T`)[0]}</p>
          <p>plant_type : {plant.plant_type}</p>
          <p>light_level : {plant.light_level}</p>
          <p>water_freq : Every {plant.water_freq} Days</p>
          <p>date_watered : {plant.date_watered.split(`T`)[0]}</p>
          <p>date_potted : {plant.date_potted.split(`T`)[0]}</p>
          <p>date_fertilized : {plant.date_fertilized.split(`T`)[0]}</p>
          <p>notes : {plant.notes}</p>
        </div>
      ))}
    </div>
  ); // showContent

  const showMessage = (
    <div>
      <p>showMessage</p>
      <p>tap on the + icon and start using the app by adding a new plant</p>
    </div>
  ); // showMessage



  const sxDashboardContainer = {
    border: 1,
    m: 2,
    overflow: 'scroll',

  }; // sxDashboardContainer

  return (
    <Box sx={sxDashboardContainer}>

      <h2>DASHBOARD STUFF!</h2>

      {plants.length > 0 ? showContent : showMessage}

    </Box>
  );
}; // Dashboard

export default Dashboard;
