import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// --- MUI --- // 
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
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


  const sxShowContent = {
    // border: '1px solid green',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  }; // sxShowContent


  const sxInfoBox = {
    border: '1px solid lightgray',
    boxShadow: 1,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 1,
    width: 166,

  }; // sxInfoBox


  // PHOTO to control the image size, border radius, ect.
  const sxPhotoBox = {
    width: 166,
    height: 220,

  }; // sxPhotoBox

  // NICKNAME
  const sxNickname = {
    // border: '1px solid blue',
    display: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.1,
    // pl: 3,
    // mb: 2,
    // borderRadius: 2,
    textAlign: 'center',
    // backgroundColor: 'red',
  }; // sxNickname


  const showContent = (

    <Box sx={sxShowContent}>

      <ImageList sx={{ maxWidth: 355, height: 'auto' }} cols={2}>

        {plants.map(plant => (
          <Box sx={sxInfoBox} onClick={() => handleClick('plantDetails', plant)}>
            <ImageListItem key={plant.id}>

              <CardMedia sx={sxPhotoBox} component="img" image={plant.avatar_url}/>

              <Typography sx={sxNickname} color="info.main"><span>{plant.nickname}</span></Typography>

              {/* <ImageListItemBar position="below" title={plant.nickname} /> */}
            </ImageListItem>
          </Box>
        ))}

      </ImageList>

    </Box>
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
    // border: '1px solid red',
    mb: 10,
    width: 348,
    justifyContent: 'center',
    // height: '700px',
    // textAlign: 'center',
    // overflow: 'auto',

  }; // sxCollectionContainer



  // HEADER BOX // 
  const sxHeaderBox = {
    // border: '1px solid blue',
    position: 'sticky',
    top: 0,
    bgcolor: 'secondary.main',
    zIndex: 50,
    mb: 2,
    mx: 'auto',

  }; // sxDateBox


  // Header Text
  const sxHeader = {
    fontSize: 22,
    fontWeight: 500,
    py: 2,
    textAlign: 'center',
    width: 355,

  }; // sxHeader


  return (
    <Box sx={sxCollectionContainer} >

      <Box sx={sxHeaderBox}>
        <Typography sx={sxHeader} color="info.main"><span>{plants.length} Plants In My Collection</span></Typography>
      </Box>

      {photos ? showContent : showMessage}

    </Box>
  );
}; // Collection

export default Collection;
