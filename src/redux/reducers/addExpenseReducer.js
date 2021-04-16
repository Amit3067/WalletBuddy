import * as ActionTypes from '../actionTypes';

const initialState = {
    processing: false,
    successful: null
};

const addExpReducer = (state=initialState, action) => {
    switch(action.type){
        case ActionTypes.ADDING_EXP:
            return {...state, processing: true};
        case ActionTypes.EXP_FAILED:
            return {...state, processing: false};
        case ActionTypes.EXP_ADDED:
            return {...state, processing: false, successful: true};
        case ActionTypes.EXP_RESET:
            return {...initialState};
        default:
            return {...state};
    }
};

export default addExpReducer;