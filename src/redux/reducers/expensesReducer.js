import * as ActionTypes from '../actionTypes';

const initialState = {
    loading: false,
    expenses: null
};

const expensesReducer = (state=initialState, action) => {
    switch(action.type){
        case ActionTypes.EXPENSES_LOADING:
            return {expenses: null, loading: true};
        case ActionTypes.EXPENSES_FAILED:
            return {loading: false, expenses: null};
        case ActionTypes.EXPENSES_FETCHED:
            return {loading: false, expenses: action.payload};
        case ActionTypes.EXPENSES_RESET:
            return {loading: false, expenses: null};
        default:
            return {...state};
    }
};

export default expensesReducer;