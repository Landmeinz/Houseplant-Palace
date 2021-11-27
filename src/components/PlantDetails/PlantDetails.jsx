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
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
        // border: '1px solid red',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: .5,
        mb: 2,
        mt: 2,
        mx: 'auto',
        width: '90%',
    }; // sxEditFormBox

    const sxInput = {
        mb: 2,
    }; // sxInput

    // BUTTON // 
    const sxEditFormButton = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 500,
        lineHeight: 2,
        width: '80%',
        height: 60,
        border: '.25px solid primary',
        mb: 2,
        boxShadow: 2,
        mx: 'auto',
        color: 'info.main',
    }; // sxAddPlant



    // --- EDIT info display when button is clicked --- // 
    const showEditInputs = (
        <form onSubmit={handleSubmit}>

            <Box sx={sxEditFormBox}>

                {/* NICKNAME */}
                <TextField sx={sxInput}
                    required
                    id="nickname"
                    type="text"
                    label="Nickname"
                    value={selectedPlant.nickname}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'nickname' })}
                    placeholder="Planty McPlanterson"
                />

                {/* PLANT_TYPE */}
                <TextField sx={sxInput}
                    required
                    type="text"
                    id="plant_type"
                    label="Plant Type"
                    value={selectedPlant.plant_type}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'plant_type' })}
                    placeholder="Update Plant Type"
                />

                {/* AVATAR_URL */}
                <TextField sx={sxInput}
                    required
                    id="avatar_url"
                    type="text"
                    label="Avatar Photo URL"
                    value={selectedPlant.avatar_url}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'avatar_url' })}
                    placeholder="yourAvatarURLGoesHere.jpg"
                />

                {/* DATE ADDED */}
                <TextField sx={sxInput}
                    required
                    type="date"
                    id="date_added"
                    label="Date Added To Collection"
                    value={selectedPlant.date_added?.split(`T`)[0]}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'date_added' })}
                    InputLabelProps={{ shrink: true }}
                />

                {/* LIGHT_LEVEL */}
                <FormControl required>
                    <InputLabel id="light_level_label" >Light Level</InputLabel>
                    <Select sx={sxInput} variant="outlined"
                        labelId="light_level_label"
                        label="Light Level"
                        id="light_level"
                        name="light_level"
                        value={selectedPlant.light_level}
                        onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'light_level' })}
                    >
                        <MenuItem value={1}>Low</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={3}>High</MenuItem>
                    </Select>
                </FormControl>

                {/* WATER_FREQ */}
                <TextField sx={sxInput}
                    required
                    id="water_freq"
                    type="number"
                    value={selectedPlant.water_freq}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'water_freq' })}
                    label="Number of Days Between Watering"
                />

                {/* DATE_WATERED */}
                <TextField sx={sxInput}
                    required
                    id="date_watered"
                    type="date"
                    label="Date Last Watered"
                    value={selectedPlant.date_watered?.split(`T`)[0]}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'date_watered' })}
                    InputLabelProps={{ shrink: true }}
                />

                {/* DATE_POTTED */}
                <TextField sx={sxInput}
                    required
                    id="date_potted"
                    type="date"
                    label="Date Potted"
                    value={selectedPlant.date_potted?.split(`T`)[0]}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'date_potted' })}
                    InputLabelProps={{ shrink: true }}
                />

                {/* DATE_FERTILIZED */}
                <TextField sx={sxInput}
                    required
                    id="date_added"
                    type="date"
                    label="Date Fertilized"
                    value={selectedPlant.date_fertilized?.split(`T`)[0]}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'date_fertilized' })}
                    InputLabelProps={{ shrink: true }}
                />

                {/* NOTES */}
                <TextField sx={sxInput}
                    id="notes"
                    type="text"
                    label="Include Any Plant Notes"
                    value={selectedPlant.notes}
                    onChange={(event) => dispatch({ type: 'EDIT_PLANT', payload: event.target.value, key: 'notes' })}
                    placeholder="Don't over water!"
                    multiline
                    maxRows={3}
                />

                <Button sx={sxEditFormButton} type="submit" size="large" variant="contained" color="secondary">Edit This Plant</Button>

            </Box>
        </form>

    ); // showEditInputs

    const sxPhotoFormBox = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '90%',
        mx: 'auto',
        mt: 2,
    }; // sxPhotoFormBox

    // BUTTON // 
    const sxAddPhoto = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 500,
        lineHeight: 2,
        width: '80%',
        height: 60,
        border: '.25px solid primary',
        mb: 4,
        boxShadow: 2,
        mx: 'auto',
        color: 'info.main',
    }; // sxAddPlant


    // -- Display the photo url input text on button press -- // 
    const showPhotoInputs = (
        <form onSubmit={() => handleNewPhoto(selectedPlant.id)}>
            <Box sx={sxPhotoFormBox}>
                <TextField sx={sxInput}
                    id="photo_url"
                    required
                    label="Provide Photo URL"
                    value={newPhoto}
                    onChange={(event) => setNewPhoto(event.target.value)}
                    placeholder="yourPhotoURLGoesHere.jpg"
                />
                <Button type="submit" sx={sxAddPhoto} size="large" variant="contained" color="secondary">Add New Plant Photo</Button>
            </Box>
        </form>
    ); // showPhotoInputs


    // TODAY'S DATE //
    const sxDateBox = {
        // border: '1px solid blue',
        position: 'sticky',
        top: 0,
        background: 'white',
        zIndex: 50,
        mb: 2,
        mx: 'auto',

    }; // sxDateBox


    //   // DATE font size and properties
    //   const sxDateHeader = {
    //     // border: '1px solid blue',
    //     fontSize: 22,
    //     fontWeight: 500,
    //     p: 2,
    //     textAlign: 'center',
    //     bgcolor: 'secondary.main',

    //   }; // sxHeader


    // HEADER BOX // 
    const sxHeaderBox = {
        // border: '1px solid blue',
        display: 'flex',
        position: 'sticky',
        justifyContent: 'space-around',
        alightItems: 'center',
        top: 0,
        bgcolor: 'secondary.main',
        zIndex: 50,
        mx: 'auto',
        mb: 2,

    }; // sxHeaderBox

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
        height: 65,
    }; // sxEditPhotoBox




    // holds all content of this page // 
    const sxPlantContainer = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // border: '1px solid red',
        mb: 8,
        width: 350,
        height: 'auto',

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
        fontSize: 'medium',
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
        width: '85%',
        fontSize: 15,
        height: 60,
        boxShadow: 2,
        mt: 6,
        mx: 'auto',
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
        mb: 1.5,
        textAlign: 'center',
        // backgroundColor: 'red',
    }; // sxNickname


    const sxKeyValueText = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        m: .18,
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


    const sxKeyValueTextLast = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // m: 1,
        mb: 4,
    }; // sxKeyValueText








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
                        <Button sx={sxButton} variant="outlined" onClick={() => setEditMode(!editMode)}>Hide Edit</Button>}
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

                {/* LAST WATER DATE */}
                <Box sx={sxKeyValueText}>
                    <Typography sx={sxKey} color="info.main"> <span>Last Water:</span> </Typography>
                    <Typography sx={sxValue} color="info.main"> <span>{selectedPlant.date_watered?.split(`T`)[0]}</span> </Typography>
                </Box>

                {/*  NEXT WATER DATE */}
                <Box sx={sxKeyValueText}>
                    <Typography sx={sxKey} color="info.main"> <span>Next Water:</span> </Typography>
                    <Typography sx={sxValue} color="primary.main"> <span> {selectedPlant.next_water?.split(`T`)[0]}</span> </Typography>
                </Box>

                {/* DATE POTTED */}
                <Box sx={sxKeyValueText}>
                    <Typography sx={sxKey} color="info.main"> <span>Date Potted:</span> </Typography>
                    <Typography sx={sxValue} color="info.main"> <span>{selectedPlant.date_potted?.split(`T`)[0]}</span> </Typography>
                </Box>


                {/* DATE FERTILIZED */}
                <Box sx={sxKeyValueText}>
                    <Typography sx={sxKey} color="info.main"> <span>Date Fertilized:</span> </Typography>
                    <Typography sx={sxValue} color="info.main"> <span>{selectedPlant.date_fertilized?.split(`T`)[0]}</span> </Typography>
                </Box>

                {/* NOTES */}
                <Box sx={sxKeyValueTextLast}>
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