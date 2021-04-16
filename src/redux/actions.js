import * as authActions from './actionCreators/authActions';
import * as errActions from './actionCreators/errorActions';
import * as profileActions from './actionCreators/profileActions';
import * as signupActions from './actionCreators/signupActions';
import * as expensesActions from './actionCreators/expensesActions';
import * as addExpenseActions from './actionCreators/addExpenseActions';

const actions = {
    ...authActions,
    ...errActions,
    ...profileActions,
    ...signupActions,
    ...expensesActions,
    ...addExpenseActions
};

export default actions;