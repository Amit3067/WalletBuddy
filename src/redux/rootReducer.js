import {combineReducers} from 'redux';
import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';
import profileReducer from './reducers/profileReducer';
import signupReducer from './reducers/signupReducer';
import expensesReducer from './reducers/expensesReducer';
import addExpenseReducer from './reducers/addExpenseReducer';

const rootReducer = combineReducers({
    error: errorReducer,
    auth: authReducer,
    profile: profileReducer,
    signup: signupReducer,
    expenses: expensesReducer,
    exp: addExpenseReducer
});

export default rootReducer;