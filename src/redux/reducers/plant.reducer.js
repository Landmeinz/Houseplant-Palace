const plantsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLANTS':
            return action.payload;

        default:
            return state;
    }
}; // plantsReducer

export default plantsReducer;