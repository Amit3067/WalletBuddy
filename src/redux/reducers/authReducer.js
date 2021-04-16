import * as ActionTypes from '../actionTypes';

const initialState = {
    loggingIn: false,
    isLoggedIn: (localStorage.getItem('etauth')? true : false),
    loggingOut: false
};

const authReducer = (state=initialState, action) => {
    switch(action.type){
        case ActionTypes.LOGGING_IN:
            return {...state, loggingIn: true};
        case ActionTypes.LOGGED_IN:
            return {...state, isLoggedIn: true, loggingIn: false};
        case ActionTypes.LOGIN_FAILED:
            return {...state, loggingIn: false, isLoggedIn: false};
        case ActionTypes.LOGGING_OUT:
            return {...state, loggingOut: true};
        case ActionTypes.LOGGED_OUT:
            return {...state, isLoggedIn: false, loggingOut: false};
        case ActionTypes.LOGOUT_FAILED:
            return {...state, loggingOut: false};
        default:
            return {...state};
    };
};

export default authReducer;