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
        avatar_url: selectedPlant.avatar_url,
        date_added: selectedPlant.date_added,
        plant_type: selectedPlant.plant_type,
        light_level: selectedPlant.light_level,
        water_freq: selectedPlant.water_freq,
        date_watered: selectedPlant.date_watered,
        date_potted: selectedPlant.date_potted,
        date_fertilized: selectedPlant.date_fertilized,
        notes: selectedPlant.notes
    }; // existingPlant

    console.log('--- this is the existingPlant --- ', existingPlant);

    const [editPlant, setEditPlant] = useState(existingPlant);

    console.log('--- this is the editPlant --- ', editPlant);


    const handleNameChange = (event, property) => {
        setEditPlant({
            ...editPlant,
            [property]: event.target.value
        })
    } // handleNameChange


    const handleSubmit = (event) => {
        console.log('--- CLICKED --- hit handleSubmit of editPlant');
        event.preventDefault();
        console.log('--- the editPlant:', editPlant);

        dispatch({ type: 'EDIT_PLANT', payload: editPlant });
        // setEditPlant(emptyPlant);
    } // handleSubmit


    const handleRemove = (plantId) => {
        console.log('--- CLICKED --- hit handleRemove');
        dispatch({ type: 'REMOVE_PLANT', payload: plantId });
        history.push('/collection')
    }; // handleRemove


    const handleRemovePhoto = (photoId, plantId) => {
        console.log('--- CLICKED --- hit handleRemovePhoto');
        dispatch({ type: 'REMOVE_PHOTO', payload: {photoId, plantId} });
    }; // handleRemoveImage


    // const handleEdit = (plant) => {
    //     console.log('--- CLICKED --- hit handleEdit');
    //     console.log('--- the editPlant:', editPlant);

    //     setEditMode(!editMode)
    //     dispatch({ type: 'FETCH_SELECTED_PLANT', payload: plant.id });
    // }


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
                    onChange={(event) => dispatch({type: 'EDIT_PLANT', payload: 'yes'})}
                // placeholder="Set New Nickname"
                />

                {/* {selectedPlant.map(plant => (
                    <>
                        <label htmlFor="nickname">Update Plant Nickname: </label>
                        <input
                            id="nickname"
                            type="text"
                            value={plant.nickname}
                            onChange={(event) => handleNameChange(event, 'nickname')}
                        // placeholder="Set New Nickname"
                        />

                        <label htmlFor="avatar_url">Update Plant Avatar URL: </label>
                        <input
                            id="avatar_url"
                            type="text"
                            value={plant.avatar_url}
                            onChange={(event) => handleNameChange(event, 'avatar_url')}
                            placeholder="Update Avatar URL"
                        />

                        <label htmlFor="date_added">Date Added To Collection: </label>
                        <input
                            id="date_added"
                            type="date"
                            value={plant.date_added.split(`T`)[0]}
                            onChange={(event) => handleNameChange(event, 'date_added')}
                        />

                        <label htmlFor="plant_type">Date Added To Collection: </label>
                        <input
                            id="plant_type"
                            type="text"
                            value={plant.plant_type}
                            onChange={(event) => handleNameChange(event, 'plant_type')}
                            placeholder="Update Plant Type"
                        />

                        <label htmlFor="light_level">Update Light Level: </label>
                        <select
                            value={plant.light_level}
                            name="light_level"
                            id="light_level"
                            onChange={(event) => handleNameChange(event, 'light_level')}
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
                            value={plant.water_freq}
                            onChange={(event) => handleNameChange(event, 'water_freq')}
                            placeholder="Update Number of Days Between Watering"
                        />

                        <label htmlFor="date_watered">Update Date Last Watered: </label>
                        <input
                            id="date_watered"
                            type="date"
                            value={plant.date_watered.split(`T`)[0]}
                            onChange={(event) => handleNameChange(event, 'date_watered')}
                        />

                        <label htmlFor="date_potted">Update Date Potted: </label>
                        <input
                            id="date_potted"
                            type="date"
                            value={plant.date_potted.split(`T`)[0]}
                            onChange={(event) => handleNameChange(event, 'date_potted')}
                        />

                        <label htmlFor="date_added">Update Date Fertilized: </label>
                        <input
                            id="date_fertilized"
                            type="date"
                            value={plant.date_fertilized.split(`T`)[0]}
                            onChange={(event) => handleNameChange(event, 'date_fertilized')}
                        />

                        <label htmlFor="notes">Update Plant Notes: </label>
                        <input
                            id="notes"
                            type="text"
                            value={plant.notes}
                            onChange={(event) => handleNameChange(event, 'notes')}
                            placeholder="Update Plant Notes"
                        />

                        <button type="submit">Submit Edited Plant</button>
                    </>
                ))} */}
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

            <button onClick={() => handleRemove(selectedPlant[0].id)}>Remove Plant From Collection</button>
            <Box sx={sxPlantContainer}>

                {!editMode ? <button onClick={() => { setEditMode(!editMode) }}>Edit Info</button> : <button onClick={() => setEditMode(!editMode)}>Hide Info</button>}

                {/* <button onClick={() => handleEdit(plant)}>Edit Info</button> */}

                {editMode ? showInputs : <></>}

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