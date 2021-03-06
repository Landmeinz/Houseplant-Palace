import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import plants from './plant.reducer';
import photos from './photo.reducer';
import current_date from './current_date.reducer';
import selectedPlant from './selectedPlant.reducer';
import selectedPhoto from './selectedPhoto.reducer';
import userList from './userList.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors,   // contains registrationMessage and loginMessage
  user,     // will have an id and username if someone is logged in
  plants,   // getting the user's plants from the store
  photos,   // getting the photo's of all the plants
  current_date,   // getting the current year month and day
  selectedPlant,  // getting and setting the clicked on plant
  selectedPhoto,  // getting and setting the click on plant's photos
  userList,       // getting all of the usernames registered to the app
});

export default rootReducer;
