import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// --- MUI --- // 
import Box from '@mui/material/Box';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.

function PlantForm(props) {

  const dispatch = useDispatch();

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
    notes: null
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
    setNewPlant(emptyPlant);
  } // handleSubmit


  const sxFormContainer = {
    border: 1,
    m: 2,
    overflow: 'scroll',

  }; // sxFormContainer


  return (
    <Box sx={sxFormContainer}>
      <h2>PLANT FORM</h2>

      <form onSubmit={handleSubmit}>

        <p>image uploader goes here</p>

        {/* NICKNAME */}
        <input
          required
          type="text"
          value={newPlant.nickname}
          onChange={(event) => handleNameChange(event, 'nickname')}
          placeholder="nickname"
        />

         {/* AVATAR_URL */}
         <input
          required
          type="text"
          value={newPlant.avatar_url}
          onChange={(event) => handleNameChange(event, 'avatar_url')}
          placeholder="avatar_url"
        />

        {/* DATE_ADDED */}
        <input
          required
          type="date"
          value={newPlant.date_added}
          onChange={(event) => handleNameChange(event, 'date_added')}
        // placeholder="date_added"
        />

        {/* PLANT_TYPE */}
        <input
          required
          type="text"
          value={newPlant.plant_type}
          onChange={(event) => handleNameChange(event, 'plant_type')}
          placeholder="plant_type"
        />

        {/* LIGHT_LEVEL */}
        <select
          required
          value={newPlant.light_level}
          name="light_level"
          id="light_level"
          onChange={(event) => handleNameChange(event, 'light_level')}
        >
          <option hidden value="null">Light Level</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>

        {/* WATER_FREQ */}
        <input
          required
          type="number"
          value={newPlant.water_freq}
          onChange={(event) => handleNameChange(event, 'water_freq')}
          placeholder="water_freq"
        />

        {/* DATE_WATERED */}
        <input
          required
          type="date"
          value={newPlant.date_watered}
          onChange={(event) => handleNameChange(event, 'date_watered')}
        // placeholder="date_watered"
        />

        {/* DATE_POTTED */}
        <input
          required
          type="date"
          value={newPlant.date_potted}
          onChange={(event) => handleNameChange(event, 'date_potted')}
        // placeholder="date_potted"
        />

        {/* DATE_FERTILIZED */}
        <input
          required
          type="date"
          value={newPlant.date_fertilized}
          onChange={(event) => handleNameChange(event, 'date_fertilized')}
        // placeholder="date_fertilized"
        />

        {/* NOTES */}
        <input
          type="text"
          value={newPlant.notes}
          onChange={(event) => handleNameChange(event, 'notes')}
          placeholder="notes"
        />

        <button type="submit">SUBMIT</button>
      </form>
    </Box>
  );
}; // PlantForm

export default PlantForm;
