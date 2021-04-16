import * as ActionTypes from '../actionTypes';

const initialState = {
    processing: false,
    successful: null
};

const signUpReducer = (state=initialState, action) => {
    switch(action.type){
        case ActionTypes.SIGNING_UP:
            return {...state, processing: true};
        case ActionTypes.SIGNUP_FAILED:
            return {...state, processing: false};
        case ActionTypes.SIGNUP_SUCCESSFUL:
            return {...state, processing: false, successful: true};
        case ActionTypes.PROFILE_RESET:
            return {...initialState};
        default:
            return {...state};
    }
};

export default signUpReducer;