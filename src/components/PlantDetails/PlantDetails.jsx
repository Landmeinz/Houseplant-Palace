import React, { useState, useEffect } from 'react';
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
    const selectedPhoto = useSelector((store) => store.selectedPhoto);
    const current_date = useSelector((store) => store.current_date);

    const [editMode, setEditMode] = useState(false);


    // const emptyPlant = {
    //     nickname: '',
    //     avatar_url: '',
    //     date_added: '',
    //     plant_type: '',
    //     light_level: '',
    //     water_freq: '',
    //     date_watered: '',
    //     date_potted: '',
    //     date_fertilized: '',
    //     notes: null
    // }; // emptyPlant


    const existingPlant = {
        nickname: selectedPlant.nickname,
        // avatar_url: selectedPlant.avatar_url,
        // date_added: selectedPlant.date_added,
        // plant_type: selectedPlant.plant_type,
        // light_level: selectedPlant.light_level,
        // water_freq: selectedPlant.water_freq,
        // date_watered: selectedPlant.date_watered,
        // date_potted: selectedPlant.date_potted,
        // date_fertilized: selectedPlant.date_fertilized,
        // notes: selectedPlant.notes
    }; // existingPlant

    console.log('--- this is the existingPlant --- ', existingPlant);

    const [editPlant, setEditPlant] = useState(existingPlant);



    const handleNameChange = (event, property) => {
        setEditPlant({
            ...editPlant,
            [property]: event.target.value
        })
    } // handleNameChange


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



    const sxEditFormBox = {
        display: 'flex',
        flexDirection: 'column',
        gap: .5,
        border: 1,
        mb: 4,
    }; // sxEditFormBox

    // --- EDIT info --- // 
    const showInputs = (

        <form onSubmit={handleSubmit}>

            {/* <p>{selectedPlant[0].nickname}</p> */}
            {/* {selectedPlant > 0 ? <h2>{selectedPlant[0].nickname}</h2> : <></>} */}

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
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'avatar_url'})}
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

    ); // showInputs


    const sxPlantContainer = {
        border: 1,
        m: 2,
        overflow: 'scroll',

    }; // sxPlantContainer

    const sxInfoBox = {
        border: 1,
        mb: 4,
    }; // sxInfoBox

    const sxPhotoBox = {
        border: 1,
        mb: 6,

    }; // sxPlantCard

    console.log('--- these are the selected plants', selectedPlant);
    console.log('--- these are the selected photos', selectedPhoto);
    console.log('--- this is the current_date', current_date);

    // dispatch({ type: 'FETCH_SELECTED_PLANT', payload: selectedPlant[0].id })
    return (
        <div>

            <button onClick={() => handleRemove(selectedPlant.id)}>Remove Plant From Collection</button>
            <Box sx={sxPlantContainer}>

                {!editMode ? <button onClick={() => { setEditMode(!editMode) }}>Edit Info</button> : <button onClick={() => setEditMode(!editMode)}>Hide Info</button>}

                {editMode ? showInputs : <></>}

                <button>Add More Photos</button>

                {/* {selectedPlant.map(plant => (
                    <Box sx={sxInfoBox} key={plant.id}>
                        <h2>PLANT DETAILS</h2>

                        {!editMode ? <button onClick={() => { setEditMode(!editMode), dispatch({ type: 'FETCH_SELECTED_PLANT', payload: plant.id }) }}>Edit Info</button> : <button onClick={() => setEditMode(!editMode)}>Hide Info</button>}

                        <button onClick={() => handleEdit(plant)}>Edit Info</button>

                        {editMode ? showInputs : <></>}

                        <h3>{plant.nickname}</h3>

                        <p>Avatar URL: {plant.avatar_url}</p>
                        <p>Plant Type: {plant.plant_type}</p>
                        <p>Birthday: {plant.date_added.split(`T`)[0]}</p>
                        <p>Light Level: {plant.light_level}</p>
                        <p>Water Every {plant.water_freq} Days</p>
                        <p>Date Potted: {plant.date_potted.split(`T`)[0]}</p>
                        <p>Last Water Date: {plant.date_watered.split(`T`)[0]}</p>
                        <p>Notes: {plant.notes}</p>
                        <p>Date Fertilized: {plant.date_fertilized.split(`T`)[0]}</p>
                    </Box>
                ))} */}

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