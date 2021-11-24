import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// --- MUI --- // 
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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
    boxShadow: 1,
    display: 'flex',
    justifyContent: 'center',

  }; // sxInfoBox


  // PHOTO to control the image size, border radius, ect.
  const sxPhotoBox = {
    border: '1px solid lightgray',
    width: 175,
    height: 225,
    boxShadow: 1,

  }; // sxPhotoBox


  const showContent = (

    <div>

      <ImageList sx={{ maxWidth: 355, height: 'auto' }} cols={2}>

        {plants.map(plant => (
          <Box sx={sxInfoBox}>
            <ImageListItem key={plant.id}>

              <CardMedia sx={sxPhotoBox} component="img" image={plant.avatar_url} 
                onClick={() => handleClick('plantDetails', plant)} />

              {/* <ImageListItemBar position="below" title={plant.nickname} /> */}
            </ImageListItem>
          </Box>
        ))}

      </ImageList>

      {/* {plants.map(plant => (
        <div key={plant.id}>
          <Box sx={sxInfoBox}>

            <h3>{plant.nickname}</h3>
            <img onClick={() => handleClick('plantDetails', plant)} src={plant.avatar_url} />
            <h4>{plant.date_added.split(`T`)[0]}</h4>

          </Box>
        </div>
      ))} */}
    </div>
  ); // showContent


  const showMessage = (
    <div>
      <p>showMessage</p>
      <p>tap on the + icon and start using the app by adding a new plant</p>
    </div>
  ); // showMessage



  const sxCollectionContainer = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid red',
    mb: 8,
    width: '100%',
    // height: '700px',
    // textAlign: 'center',
    // overflow: 'auto',

  }; // sxCollectionContainer


   // HEADER BOX // 
   const sxHeaderBox = {
    // border: '1px solid blue',
    position: 'sticky',
    top: 0,
    background: 'white',
    zIndex: 50,
    mx: 'auto',
    width: 355,

  }; // sxDateBox


  // Header Text
  const sxHeader = {
    fontSize: 22,
    fontWeight: 500,
    py: 2,
    textAlign: 'center',
    borderBottom: '2px solid lightgray',
    width: 355,

  }; // sxHeader


  return (
    <Box sx={sxCollectionContainer}>

      <Box sx={sxHeaderBox}>
        <Typography sx={sxHeader} color="primary"><>{plants.length} PLANTS IN MY COLLECTION</></Typography>
      </Box>

      {photos.length > 0 ? showContent : showMessage}

    </Box>
  );
}; // Collection

export default Collection;
