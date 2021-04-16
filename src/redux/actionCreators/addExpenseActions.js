import config from '../../config';
import * as ActionTypes from '../actionTypes';
import actions from '../actions';

const addingExp = () => {
    return {
        type: ActionTypes.ADDING_EXP
    };
};

const expFailed = () => {
    return {
        type: ActionTypes.EXP_FAILED
    };
};

const expAdded = () => {
    return {
        type: ActionTypes.EXP_ADDED
    };
};

export const expReset = () => {
    return {
        type: ActionTypes.EXP_RESET
    };
};

export const addExp = (creds, cb) => (dispatch) => {
    dispatch(addingExp());
    fetch(config.serverUrl+'/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('etauth')}`
        },
        body: JSON.stringify(creds),
        credentials: 'include'
    }).then(res => {
        if(res.ok){
            res.json().then(data => {
                dispatch(expAdded());
                dispatch(actions.fetchExpenses());
                cb(null, true);
            }).catch(err => {
                cb(err.message, false);
            })
        }
        else{
            res.json().then(error => {
                throw new Error(error.error);
            }).catch(err => {
                dispatch(expFailed());
                cb(err.message, false);
            });
        }
    }).catch(err => {
        dispatch(expFailed());
        cb(err.message, false);
    });
};