import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// --- FILESTACK for image upload --- // 
import { PickerDropPane } from 'filestack-react'; // PickerOverlay, PickerInline

// --- MUI --- // 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.

function PlantForm(props) {

  const dispatch = useDispatch();

  const current_date = useSelector((store) => store.current_date);

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const store = useSelector((store) => store);
  // const [heading, setHeading] = useState('Functional Component');

  const emptyPlant = {
    nickname: '',
    avatar_url: '',
    date_added: '',
    plant_type: '',
    light_level: '',
    water_freq: '',
    date_watered: '',
    date_potted: '',
    date_fertilized: '',
    notes: ''
  }; // emptyPlant

  const [newPlant, setNewPlant] = useState(emptyPlant);

  const handleNameChange = (event, property) => {
    setNewPlant({
      ...newPlant,
      [property]: event.target.value
    })
  } // handleNameChange


  const handleSubmit = (event) => {
    console.log('--- CLICKED --- hit handleSubmit Add Plant');
    event.preventDefault();
    console.log('-- the newPlant:', newPlant);

    dispatch({ type: 'ADD_PLANT', payload: newPlant });

    // we need to get the plant ID to send along with the add photo saga // 
    // dispatch({ type: 'ADD_PHOTO', payload: newPlant.avatar_url, plantId: plantId });

    setNewPlant(emptyPlant);
  } // handleSubmit


  // for image upload? 
  const handleClick = () => {
    console.log('CLICKED on uploadImage');
  }; // handleClick


  // Box that holds all page content
  const sxFormContainer = {

  }; // sxFormContainer

  // HEADER BOX // 
  const sxHeaderBox = {
    // border: '1px solid blue',
    position: 'sticky',
    top: 0,
    bgcolor: 'secondary.main',
    zIndex: 50,
    mx: 'auto',
    width: 355,
    mb: 2,

  }; // sxDateBox


  // Header Text
  const sxHeader = {
    fontSize: 22,
    fontWeight: 500,
    py: 2,
    textAlign: 'center',
    borderBottom: '2px solid lightgray',
    width: 355,
    borderRadius: 1,

  }; // sxHeader



  // Box that holds the drop pane
  const sxUploaderBox = {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'left',
    // alignItems: 'center',
    gap: 2,
    width: 'auto',
    height: 'auto',
    cursor: 'pointer',
    mx: 'auto',
    p: 'auto',
    boxShadow: 3,
  }; // sxUploaderBox

  // Box inside the form to hold all inputs
  const sxFormBox = {
    display: 'flex',
    flexDirection: 'column',
    gap: .5,
    border: 1,
    mb: 8,
  }; // sxFormBox


  return (
    <Box sx={sxFormContainer}>


      <Box sx={sxHeaderBox}>
        <Typography sx={sxHeader} color="info.main"><>ADD TO YOUR COLLECTION</></Typography>
      </Box>

      {/* <h2>PLANT FORM</h2> */}

      <form onSubmit={handleSubmit}>
        <Box sx={sxFormBox}>

          <h4>Fill out all of the info below and tap submit</h4>

          {/* NICKNAME */}
          <label htmlFor="nickname">Give Your Plant A Nickname: </label>
          <input
            id="nickname"
            required
            type="text"
            value={newPlant.nickname}
            onChange={(event) => handleNameChange(event, 'nickname')}
            placeholder="Planty McPlanterson"
          />

          {/* AVATAR_URL */}
          <label htmlFor="avatar_url">Include a Photo By Providing a URL: </label>
          <input
            id="avatar_url"
            required
            type="text"
            value={newPlant.avatar_url}
            onChange={(event) => handleNameChange(event, 'avatar_url')}
            placeholder="uploadedimage"
          />

          {/* DATE_ADDED */}
          <label htmlFor="date_added">Date Plant Was Added To Collection: </label>
          <input
            id="date_added"
            required
            type="date"
            value={newPlant.date_added}
            onChange={(event) => handleNameChange(event, 'date_added')}
          // placeholder="date_added"
          />

          {/* PLANT_TYPE */}
          <label htmlFor="plant_type">Type of Plant: </label>
          <input
            id="plant_type"
            required
            type="text"
            value={newPlant.plant_type}
            onChange={(event) => handleNameChange(event, 'plant_type')}
            placeholder="plant_type"
          />

          {/* LIGHT_LEVEL */}
          <label htmlFor="light_level">Light Level: </label>
          <select
            id="light_level"
            required
            value={newPlant.light_level}
            name="light_level"
            id="light_level"
            onChange={(event) => handleNameChange(event, 'light_level')}
          >
            <option hidden value="null">Select</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>

          {/* WATER_FREQ */}
          <label htmlFor="water_freq">Days Between Watering: </label>
          <input
            id="water_freq"
            required
            type="number"
            value={newPlant.water_freq}
            onChange={(event) => handleNameChange(event, 'water_freq')}
            placeholder="5"
          />

          {/* DATE_WATERED */}
          <label htmlFor="date_watered">Date Last Watered: </label>
          <input
            id="date_watered"
            required
            type="date"
            value={newPlant.date_watered}
            onChange={(event) => handleNameChange(event, 'date_watered')}
          // placeholder="date_watered"
          />

          {/* DATE_POTTED */}
          <label htmlFor="date_potted">Date Potted: </label>
          <input
            id="date_potted"
            required
            type="date"
            value={newPlant.date_potted}
            onChange={(event) => handleNameChange(event, 'date_potted')}
          // placeholder="date_potted"
          />

          {/* DATE_FERTILIZED */}
          <label htmlFor="date_added">Date Fertilized: </label>
          <input
            id="date_added"
            required
            type="date"
            value={newPlant.date_fertilized}
            onChange={(event) => handleNameChange(event, 'date_fertilized')}
          // placeholder="date_fertilized"
          />

          {/* NOTES */}
          <label htmlFor="notes">Plant Notes: </label>
          <input
            id="notes"
            type="text"
            value={newPlant.notes}
            onChange={(event) => handleNameChange(event, 'notes')}
            placeholder="remember to turn plant"
          />

          <Button type="submit" onClick={handleClick}>ADD NEW PLANT</Button>

        </Box>
      </form>

    </Box>
  );
}; // PlantForm

export default PlantForm;


{/* <p>1: Select your image and click on upload</p>

        <Box sx={sxUploaderBox}>
          <PickerDropPane
            mode={'pick'}
            apikey='A09e78cDRI65bPtSGZMEwz'
            onSuccess={(response) => console.log(response)}
            onUploadDone={(response) => console.log(response)}
          // buttonText={'Pick File'}
          />
          <button>upload</button>
        </Box> */}
