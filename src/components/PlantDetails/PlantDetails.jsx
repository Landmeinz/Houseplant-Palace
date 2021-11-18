import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// --- MUI --- // 
import Box from '@mui/material/Box';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PlantDetails(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedPlant = useSelector((store) => store.selectedPlant);
    const current_date = useSelector((store) => store.current_date);



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

    const existingPlant = {
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
    }; // existingPlant

    const [editMode, setEditMode] = useState(false);
    const [editPlant, setEditPlant] = useState(existingPlant);


    const handleNameChange = (event, property) => {
        setEditPlant({
            ...editPlant,
            [property]: event.target.value
        })
    } // handleNameChange


    const handleSubmit = (event) => {
        console.log('--- CLICKED --- hit handleSubmit editPlant');
        event.preventDefault();
        console.log('--- the editPlant:', editPlant);

        dispatch({ type: 'EDIT_PLANT', payload: editPlant });
        setEditPlant(emptyPlant);
    } // handleSubmit

    const handleRemove = (plantId) => {
        console.log('--- CLICKED --- hit handleRemove');
        dispatch({ type: 'REMOVE_PLANT', payload: plantId });
    }; // handleRemove


    const showInputs = (
        <form onSubmit={handleSubmit}>

            {/* NICKNAME */}
            <input
                // required
                type="text"
                value={editPlant.nickname}
                onChange={(event) => handleNameChange(event, 'nickname')}
                placeholder="Set New Nickname"
            />

            {/* AVATAR_URL */}
            <input
                // required
                type="text"
                value={editPlant.avatar_url}
                onChange={(event) => handleNameChange(event, 'avatar_url')}
                placeholder="Update Avatar URL"
            />

            {/* DATE_ADDED */}
            <label for="date_added">Date Added to Collection:</label>
            <input
                id="date_added"
                // required
                type="date"
                value={editPlant.date_added}
                onChange={(event) => handleNameChange(event, 'date_added')}
            />

            {/* PLANT_TYPE */}
            <input
                // required
                type="text"
                value={editPlant.plant_type}
                onChange={(event) => handleNameChange(event, 'plant_type')}
                placeholder="Update Plant Type"
            />

            {/* LIGHT_LEVEL */}
            <select
                // required
                value={editPlant.light_level}
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
                // required
                type="number"
                value={editPlant.water_freq}
                onChange={(event) => handleNameChange(event, 'water_freq')}
                placeholder="Update Number of Days Between Watering"
            />

            {/* DATE_WATERED */}
            <label for="date_watered">Date Added to Collection:</label>
            <input
                id="date_watered"
                // required
                type="date"
                value={editPlant.date_watered}
                onChange={(event) => handleNameChange(event, 'date_watered')}
            />

            {/* DATE_POTTED */}
            <label for="date_potted">Update Date Potted:</label>
            <input
                id="date_potted"
                // required
                type="date"
                value={editPlant.date_potted}
                onChange={(event) => handleNameChange(event, 'date_potted')}
            />

            {/* date_fertilized */}
            <label for="date_added">Update Date Fertilized:</label>
            <input
                id="date_fertilized"
                // required
                type="date"
                value={editPlant.date_fertilized}
                onChange={(event) => handleNameChange(event, 'date_fertilized')}
            />

            {/* NOTES */}
            <input
                type="text"
                value={editPlant.notes}
                onChange={(event) => handleNameChange(event, 'notes')}
                placeholder="Update Plant Notes"
            />

            <button type="submit">Submit Edited Plant</button>
        </form >
    ); // showInputs


    const sxPlantContainer = {
        border: 1,
        m: 2,
        overflow: 'scroll',

    }; // sxPlantContainer

    const sxPlantCard = {
        border: 1,
        mb: 4,

    }; // sxPlantCard

    console.log('--- these are the selected plants', selectedPlant);

    return (
        <div>
            <button onClick={() => handleRemove(selectedPlant[0].id)}>Remove Plant From Collection</button>

            <h2>PLANT DETAILS</h2>

            {!editMode ? <button onClick={() => setEditMode(!editMode)}>Edit Info</button> : <button onClick={() => setEditMode(!editMode)}>Hide Info</button>}
            {editMode ? showInputs : <></>}

            {selectedPlant.length > 0 ? <h3>{selectedPlant[0].nickname}</h3> : <></>}
            {selectedPlant.length > 0 ? <p>Avatar URL: {selectedPlant[0].avatar_url}</p> : <></>}
            {selectedPlant.length > 0 ? <p>Birthday: {selectedPlant[0].date_added.split(`T`)[0]}</p> : <></>}
            {selectedPlant.length > 0 ? <p>Light Level: {selectedPlant[0].light_level}</p> : <></>}
            {selectedPlant.length > 0 ? <p>Water Every {selectedPlant[0].water_freq} Days</p> : <></>}
            {selectedPlant.length > 0 ? <p>Last Water Date: {selectedPlant[0].date_watered.split(`T`)[0]} Days</p> : <></>}
            {selectedPlant.length > 0 ? <p>Date Potted: {selectedPlant[0].date_potted.split(`T`)[0]}</p> : <></>}
            {selectedPlant.length > 0 ? <p>Date Fertilized: {selectedPlant[0].date_fertilized.split(`T`)[0]}</p> : <></>}
            {selectedPlant.length > 0 ? <p>Notes: {selectedPlant[0].notes}</p> : <></>}

            <Box sx={sxPlantContainer}>

                {selectedPlant.map(plant => (
                    <Box sx={sxPlantCard} key={plant.photo_id}>

                        <img src={plant.photo_url} />
                        <p>Documented: {plant.date_uploaded.split(`T`)[0]}</p>

                    </Box>
                ))}
            </Box>

        </div>
    );
}

export default PlantDetails;