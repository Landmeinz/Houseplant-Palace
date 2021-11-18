const selectedPhotoReducer = (state = [], action) => {

    console.log('');
    
    switch (action.type) {
        case 'SET_SELECTED_PHOTO':
            console.log('--- this is the selectedPhotoReducer reducer action.payload', action.payload);
            return action.payload;

        default:
            return state;
    }
}; // plantsReducer

export default selectedPhotoReducer;