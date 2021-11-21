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
    console.log('--- in selectedPlant Saga!');
    try {
        const response = yield axios.get(`/api/plant/${action.payload}`)
        console.log('--- selectedPlant saga response.data', response.data);

        yield put({ type: 'SET_SELECTED_PLANT', payload: response.data })

    } catch (error) {
        console.log('ERROR selectedPlant Saga', error);
    }
}; // selectedPlant


// --- REMOVE SELECTED PLANT --- // 
function* removePlant(action) {
    console.log('--- in removePlant Saga!');
    console.log('---- id to remove action.payload:', action.payload);

    const removeId = action.payload

    try {
        yield axios.delete(`/api/plant/${removeId}`)
        yield put({ type: 'FETCH_PLANTS' })

    } catch (error) {
        console.log('ERROR', error);
        yield put({ type: 'ERROR removePlant SAGA' })
    }
}; // removePlant


// --- UPDATE SELECTED PLANT --- // 
function* updateSelectedPlant(action) {
    console.log('--- in updateSelectedPlant Saga!');
    console.log('---- id to remove action.payload:', action.payload.id);

    const updateId = action.payload.id

    try {
        yield axios.put(`/api/plant/${updateId}`, action.payload)
        // yield put({ type: 'FETCH_SELECTED_PLANT' })
        yield put({ type: 'FETCH_PLANTS' })

    } catch (error) {
        console.log('ERROR', error);
        yield put({ type: 'ERROR updateSelectedPlant SAGA' })
    }
}; // updateSelectedPlant



// --- UPDATE SELECTED PLANT WATER DATE FROM TAPPING ON MARK WATERED ON DASHBOARD --- // 
function* updatePlantWaterDate(action) {
    console.log('--- in updatePlantWaterDate Saga!');
    console.log('---- id to update action.payload:', action.payload.id);

    const updateId = action.payload.id

    try {
        yield axios.put(`/api/plant/water/${updateId}`)
        yield put({ type: 'FETCH_PLANTS' })
        yield put({ type: 'FETCH_SELECTED_PLANTS'})

    } catch (error) {
        console.log('ERROR', error);
        yield put({ type: 'ERROR updatePlantWaterDate SAGA' })
    }
}; // updatePlantWaterDate



function* plantSaga() {
    yield takeLatest('FETCH_PLANTS', fetchPlants)
    yield takeLatest('ADD_PLANT', postPlant)
    yield takeLatest('FETCH_SELECTED_PLANT', selectedPlant)
    yield takeLatest('REMOVE_PLANT', removePlant)
    yield takeLatest('UPDATE_SELECTED_PLANT', updateSelectedPlant)
    yield takeLatest('UPDATE_WATER_DATE', updatePlantWaterDate)
}; // plantSaga

export default plantSaga;