import React, {useState} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../redux/actions';
import {Container, Grid, Typography, makeStyles, CssBaseline, Avatar, TextField, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logIn : (creds,cb) => dispatch(actions.logIn(creds,cb)),
        addError : (err) => dispatch(actions.addError(err)),
        removeError : () => dispatch(actions.removeError())
    };
};

function SignIn(props) {

  if(props.auth.isLoggedIn){
      props.history.push('/home');
  }

    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const signInCB = (err , loggedIn) => {
        if(err){
            props.addError(err);
        }
        
        if(loggedIn){
            props.removeError();
            setUsername('');
            setPassword('');
            alert('You have been logged in.')
            props.history.push('/expenses');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.logIn({
            username: username,
            password: password
        }, signInCB);
    }
    


    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ErrorComponent />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              autoComplete="email"
              autoFocus
              onChange = {e => setUsername(e.target.value)}
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
              autoComplete="current-password"
              onChange = {e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={props.auth.loggingIn? true: false}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/auth/signup' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));