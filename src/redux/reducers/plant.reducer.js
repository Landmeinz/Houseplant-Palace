const plantsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLANTS':
            console.log('this is the plants reducer action.payload', action.payload);
            return action.payload;

        default:
            return state;
    }
}; // plantsReducer

export default plantsReducer;