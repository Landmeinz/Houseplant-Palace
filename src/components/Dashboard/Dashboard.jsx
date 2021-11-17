import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


// --- MUI --- // 
import Box from '@mui/material/Box';



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
  const [heading, setHeading] = useState('Functional Component');

  console.log('--- plants from the store in Dashboard,', plants);
  console.log('--- the current date:', current_date);


  function handleClick(input, plant) {

    switch (input) {
      case 'dispatch':
        console.log('CLICKED on the image');
        console.log('this is the current plant from handleClick', plant);
        dispatch({
          type: 'FETCH_SELECTED_PLANT',
          payload: plant.id
        });
        history.push('/PlantDetails');
        break;

      default:
        break;
    }; // switch

  }; // handleClick


  const showContent = (
    <div>
      <h2>DASHBOARD</h2>

      {/* display the current date from the server */}
      {current_date.map(today => (
        <h3 key={today.current_date}>{today.current_date.split(`T`)[0]}</h3>
      ))}

      {plants.map(plant => (
        <div key={plant.id}>
          <h3>{plant.nickname}</h3>
          <img onClick={() => handleClick('dispatch', plant)} src={plant.avatar_url} width="150" height="150" />
          {/* <p>current_date : {plant.current_date.split(`T`)[0]}</p> */}
          <p>Water Every {plant.water_freq} Days</p>
          <p>Last Watered: {plant.date_watered.split(`T`)[0]}</p>
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
      {plants.length > 0 ? showContent : showMessage}
    </Box>
  );
}; // Dashboard

export default Dashboard;
