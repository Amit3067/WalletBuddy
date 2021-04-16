import config from '../../config';
import actions from '../actions';
import * as ActionTypes from '../actionTypes';

const profileLoading = () => {
    return {
        type: ActionTypes.PROFILE_LOADING
    };
};

const profileFailed = () => {
    return {
        type: ActionTypes.PROFILE_FAILED
    };
};

const profileFetched = (profile) => {
    return {
        type: ActionTypes.PROFILE_FETCHED,
        payload: profile
    };
};

export const profileReset = () => {
    return {
        type: ActionTypes.PROFILE_FETCHED
    };
};

export const fetchProfile = () => (dispatch) => {
    dispatch(profileLoading());
    fetch(config.serverUrl+'/users',{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('etauth')}`
        },
        credentials: 'include'
    }).then(res => {
        if(res.ok){
            res.json().then(data => {
                dispatch(profileFetched(data));
            }).catch(err => {
                var error = new Error(err.message);
                throw error;
            });
        }
        else{
            res.json().then(err => {
                dispatch(profileFailed());
                dispatch(actions.addError(err.error));
            }).catch(err => {
                var error = new Error(err.message);
                throw error;
            });
        }
    }).catch(err => {
        dispatch(profileFailed());
        dispatch(actions.addError(err.error));
    });
};