import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// --- GET all photos --- //
function* fetchPhotos() {
    console.log('--- in fetchPhotos Saga!');

    try {
        const response = yield axios.get('/api/photo')
        // console.log('--- fetchPhotos saga response.data', response.data);

        yield put({ type: 'SET_PHOTOS', payload: response.data })

    } catch (err) {
        console.log('Error in fetchPhotos Saga', err);
    }
}; // fetchPhotos


// --- SELECTED PHOTOS --- // 
function* fetchSelectedPhoto(action) {
    console.log('-- hit fetchSelectedPhoto; action.payload', action.payload);
    
    try {
        const response = yield axios.get(`/api/photo/${action.payload}`)
        console.log('--- fetchPhotos saga response.data', response.data);
        
        yield put({ type: 'SET_SELECTED_PHOTO', payload: response.data })

    } catch (err) {
        console.log('Error in fetchPhotos Saga', err);
    }
}; // fetchSelectedPhoto




function* photoSaga() {
    yield takeLatest('FETCH_PHOTOS', fetchPhotos)
    yield takeLatest('FETCH_SELECTED_PHOTO', fetchSelectedPhoto)
}

export default photoSaga;