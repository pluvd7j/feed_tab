import {
    DATA_ADDED_SUCCESS,
    DATA_ADDED_FAILURE,
  } from '../ActionTypes/ActionTypes';
  
  const initialState = {
    dataAddedSuc: [],
    dataAddedErr: '',
  };
  
  const dataAddedReducer = (state = initialState, action) => {
    switch (action.type) {
      case DATA_ADDED_SUCCESS:
        return {
          ...state,
          dataAddedSuc: [...state.dataAddedSuc, action.payload],
          dataAddedErr: '',
        };
      case DATA_ADDED_FAILURE:
        return {
          dataAddedSuc: [],
          dataAddedErr: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default dataAddedReducer;
  