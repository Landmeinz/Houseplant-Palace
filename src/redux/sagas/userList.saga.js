import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



// fetch all of the users in the app
function* fetchUserList() {

    console.log('--- in fetchUserList saga');

    try {
        // const config = {
        //   headers: { 'Content-Type': 'application/json' },
        //   withCredentials: true,
        // };

        const response = yield axios.get('/api/userList'); // config
        console.log('--- this is the response from userList Saga', response);
        

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'SET_USER_LIST', payload: response.data });
        console.log('--- does this log? ');
        
    } catch (error) {
        console.log('User get request failed', error);
    }
}; // fetchUserList



function* userListSaga() {
    yield takeLatest('FETCH_USER_LIST', fetchUserList)
}

export default userListSaga;
