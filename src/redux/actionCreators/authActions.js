import config from '../../config';
import * as ActionTypes from '../actionTypes';
import actions from '../actions';
import { removeError } from './errorActions';

const loggingIn = () => {
    return {
        type: ActionTypes.LOGGING_IN
    };
};

const loggedIn = () => {
    return {
        type: ActionTypes.LOGGED_IN
    };
};

const logInFailed = () => {
    return {
        type: ActionTypes.LOGIN_FAILED
    };
};

const loggingOut = () => {
    return {
        type: ActionTypes.LOGGING_OUT
    };
};

const loggedOut = () => {
    return {
        type: ActionTypes.LOGGED_OUT
    };
};

const logOutFailed = () => {
    return {
        type: ActionTypes.LOGOUT_FAILED
    };
};


export const logIn = (creds, cb) => (dispatch) => {
    dispatch(loggingIn());
    fetch(config.serverUrl+'/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds),
        credentials: 'include'
    }).then(res => {
        if(res.ok){
            res.json().then(data => {
                dispatch(loggedIn());
                localStorage.setItem('etauth', data.token);
                cb(null, true);
            }).catch(err => {
                cb(err.message, false);
            })
        }
        else{
            res.json().then(error => {
                throw new Error(error.error);
            }).catch(err => {
                dispatch(logInFailed());
                cb(err.message, false);
            });
        }
    }).catch(err => {
        dispatch(logInFailed());
        cb(err.message, false);
    });
};

export const logOut = (creds) => (dispatch) => {
    dispatch(loggingOut());
    fetch(config.serverUrl+'/auth/signout', {
        method: 'GET',
        credentials: 'include'
    }).then(res => {
        if(res.ok){
            res.json().then(data => {
                dispatch(loggedOut());
                dispatch(removeError())
                localStorage.removeItem('etauth');
            }).catch(err => {
                throw new Error(err.message);
            })
        }
        else{
            res.json().then(error => {
                throw new Error(error.error);
            }).catch(err => {
                dispatch(actions.addError(err.message));
                dispatch(logOutFailed());
            });
        }
    }).catch(err => {
        alert(err.message);
        dispatch(logOutFailed());
    });
};
