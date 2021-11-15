const photosReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PHOTOS':
            return action.payload;

        default:
            return state;
    }
}; // photosReducer

export default photosReducer;