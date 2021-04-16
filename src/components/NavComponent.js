import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../redux/actions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar, Toolbar, Box, Typography, Button, useMediaQuery, ListItemIcon, ListItemText, Fab, Icon, IconButton, Menu, MenuItem} from '@material-ui/core';
import { MoreVert} from '@material-ui/icons';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logIn : (creds) => dispatch(actions.logIn(creds)),
        logOut : () => dispatch(actions.logOut()),
        removeError : () => dispatch(actions.removeError())
    };
};

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.contrastText
    },
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }));


function Nav(props){
    const handleButtonClick = (path, history) => {
        history.push(path);
    };
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();
    const classes = useStyles();
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
    return(
        (!isSmallDevice ?
            (
                <AppBar position="static">
                    <Toolbar>
                        <Button color='inherit' variant="text" onClick={() => handleButtonClick('/home',props.history)}>
                            <Typography variant="h6">
                                Wallet-Buddy
                            </Typography>
                        </Button>
                        <Box className={classes.grow} />
                        <Button color='inherit' startIcon={<Icon className="fas fa-sm fa-home" />} variant="text" onClick={() => handleButtonClick('/home',props.history)}>
                            <Typography variant="button">
                                Home
                            </Typography>
                        </Button>
                        {props.auth.isLoggedIn ? 
                            (
                                <>
                                <Button color='inherit' startIcon={<Icon className="fas fa-sm fa-chart-line" />} variant="text" onClick={() => handleButtonClick('/expenses',props.history)}>
                                    <Typography variant="button">
                                        Expenses
                                    </Typography>
                                </Button>
                                <Button color='inherit' startIcon={<Icon className="fas fa-sm fa-user" />} variant="text" onClick={() => handleButtonClick('/profile',props.history)}>
                                    <Typography variant="button">
                                    Profile
                                    </Typography>
                                </Button>
                                <Button color='inherit' startIcon={<Icon className="fas fa-sm fa-sign-out-alt" />} variant="text" onClick={() => props.logOut()}>
                                    <Typography variant="button">
                                    Sign Out
                                    </Typography>
                                </Button>
                                </>
                            ) :
                        (    
                            <>
                            <Button color='inherit' startIcon={<Icon className="fas fa-sm fa-sign-in-alt" />} variant="text" onClick={() => handleButtonClick('/auth/signin',props.history)}>
                                <Typography variant="button">
                                Sign In
                                </Typography>
                            </Button>
                            <Button color='inherit' startIcon={<Icon className="fas fa-sm fa-file-signature" />} variant="text" onClick={() => handleButtonClick('/auth/signup',props.history)}>
                                <Typography variant="button">
                                    Sign Up
                                </Typography>
                            </Button>
                            </>
                        )
                    }
                    </Toolbar>
                </AppBar>
            ) :
            (
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>
                    { props.auth.isLoggedIn ?
                        (
                            <>
                            <IconButton edge="start" color="inherit" onClick={handleClick} aria-label="open menu">
                                <MoreVert />
                            </IconButton>
                            <Menu
                                id="nav-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => handleButtonClick('/profile', props.history)}>
                                    <ListItemIcon>
                                        <Icon className="fas fa-sm fa-user" />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </MenuItem>
                                <MenuItem onClick={() => handleButtonClick('/expenses', props.history)}>
                                    <ListItemIcon>
                                    <Icon className="fas fa-sm fa-chart-line" />
                                    </ListItemIcon>
                                    <ListItemText primary="Expenses" />
                                </MenuItem>
                            </Menu>
                            </>
                        ) : 
                        (
                            <IconButton edge="start" color="inherit" onClick={() => handleButtonClick('/auth/signup', props.history)} aria-label="Sign Up">
                                <Icon className="fas fa-sm fa-file-signature" />
                            </IconButton>
                        )
                    }
                    <Fab color="secondary" aria-label="Home" onClick={() => handleButtonClick('/home',props.history)} className={classes.fabButton}>
                        <Icon className="fas fa-sm fa-home" />
                    </Fab>
                    <div className={classes.grow} />
                    {
                        props.auth.isLoggedIn ?
                        (
                        <IconButton edge="end" onClick={() => props.logOut()} aria-label="Sign Out" color="inherit">
                            <Icon className="fas fa-sm fa-sign-out-alt" />
                        </IconButton>
                        ) :
                        (
                        <IconButton edge="end" onClick={() => handleButtonClick('/auth/signin',props.history)} aria-label="Sign In" color="inherit">
                            <Icon className="fas fa-sm fa-sign-in-alt" />
                        </IconButton>
                        )
                    }
                    </Toolbar>
                </AppBar>
            )
        )
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));