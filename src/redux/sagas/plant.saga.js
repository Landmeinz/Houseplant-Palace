import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// --- GET ALL PLANTS --- //
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


// --- ADD NEW PLANT --- //
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


// --- SELECTED PLANT --- //
function* selectedPlant(action) {
    try {
        const response = yield axios.get(`/api/plant/${action.payload}`)
        console.log('--- selectedPlant saga response.data', response.data);

        yield put({ type: 'SET_SELECTED_PLANT', payload: response.data })

    } catch (error) {
        console.log('ERROR fetchPlants Saga', error);
    }
}; // selectedPlant


// --- REMOVE SELECTED PLANT --- // 
function* removePlant(action) {
    console.log('--- in removePlant Saga!');
    console.log('---- id to remove action.payload:', action.payload);
    
    const removeId = action.payload

    try {
        yield axios.delete(`/api/plant/${removeId}`)
        yield history.push('/collection')

    } catch (error) {
        console.log('ERROR', error);
        yield put({ type: 'ERROR removePlant SAGA' })
    }
}; // removePlant



function* plantSaga() {
    yield takeLatest('FETCH_PLANTS', fetchPlants)
    yield takeLatest('ADD_PLANT', postPlant)
    yield takeLatest('FETCH_SELECTED_PLANT', selectedPlant)
    yield takeLatest('REMOVE_PLANT', removePlant)
}; // plantSaga

export default plantSaga;