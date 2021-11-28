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


// --- ADD NEW PHOTO --- //
function* postPhoto(action) {
    console.log('--- in postPhoto Saga!');

    try {
        yield axios.post('/api/photo', action.payload)
        // yield put({ type: 'FETCH_PHOTOS' })
        yield put({ type: 'FETCH_SELECTED_PHOTO', payload: action.payload.plantId})

    } catch (error) {
        console.log('ERROR', error);
        yield put({ type: 'ERROR postPhoto SAGA' })
    }
}; // postPhoto


// --- REMOVE SELECTED PHOTO --- // 
function* removePhoto(action) {
    console.log('--- in removePhoto Saga!');
    console.log('---- id to remove action.payload:', action.payload.photoId);
    
    const removeId = action.payload.photoId
    const plantId = action.payload.plantId

    try {
        yield axios.delete(`/api/photo/${removeId}`)
        yield put({type: 'FETCH_SELECTED_PHOTO', payload: plantId})
    } catch (error) {
        console.log('ERROR', error);
        yield put({ type: 'ERROR removePhoto SAGA' })
    }
}; // removePhoto


function* photoSaga() {
    // yield takeLatest('FETCH_PHOTOS', fetchPhotos)
    yield takeLatest('FETCH_SELECTED_PHOTO', fetchSelectedPhoto)
    yield takeLatest('ADD_PHOTO', postPhoto)
    yield takeLatest('REMOVE_PHOTO', removePhoto)
}

export default photoSaga;