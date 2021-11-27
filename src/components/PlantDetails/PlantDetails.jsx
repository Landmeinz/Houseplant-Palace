import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from "luxon";

// --- MUI --- // 
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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
        dispatch({ type: 'ADD_PHOTO', payload: { plantId, newPhoto } });
        setNewPhoto('');
        setAddPhotoMode(false)
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
                    value={selectedPlant.date_added?.split(`T`)[0]}
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
                    value={selectedPlant.date_watered?.split(`T`)[0]}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'date_watered' })}
                />

                <label htmlFor="date_potted">Update Date Potted: </label>
                <input
                    id="date_potted"
                    type="date"
                    value={selectedPlant.date_potted?.split(`T`)[0]}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'date_potted' })}
                />

                <label htmlFor="date_added">Update Date Fertilized: </label>
                <input
                    id="date_fertilized"
                    type="date"
                    value={selectedPlant.date_fertilized?.split(`T`)[0]}
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



    // HEADER BOX // 
    const sxHeaderBox = {
        // border: '1px solid blue',
        display: 'flex',
        justifyContent: 'space-around',
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
        width: 355,
    }; // sxHeader

    // holds edit button and add photo button
    const sxEditPhotoBox = {
        // display: 'flex',
        // flexDirection: 'row',
    }; // sxEditPhotoBox




    // holds all content of this page // 
    const sxPlantContainer = {
        // display: 'flex',
        // justifyContent: 'center',
        // border: '1px solid red',
        mb: 8,
        width: 350,
        height: 'auto',
        textAlign: 'center',

    }; // sxPlantContainer

    const sxInfoBox = {
        border: 1,
        mb: 4,
    }; // sxInfoBox



    const sxPhotCard = {
        // border: '1px solid blue',
        display: 'row',
        justifyContent: 'center',
        mb: 3,
        // width: 175,
        // height: 225,
        // boxShadow: 1,

    }; // sxPhotoBox

    // hold photo, date uploaded, and the remove button // 
    // PHOTO to control the image size, border radius, ect.
    const sxPhotoBox = {
        // border: '1px solid lightgray',
        width: 350,
        height: 'auto',
        boxShadow: 3,
        mb: .25,

    }; // sxPhotoBox


    // Photo document date Text
    const sxButtonDocDate = {
        // border: '1px solid green',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',


    }; // sxButtonDocDate

    const sxRemoveIcon = {
        // border: '1px solid red',
        width: 35,
        height: 35,
        borderRadius: '50%',
        boxShadow: 2,
        p: .25,

    }; // sxRemoveIcon


    // Photo document date Text
    const sxDocDate = {
        display: 'flex',
        fontSize: 18,
        fontWeight: 500,
        py: 2,
        textAlign: 'center',
        // border: '2px solid lightgray',

    }; // sxDocDate


    // BUTTON // 
    const sxButton = {
        display: 'fixed',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'large',
        height: 42,
        border: '.25px solid info.main',
        // bgcolor: 'info.main',
        color: 'info.main',
        boxShadow: 2,
        m: 1,
    }; // sxButton

    // BUTTON // 
    const sxRemovePlant = {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        fontWeight: 700,
        // lineHeight: 2,
        // width: 32,
        fontSize: 15,
        height: 60,
        boxShadow: 2,
        mt: 8,
        color: 'white',
    }; // sxRemovePlant


    // NICKNAME
    const sxNickname = {
        // border: '1px solid blue',
        display: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 1.1,
        mb: 2,
        textAlign: 'center',
        // backgroundColor: 'red',
    }; // sxNickname


    const sxKeyValueText = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        m: 1,
    }; // sxKeyValueText

    const sxKey = {
        // display: 'fixed',
        // justifyContent: 'center',
        // alignItems: 'center',
        fontSize: 16,
        fontWeight: 400,
        textAlign: 'right',
        width: '50%',
    }; // sxKey

    const sxValue = {
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'left',
        pl: 1.5,
        width: '50%',
    }; // sxValue







    console.log('--- PLANT DETAILS LOGS ---');
    console.log('--- these are the selected plants', selectedPlant);
    console.log('--- these are the selected photos', selectedPhoto);
    console.log('--- this is the current_date', current_date);





    return (
        <div>
            <Box sx={sxHeaderBox}>
                <Box sx={sxEditPhotoBox}>
                    {!editMode ?
                        <Button sx={sxButton} variant="outlined" onClick={() => { setEditMode(!editMode) }}>Edit Info</Button> :
                        <Button sx={sxButton} variant="outlined" onClick={() => setEditMode(!editMode)}>Hide Info</Button>}
                </Box>


                <Box sx={sxEditPhotoBox}>
                    {!addPhotoMode ?
                        <Button sx={sxButton} variant="outlined" onClick={() => { setAddPhotoMode(!addPhotoMode) }}>Add Photos</Button> :
                        <Button sx={sxButton} variant="outlined" onClick={() => { setAddPhotoMode(!addPhotoMode) }}>Hide Photos</Button>}
                </Box>

            </Box>

            <Box sx={sxPlantContainer}>

                {editMode ? showEditInputs : <></>}

                {addPhotoMode ? showPhotoInputs : <></>}


                {/* NICKNAME */}
                <Typography sx={sxNickname} color="info.main"> <span>{selectedPlant.nickname}</span> </Typography>

                {/* PLANT TYPE */}
                <Box sx={sxKeyValueText}>
                    <Typography sx={sxKey} color="info.main"> <span>Plant Type:</span> </Typography>
                    <Typography sx={sxValue} color="info.main"> <span> {selectedPlant.plant_type}</span> </Typography>
                </Box>

                {/* ADDED TO COLLECTION */}
                <Box sx={sxKeyValueText}>
                    <Typography sx={sxKey} color="info.main"> <span>Added To Collection:</span> </Typography>
                    <Typography sx={sxValue} color="info.main"> <span> {selectedPlant.date_added?.split(`T`)[0]}</span> </Typography>
                </Box>

                {/* light level integer converted to a sting description */}
                {selectedPlant.light_level === 1 ?
                    <Box sx={sxKeyValueText}>
                        <Typography sx={sxKey} color="info.main"> <span>Light Level:</span> </Typography>
                        <Typography sx={sxValue} color="info.main"> <span>Low</span> </Typography>
                    </Box> : <></>}
                {selectedPlant.light_level === 2 ?
                    <Box sx={sxKeyValueText}>
                        <Typography sx={sxKey} color="info.main"> <span>Light Level:</span> </Typography>
                        <Typography sx={sxValue} color="info.main"> <span>Medium</span> </Typography>
                    </Box> : <></>}
                {selectedPlant.light_level === 3 ?
                    <Box sx={sxKeyValueText}>
                        <Typography sx={sxKey} color="info.main"> <span>Light Level:</span> </Typography>
                        <Typography sx={sxValue} color="info.main"> <span>High</span> </Typography>
                    </Box> : <></>}

                {/* WATER EVERY # DAYS */}
                <Box sx={sxKeyValueText}>
                    <Typography sx={sxKey} color="info.main"> <span>Water Every</span> </Typography>
                    <Typography sx={sxValue} color="info.main"> <span>{selectedPlant.water_freq} Days</span> </Typography>
                </Box>

                {/* DATE POTTED */}
                <Box sx={sxKeyValueText}>
                    <Typography sx={sxKey} color="info.main"> <span>Date Potted:</span> </Typography>
                    <Typography sx={sxValue} color="info.main"> <span>{selectedPlant.date_potted?.split(`T`)[0]}</span> </Typography>
                </Box>

                {/* LAST WATER DATE */}
                <Box sx={sxKeyValueText}>
                    <Typography sx={sxKey} color="info.main"> <span>Last Water:</span> </Typography>
                    <Typography sx={sxValue} color="info.main"> <span>{selectedPlant.date_watered?.split(`T`)[0]}</span> </Typography>
                </Box>

                {/* DATE FERTILIZED */}
                <Box sx={sxKeyValueText}>
                    <Typography sx={sxKey} color="info.main"> <span>Date Fertilized:</span> </Typography>
                    <Typography sx={sxValue} color="info.main"> <span>{selectedPlant.date_fertilized?.split(`T`)[0]}</span> </Typography>
                </Box>

                {/* NOTES */}
                <Box sx={sxKeyValueText}>
                    <Typography sx={sxKey} color="info.main"> <span>Plant Notes:</span> </Typography>
                    <Typography sx={sxValue} color="info.main"> <span>{selectedPlant.notes}</span> </Typography>
                </Box>

                {/* PHOTOS */}
                {selectedPhoto.map(photo => (
                    <Box sx={sxPhotCard} key={photo.id}>

                        <CardMedia sx={sxPhotoBox} component="img" image={photo.photo_url} />

                        <Box sx={sxButtonDocDate}>
                            <RemoveCircleIcon sx={sxRemoveIcon} color="error" fontSize="large"
                                onClick={() => handleRemovePhoto(photo.id, photo.plant_id)} />
                            <Typography sx={sxDocDate} color="info.main"><>Uploaded: {photo.date_uploaded.split(`T`)[0]}</></Typography>
                        </Box>

                    </Box>
                ))}

                <Button sx={sxRemovePlant} variant="contained" color="error" onClick={() => handleRemove(selectedPlant.id)}>Remove Plant From Collection</Button>
            </Box>
        </div>
    );
}

export default PlantDetails;