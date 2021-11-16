import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPhotos() {
    console.log('--- in fetchPhotos Saga!');

    try {
        const response = yield axios.get('/api/photo')
        // console.log('--- fetchPhotos saga response.data', response.data);

        yield put({ type: 'SET_PHOTOS', payload: response.data })

    } catch (err) {
        console.log('Error in fetchPhotos Saga', err);
    }
}


function* photoSaga() {
    yield takeLatest('FETCH_PHOTOS', fetchPhotos)
}

export default photoSaga;