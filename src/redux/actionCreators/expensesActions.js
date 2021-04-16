import config from '../../config';
import actions from '../actions';
import * as ActionTypes from '../actionTypes';

const expensesLoading = () => {
    return {
        type: ActionTypes.EXPENSES_LOADING
    };
};

const expensesFailed = () => {
    return {
        type: ActionTypes.EXPENSES_FAILED
    };
};

const expensesFetched = (expenses) => {
    return {
        type: ActionTypes.EXPENSES_FETCHED,
        payload: expenses
    };
};

export const expensesReset = () => {
    return {
        type: ActionTypes.EXPENSES_FETCHED
    };
};

export const fetchExpenses = () => (dispatch) => {
    dispatch(expensesLoading());
    fetch(config.serverUrl+'/expenses/preview/current',{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('etauth')}`
        },
        credentials: 'include'
    }).then(res => {
        if(res.ok){
            res.json().then(data => {
                dispatch(expensesFetched(data));
            }).catch(err => {
                var error = new Error(err.message);
                throw error;
            });
        }
        else{
            res.json().then(err => {
                dispatch(expensesFailed());
                dispatch(actions.addError(err.error));
            }).catch(err => {
                var error = new Error(err.message);
                throw error;
            });
        }
    }).catch(err => {
        dispatch(expensesFailed());
        dispatch(actions.addError(err.error));
    });
};