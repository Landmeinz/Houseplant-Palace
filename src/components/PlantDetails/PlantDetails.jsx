import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from "luxon";

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
    const selectedPhoto = useSelector((store) => store.selectedPhoto);
    const current_date = useSelector((store) => store.current_date);

    const [editMode, setEditMode] = useState(false);
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [newPhoto, setNewPhoto] = useState('');

    const dt = DateTime.local(current_date.year, current_date.month, current_date.day);
    console.log('this is the dt from the server', dt);

    console.log('this is the dt from the server using fromISO');
    console.log(DateTime.fromISO(current_date.current_date));


    const handleSubmit = (event) => {
        console.log('--- CLICKED --- hit handleSubmit to update details');
        event.preventDefault();

        dispatch({ type: 'UPDATE_SELECTED_PLANT', payload: selectedPlant });
        setEditMode(false)
    } // handleSubmit


    const handleRemove = (plantId) => {
        console.log('--- CLICKED --- hit handleRemove');
        dispatch({ type: 'REMOVE_PLANT', payload: plantId });
        history.push('/collection')
    }; // handleRemove


    const handleRemovePhoto = (photoId, plantId) => {
        console.log('--- CLICKED --- hit handleRemovePhoto');
        dispatch({ type: 'REMOVE_PHOTO', payload: { photoId, plantId } });
    }; // handleRemoveImage


    const handleNewPhoto = (plantId) => {
        console.log('--- CLICKED --- hit handleNewPhoto');
        dispatch({ type: 'ADD_PHOTO', payload: { plantId, newPhoto} });
        setNewPhoto('');
    }; // handleNewPhoto


    const sxEditFormBox = {
        display: 'flex',
        flexDirection: 'column',
        gap: .5,
        border: 1,
        mb: 4,
    }; // sxEditFormBox

    // --- EDIT info display when button is clicked --- // 
    const showEditInputs = (

        <form onSubmit={handleSubmit}>

            <Box sx={sxEditFormBox}>
                <button type="submit">Submit Edited Plant</button>
                <label htmlFor="nickname">Update Plant Nickname: </label>
                <input
                    id="nickname"
                    type="text"
                    value={selectedPlant.nickname}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'nickname' })}
                    placeholder="Set New Nickname"
                />

                <label htmlFor="avatar_url">Update Plant Avatar URL: </label>
                <input
                    id="avatar_url"
                    type="text"
                    value={selectedPlant.avatar_url}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'avatar_url' })}
                    placeholder="Update Avatar URL"
                />
                <label htmlFor="date_added">Date Added To Collection: </label>
                <input
                    id="date_added"
                    type="date"
                    value={selectedPlant.date_added}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'date_added' })}
                />

                <label htmlFor="plant_type">Update Plant Type: </label>
                <input
                    id="plant_type"
                    type="text"
                    value={selectedPlant.plant_type}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'plant_type' })}
                    placeholder="Update Plant Type"
                />

                <label htmlFor="light_level">Update Light Level: </label>
                <select
                    value={selectedPlant.light_level}
                    name="light_level"
                    id="light_level"
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'light_level' })}
                >
                    <option hidden value="null">Light Level</option>
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                </select>

                <label htmlFor="water_freq">Update Days Between Watering: </label>
                <input
                    id="water_freq"
                    type="number"
                    value={selectedPlant.water_freq}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'water_freq' })}
                    placeholder="Update Number of Days Between Watering"
                />

                <label htmlFor="date_watered">Update Date Last Watered: </label>
                <input
                    id="date_watered"
                    type="date"
                    value={selectedPlant.date_watered}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'date_watered' })}
                />

                <label htmlFor="date_potted">Update Date Potted: </label>
                <input
                    id="date_potted"
                    type="date"
                    value={selectedPlant.date_potted}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'date_potted' })}
                />

                <label htmlFor="date_added">Update Date Fertilized: </label>
                <input
                    id="date_fertilized"
                    type="date"
                    value={selectedPlant.date_fertilized}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'date_fertilized' })}
                />

                <label htmlFor="notes">Update Plant Notes: </label>
                <input
                    id="notes"
                    type="text"
                    value={selectedPlant.notes}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'notes' })}
                    placeholder="Update Plant Notes"
                />
            </Box>
        </form >

    ); // showEditInputs


    // -- Display the photo url input text on button press -- // 
    const showPhotoInputs = (
        <form onSubmit={() => handleNewPhoto(selectedPlant.id)}>
            <label htmlFor="photo_url">Provide Photo URL: </label>
            <input
                id="photo_url"
                type="text"
                value={newPhoto}
                onChange={(event) => setNewPhoto(event.target.value)}
                placeholder="seedling-solid.svg"
            />
            <button type="submit">Add New Plant Photo</button>

        </form>
    ); // showPhotoInputs


    // holds all content of this page // 
    const sxPlantContainer = {
        border: 1,
        m: 2,
        overflow: 'scroll',

    }; // sxPlantContainer

    const sxInfoBox = {
        border: 1,
        mb: 4,
    }; // sxInfoBox

    // hold photo, date uploaded, and the remove button // 
    const sxPhotoBox = {
        border: 1,
        mb: 6,

    }; // sxPlantCard

    console.log('--- these are the selected plants', selectedPlant);
    console.log('--- these are the selected photos', selectedPhoto);
    console.log('--- this is the current_date', current_date);


    return (
        <div>

            <button onClick={() => handleRemove(selectedPlant.id)}>Remove Plant From Collection</button>
            <Box sx={sxPlantContainer}>

                {!editMode ? <button onClick={() => { setEditMode(!editMode) }}>Edit Plant Info</button> : <button onClick={() => setEditMode(!editMode)}>Hide Info</button>}
                {editMode ? showEditInputs : <></>}

                {!addPhotoMode ? <button onClick={() => { setAddPhotoMode(!addPhotoMode) }}>Add More Photos</button> : <button onClick={() => { setAddPhotoMode(!addPhotoMode) }}>Hide</button> }
                {addPhotoMode ? showPhotoInputs : <></>}

                {selectedPlant &&
                    <>
                        <h3>{selectedPlant.nickname}</h3>
                        <p>Avatar URL:  {selectedPlant.avatar_url}</p>
                        <p>Plant Type:  {selectedPlant.plant_type}</p>
                        <p>Birthday:    {selectedPlant.date_added}</p>
                        <p>Light Level: {selectedPlant.light_level}</p>
                        <p>Water Every  {selectedPlant.water_freq} Days</p>
                        <p>Date Potted: {selectedPlant.date_potted}</p>
                        <p>Last Water Date: {selectedPlant.date_watered}</p>
                        <p>Notes:           {selectedPlant.notes}</p>
                        <p>Date Fertilized: {selectedPlant.date_fertilized}</p>
                    </>}



                {selectedPhoto.map(photo => (
                    <Box sx={sxPhotoBox} key={photo.id}>

                        <img src={photo.photo_url} />
                        <p>Documented: {photo.date_uploaded.split(`T`)[0]}</p>

                        <button onClick={() => handleRemovePhoto(photo.id, photo.plant_id)}>Remove Image</button>

                    </Box>
                ))}
            </Box>

        </div>
    );
}

export default PlantDetails;