import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// --- FILESTACK for image upload --- // 
import { PickerDropPane } from 'filestack-react'; // PickerOverlay, PickerInline

// --- MUI --- // 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateAdapter from '@mui/lab/AdapterDateFns';







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
    event.preventDefault();
    console.log('--- CLICKED --- hit handleSubmit Add Plant');
    console.log('-- the newPlant:', newPlant);

    dispatch({ type: 'ADD_PLANT', payload: newPlant });

    // we need to get the plant ID to send along with the add photo saga // 
    // dispatch({ type: 'ADD_PHOTO', payload: newPlant.avatar_url, plantId: plantId });

    setNewPlant(emptyPlant);
  } // handleSubmit


  // for image upload? 
  // const handleClick = () => {
  //   console.log('CLICKED on uploadImage');
  // }; // handleClick


  // Box that holds all page content
  const sxPageContainer = {
    // display: 'flex',
    // justifyContent: 'center',
  }; // sxPageContainer

  // HEADER BOX // 
  const sxHeaderBox = {
    // border: '1px solid blue',
    position: 'sticky',
    top: 0,
    bgcolor: 'secondary.main',
    zIndex: 50,
    mx: 'auto',
    width: 355,
    height: '100%',
    mb: 2,

  }; // sxDateBox


  // Header Text
  const sxHeader = {
    fontSize: 22,
    fontWeight: 500,
    py: 2,
    textAlign: 'center',
    width: 355,

  }; // sxHeader



  // Box that holds the drop pane
  // const sxUploaderBox = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   // justifyContent: 'left',
  //   // alignItems: 'center',
  //   gap: 2,
  //   width: 'auto',
  //   height: 'auto',
  //   cursor: 'pointer',
  //   mx: 'auto',
  //   p: 'auto',
  //   boxShadow: 3,
  // }; // sxUploaderBox

  const sxFormControl = {
    display: 'flex',
    justifyContent: 'center',
  }; // sxFormControl

  // Box inside the form to hold all inputs
  const sxFormBox = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: .5,
    mb: 8,
    mx: 'auto',
    width: '90%',
  }; // sxFormBox

  const sxInput = {
    mb: 2,
  }; // sxInput


  const sxInstructionsBox = {
    mb: 2,
  }; // sxInstructionsBox

  const sxInstructions = {
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
    lineHeight: 1.3,
    // borderBottom: '2px solid lightgray',
  }; // sxInstructions

  // BUTTON // 
  const sxAddPlant = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 500,
    lineHeight: 2,
    width: '90%',
    height: 60,
    border: '.25px solid primary',
    mt: 2,
    boxShadow: 2,
    mx: 'auto',
    color: 'info.main',
  }; // sxAddPlant


  return (
    <Box sx={sxPageContainer}>


      <Box sx={sxHeaderBox}>
        <Typography sx={sxHeader} color="info.main"><span>ADD TO YOUR COLLECTION</span></Typography>
      </Box>

      {/* <h2>PLANT FORM</h2> */}

      <form sx={sxFormControl} onSubmit={handleSubmit} variant="standard">
        <Box sx={sxFormBox}>

          <Box sx={sxInstructionsBox}>
            <Typography sx={sxInstructions} color="info.main"><span>Fill out all of the info below and</span></Typography>
            <Typography sx={sxInstructions} color="info.main"><span>tap Add New Plant</span></Typography>
          </Box>


          {/* NICKNAME */}
          <TextField sx={sxInput}
            id="nickname"
            required
            label="Nickname"
            value={newPlant.nickname}
            onChange={(event) => handleNameChange(event, 'nickname')}
            placeholder="Planty McPlanterson"
          />


          {/* AVATAR_URL */}
          <TextField sx={sxInput}
            id="avatar_url"
            required
            label="Avatar Photo URL"
            value={newPlant.avatar_url}
            onChange={(event) => handleNameChange(event, 'avatar_url')}
            placeholder="yourPhotoUrlGoesHere.jpg"
          />


          {/* DATE ADDED */}
          <TextField sx={sxInput}
            type="date"
            id="date_added"
            required
            label="Date Added To Collection"
            value={newPlant.date_added}
            onChange={(event) => handleNameChange(event, 'date_added')}
            InputLabelProps={{ shrink: true }}
          />


          {/* PLANT_TYPE */}
          <TextField sx={sxInput}
            id="plant_type"
            required
            label="Plant Type"
            value={newPlant.plant_type}
            onChange={(event) => handleNameChange(event, 'plant_type')}
            placeholder="Golden Pothos"
          />


          {/* LIGHT_LEVEL */}
          <FormControl required>
            <InputLabel id="light_level_label" >Light Levels</InputLabel>
            <Select sx={sxInput} variant="outlined"
              labelId="light_level_label"
              label="Light Levels"
              id="light_level"
              name="light_level"
              value={newPlant.light_level}
              onChange={(event) => handleNameChange(event, 'light_level')}
            >
              <MenuItem value={1}>Low</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={3}>High</MenuItem>
            </Select>
          </FormControl>


          {/* WATER_FREQ */}
          <TextField sx={sxInput}
            id="water_freq"
            required
            type="number"
            value={newPlant.water_freq}
            onChange={(event) => handleNameChange(event, 'water_freq')}
            label="Number of Days Between Watering"
          />

          {/* DATE_WATERED */}
          <TextField sx={sxInput}
            id="date_watered"
            required
            type="date"
            label="Date Last Watered"
            value={newPlant.date_watered}
            onChange={(event) => handleNameChange(event, 'date_watered')}
            InputLabelProps={{ shrink: true }}
          />


          {/* DATE_POTTED */}
          <TextField sx={sxInput}
            id="date_potted"
            required
            type="date"
            label="Date Potted"
            value={newPlant.date_potted}
            onChange={(event) => handleNameChange(event, 'date_potted')}
            InputLabelProps={{ shrink: true }}
          />

          {/* DATE_FERTILIZED */}
          <TextField sx={sxInput}
            id="date_added"
            required
            type="date"
            label="Date Fertilized"
            value={newPlant.date_fertilized}
            onChange={(event) => handleNameChange(event, 'date_fertilized')}
            InputLabelProps={{ shrink: true }}
          />

          {/* NOTES */}
          <TextField sx={sxInput}
            id="notes"
            type="text"
            label="Include Any Plant Notes"
            value={newPlant.notes}
            onChange={(event) => handleNameChange(event, 'notes')}
            placeholder="Don't over water!"
            multiline
            maxRows={3}
          />

          <Button type="submit" sx={sxAddPlant} size="large" variant="contained" color="secondary">ADD NEW PLANT</Button>

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
