import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchPlants() {
    console.log('--- in fetchPlants Saga!');

    try {
        const response = yield axios.get('/api/plant')
        // console.log('--- fetchPlants saga response.data', response.data);

        yield put({ type: 'SET_PLANTS', payload: response.data })

    } catch (error) {
        console.log('ERROR fetchPlants Saga', error);
    }
}; // fetchPlants


function* postPlant(action) {
    console.log('--- in postPlant Saga!');

    try {
        yield axios.post('/api/plant', action.payload)
        yield put({ type: 'FETCH_PLANTS' })

    } catch (error) {
        console.log('ERROR', error);
        yield put({ type: 'ERROR postPlant SAGA' })
    }
}; // postPlant


function* selectedPlant(action) {
    try {
        const response = yield axios.get(`/api/plant/${action.payload}`)
        console.log('--- selectedPlant saga response.data', response.data);

        yield put({ type: 'SET_SELECTED_PLANT', payload: response.data })

    } catch (error) {
        console.log('ERROR fetchPlants Saga', error);
    }
}; // selectedPlant


function* plantSaga() {
    yield takeLatest('FETCH_PLANTS', fetchPlants)
    yield takeLatest('ADD_PLANT', postPlant)
    yield takeLatest('FETCH_SELECTED_PLANT', selectedPlant)
}; // plantSaga

export default plantSaga;