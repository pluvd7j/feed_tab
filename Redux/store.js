import { applyMiddleware, combineReducers, createStore } from "redux";
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import addData from "./Reducers/addData";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
const persistConfig = {
    key: 'reducer',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
}

const reducer = combineReducers({ addData });

const persistedReducer = persistReducer(persistConfig, reducer);


export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk, logger))
    let persistor = persistStore(store)
    return { store, persistor }
}