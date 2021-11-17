import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// --- MUI --- // 
import Box from '@mui/material/Box';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Collection(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const history = useHistory();
  const photos = useSelector((store) => store.photos);
  const plants = useSelector((store) => store.plants);
  const current_date = useSelector((store) => store.current_date);
  const [heading, setHeading] = useState('Functional Component');

  console.log('these are the photos in Collection:', photos);
  console.log('these are the plants in Collection:', plants);

  const showContent = (
    <div>

      {plants.map(plant => (
        <div key={plant.id}>
          <h3>{plant.nickname}</h3>
          <p>{plant.date_added.split(`T`)[0]}</p>
          <img onClick={() => history.push('/PlantDetails')} src={plant.avatar_url} />

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
