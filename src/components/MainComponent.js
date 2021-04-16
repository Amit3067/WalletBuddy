import React, {Component} from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Paper} from '@material-ui/core';
import actions from '../redux/actions';
import Nav from './NavComponent';
import Home from './HomeComponent';
import Profile from './ProfileComponent';
import SignIn from './SignInComponent';
import SignUp from './SignUpComponent';
import Expenses from './ExpensesComponent';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

var t={
    username: 'rex',
    password: 'Legion'
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn : (creds=t) => dispatch(actions.logIn(creds)),
        logOut : () => dispatch(actions.logOut()),
        removeError : () => dispatch(actions.removeError())
    };
};

class Main extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Paper square style={{minHeight:'100vh'}}>
                <Nav />
                <Switch>
                    <Route exact path="/home" component={Home}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/auth/signin" component={SignIn}/>
                    <Route path="/auth/signup" component={SignUp}/>
                    <Route path="/expenses" component={Expenses}/>
                    <Redirect to="/home"/>
                </Switch>
            </Paper>
        );
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));