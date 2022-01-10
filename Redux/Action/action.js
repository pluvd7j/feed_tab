import { DATA_ADDED_FAILURE, DATA_ADDED_SUCCESS } from "../ActionTypes/ActionTypes"





export const dataAddedSuccess = (dataAddedSuc) => {
    return {
        type: DATA_ADDED_SUCCESS,
        payload: dataAddedSuc
    }
}

export const dataAddedFailure = (dataAddedErr) => {
    return {
        type: DATA_ADDED_FAILURE,
        payload: dataAddedErr
    }
}