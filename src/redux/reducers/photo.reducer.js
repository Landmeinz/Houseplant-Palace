const photosReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PHOTOS':
            return action.payload;

        case 'EMPTY_PHOTOS':
            return [];

        default:
            return state;
    }
}; // photosReducer

export default photosReducer;