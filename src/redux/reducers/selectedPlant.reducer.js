const selectedPlantReducer = (state = {}, action) => {

    console.log('');

    switch (action.type) {
        case 'SET_SELECTED_PLANT':
            console.log('--- this is the selectedPlantReducer SET_SELECTED_PLANT reducer action.payload', action.payload);
            return action.payload[0];

        case 'EDIT_PLANT':
            console.log('--- this is the selectedPlantReducer EDIT_PLANT reducer action.payload', action.payload);
            return {...state, [action.key]: action.payload}

        default:
            return state;
    }
}; // plantsReducer

export default selectedPlantReducer;


// const handleNameChange = (event, property) => {
//     setNewPlant({
//       ...newPlant,
//       [property]: event.target.value
//     })
//   } // handleNameChange