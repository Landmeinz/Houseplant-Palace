import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPlants() {
    console.log('--- in fetchPlants Saga!');

    try {
        const response = yield axios.get('/api/plant')
        console.log('--- fetchPlants saga response.data', response.data);

        yield put({ type: 'SET_PLANTS', payload: response.data })

    } catch (err) {
        console.log('Error in fetchPlants Saga', err);
    }
}


function* plantSaga() {
    yield takeLatest('FETCH_PLANTS', fetchPlants)
}

export default plantSaga;