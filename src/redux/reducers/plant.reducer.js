const plantsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLANTS':
            console.log('this is the SET_PLANTS reducer action.payload', action.payload);
            return action.payload;

        case 'EMPTY_PLANTS':
            console.log('this is the EMPTY_PLANTS reducer action.payload', action.payload);
            return [];

        default:
            return state;
    }
}; // plantsReducer

export default plantsReducer;