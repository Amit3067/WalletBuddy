import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../redux/actions';
import {Container, Typography, makeStyles, CssBaseline, Avatar, TextField, Button} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ErrorComponent from './ErrorComponent';


const useStyles = makeStyles((theme) => ({
    paper: {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(8)
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        signup: state.signup
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp : (creds,cb) => dispatch(actions.signUp(creds,cb)),
        addError : (err) => dispatch(actions.addError(err)),
        removeError : () => dispatch(actions.removeError()),
        signupReset : () => dispatch(actions.signUpReset())
    };
};

function SignUp(props) {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');


    const signUpCB = (err , signedUp) => {
        if(err){
            props.addError(err);
        }
        
        if(signedUp){
            props.removeError();
            setUsername('');
            setPassword('');
            setEmail('');
            setName('');
            alert('You have been registered successfully');
            props.signupReset();
            props.history.push('/home');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.signUp({
            username: username,
            password: password,
            email: email,
            name: name
        }, signUpCB);
    }
    

    useEffect(() => {
        if(props.auth.isLoggedIn){
            props.history.push('/home');
        }
    });

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ErrorComponent />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountBoxIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange = {e => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
              autoComplete="name"
              onChange = {e => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              onChange = {e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange = {e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={props.signup.processing? true: false}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    );
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));