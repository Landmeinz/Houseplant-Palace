const selectedPlantReducer = (state = [], action) => {

    console.log('');
    
    switch (action.type) {
        case 'SET_SELECTED_PLANT':
            console.log('--- this is the selectedPlantReducer reducer action.payload', action.payload);
            return action.payload;

        default:
            return state;
    }
}; // plantsReducer

export default selectedPlantReducer;