import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Container, List, ListItemText, Divider, ListItem, Grid, Box, Card, CardActionArea, CardActions, Button} from '@material-ui/core';
import Logo from '../Wallet Buddy.png';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    title: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`
    },
    media: {
        minHeight: 400
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
       display: 'inline',
    },
 }));

const Home = (props) => {
    const classes = useStyles();

    return (
        <Box p={4} height='100%'>
            <Container maxWidth="md">
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12} md={6}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={Logo}
                            height="30vh"
                            title="Wallet Buddy"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h5">
                                Wallet Buddy
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" component="p">
                                An expense tracker app, with data visualization and record keeping.
                                No need to remember everything. Whenever, you spend just add an expense and 
                                it will remember that for you.<br/>
                                The data visualization and record keeping techniques can help you analyse and
                                understand your spending habits.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained" onClick={()=> props.history.push("/auth/signin")}>
                                Get Started
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Why choose Wallet-Buddy?
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" component="p">
                            <List className={classes.root}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary="Keeps track of all your expenses"
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            All you need to do is to add an expense, whenver you spend.
                                        </Typography>
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary="Aids Data Visualization"
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            You can analyse your expenses using interactive plots.
                                        </Typography>
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary="Easy to use"
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            User friendly interface
                                        </Typography>
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                </List>
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            </Container>
        </Box>
    )
};

export default Home;