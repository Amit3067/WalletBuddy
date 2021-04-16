import config from '../../config';
import * as ActionTypes from '../actionTypes';

const signingUp = () => {
    return {
        type: ActionTypes.SIGNING_UP
    };
};

const signupFailed = () => {
    return {
        type: ActionTypes.SIGNUP_FAILED
    };
};

const signupSuccessful = () => {
    return {
        type: ActionTypes.SIGNUP_SUCCESSFUL
    };
};

export const signUpReset = () => {
    return {
        type: ActionTypes.SIGNUP_RESET
    };
};

export const signUp = (creds, cb) => (dispatch) => {
    dispatch(signingUp());
    fetch(config.serverUrl+'/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds),
        credentials: 'include'
    }).then(res => {
        if(res.ok){
            res.json().then(data => {
                dispatch(signupSuccessful());
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
                dispatch(signupFailed());
                cb(err.message, false);
            });
        }
    }).catch(err => {
        dispatch(signupFailed());
        cb(err.message, false);
    });
};