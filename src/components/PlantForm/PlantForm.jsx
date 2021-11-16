import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// --- MUI --- // 
import Box from '@mui/material/Box';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PlantForm(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');


  const [newPlant, setNewPlant] = useState({
    nickname: '',
    date_added: '',
    plant_type: '',
    light_level: '',
    water_freq: '',
    date_watered: '',
    date_potted: '',
    date_fertilized: '',
    notes: ''
  })


  const handleNameChange = (event, property) => {
    setNewItem({
      ...newPlant,
      [property]: event.target.value
    })
  } // end handleNameChange


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('clicked');
    console.log(newPlant);
    dispatch({ type: 'ADD_ITEM', payload: newPlant })
    setNewItem({
      description: '',
      image_url: '',
    })

  } // end handleSubmit


  const sxFormBox = {
    border: 1,
    m: 2,
    overflow: 'scroll',

  }


  return (
    <Box sx={sxFormBox}>
      <h2>PLANT FORM</h2>

      <form onSubmit={handleSubmit}>

        <p>image uploader</p>

        {/* NICKNAME */}
        <input
          required
          type="text"
          value={newPlant.nickname}
          onChange={(event) => handleNameChange(event, 'nickname')}
          placeholder="nickname"
        />
        {/* DATE_ADDED */}
        <input
          required
          type="date"
          value={newPlant.date_added}
          onChange={(event) => handleNameChange(event, 'date_added')}
          placeholder="date_added"
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
        <select value={newPlant.light_level} name="" id="">
          <option hidden>Light Level</option>
          <option>option 1</option>
          <option>option 2</option>
          <option>option 3</option>
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
          placeholder="date_watered"
        />
        {/* DATE_POTTED */}
        <input
          required
          type="date"
          value={newPlant.date_potted}
          onChange={(event) => handleNameChange(event, 'date_potted')}
          placeholder="date_potted"
        />
          {/* DATE_FERTILIZED */}
          <input
          required
          type="date"
          value={newPlant.date_fertilized}
          onChange={(event) => handleNameChange(event, 'date_fertilized')}
          placeholder="date_fertilized"
        />
         {/* NOTES */}
         <input
          required
          type="text"
          value={newPlant.notes}
          onChange={(event) => handleNameChange(event, 'notes')}
          placeholder="notes"
        />


        <button type="submit">SUBMIT</button>
      </form>
    </Box>
  );
}

export default PlantForm;
