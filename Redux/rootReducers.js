import {combineReducers} from 'redux';
import addData from "./Reducers/addData";

const rootReducer = combineReducers({
  addData: addData,
});

export default rootReducer;
