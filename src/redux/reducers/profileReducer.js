import * as ActionTypes from '../actionTypes';

const initialState = {
    loading: false,
    profile: null
};

const profileReducer = (state=initialState, action) => {
    switch(action.type){
        case ActionTypes.PROFILE_LOADING:
            return {profile: null, loading: true};
        case ActionTypes.PROFILE_FAILED:
            return {loading: false, profile: null};
        case ActionTypes.PROFILE_FETCHED:
            return {loading: false, profile: action.payload};
        case ActionTypes.PROFILE_RESET:
            return {loading: false, profile: null};
        default:
            return {...state};
    }
};

export default profileReducer;