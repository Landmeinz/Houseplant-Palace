import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// --- MUI --- // 
import Box from '@mui/material/Box';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Collection(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const history = useHistory();
  const photos = useSelector((store) => store.photos);
  const plants = useSelector((store) => store.plants);
  const current_date = useSelector((store) => store.current_date);
  const [heading, setHeading] = useState('Functional Component');

  console.log('these are the photos in Collection:', photos);
  console.log('these are the plants in Collection:', plants);


  function handleClick(input, plant) {

    console.log('--- plant being sent', plant);

    switch (input) {
      case 'plantDetails':
        console.log('CLICKED on the image');
        console.log('this is the current plant from handleClick', plant);
        dispatch({ type: 'FETCH_SELECTED_PLANT', payload: plant.id });
        dispatch({ type: 'FETCH_SELECTED_PHOTO', payload: plant.id });
        history.push('/PlantDetails');
        break;

      default:
        break;
    }; // switch

  }; // handleClick


  const sxInfoBox = {
    border: 1,
    mb: 2,

  }; // sxInfoBox

  const showContent = (
    <div>

      {plants.map(plant => (
        <div key={plant.id}>
          <Box sx={sxInfoBox}>
            
            <h3>{plant.nickname}</h3>
            <img onClick={() => handleClick('plantDetails', plant)} src={plant.avatar_url} />
            <h4>{plant.date_added.split(`T`)[0]}</h4>

          </Box>
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



  const sxCollectionContainer = {
    border: 1,
    m: 2,
    mb: 8,
    overflow: 'scroll',

  }; // sxCollectionContainer

  return (
    <Box sx={sxCollectionContainer}>

      <h2>COLLECTION OF PLANTS</h2>

      {photos.length > 0 ? showContent : showMessage}

    </Box>
  );
}; // Collection

export default Collection;
