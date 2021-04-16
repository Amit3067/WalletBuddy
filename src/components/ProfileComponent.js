import { Card, Container, Grid, Box, CardHeader, Avatar, IconButton, CardContent, Typography, Paper } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import actions from '../redux/actions';
import ErrorComponent from './ErrorComponent';
import {Chart} from 'react-google-charts';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProfile: () => dispatch(actions.fetchProfile()),
        resetProfile: () => dispatch(actions.profileReset()),
    };
};

class Profile extends Component {

    constructor(props){
        super(props);
        this.props.fetchProfile();
    }

    componentWillUnmount(){
        this.props.resetProfile();
    }

    render(){
        if(!this.props.auth.isLoggedIn){
            this.props.history.push('/home');
        }
        if(this.props.profile.loading){
           return(
                <Box p={4} textAlign='center' height='100%'>
                    <Container maxWidth='md'>
                        <i className='fas fa-spinner fa-pulse fa-3x'></i><br/>Loading...
                    </Container>
                </Box>
            );
        }
        else if(!this.props.profile.loading && !this.props.profile.profile){
            return (
                <ErrorComponent />
            )
        }
        else{
            const fields = [['Category','Amount']];
            const dataVals = this.props.profile.profile.totalexpenses.map(exp => {
                return [exp._id,exp.totalSpent];
            });
            const data = fields.concat(dataVals);
            return (
                <Box p={4} height='100%'>
                <Container maxWidth='md'>
                    <Grid container alignItems='center' spacing={2} justify='space-evenly'>
                        <Grid item xs md={6}>
                            <Paper elevation={4}>
                                <Card style={{minHeight: '50vh'}}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="user">
                                                <Typography color='textSecondary'>
                                                    {this.props.profile.profile.user.username[0].toUpperCase()}
                                                </Typography>
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="edit" color='secondary'>
                                                <Edit />
                                            </IconButton>
                                        }
                                        title={this.props.profile.profile.user.username}
                                        titleTypographyProps={{variant:'h3', color: 'secondary'}}
                                    />
                                    <CardContent>
                                        <Grid container spacing={2} wrap='wrap' justify='space-between'>
                                            <Grid item xs={6}>
                                                <Typography variant='subtitle2'>
                                                    Name:
                                                </Typography>
                                                <Typography variant='subtitle1' color='secondary'>
                                                    {this.props.profile.profile.user.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant='subtitle2'>
                                                    Email:
                                                </Typography>
                                                <Typography noWrap={false} variant='subtitle1' color='secondary'>
                                                    {this.props.profile.profile.user.email}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant='subtitle2'>
                                                    Joined on:<br/>
                                                </Typography>
                                                <Typography variant='subtitle1' color='secondary'>
                                                    {new Date(this.props.profile.profile.user.createdAt).toDateString()}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant='subtitle2'>
                                                    Updated on:<br/>
                                                </Typography>
                                                <Typography variant='subtitle1' color='secondary'>
                                                    {new Date(this.props.profile.profile.user.updatedAt).toDateString()}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs md={6}>
                            <Paper elevation={4}>
                                <Card>
                                    <Chart 
                                        width='auto'
                                        height='auto'
                                        chartType="PieChart"
                                        loader={
                                            <Box m={4} textAlign='center' height='100%'>
                                                <Container maxWidth='md'>
                                                    <i className='fas fa-spinner fa-pulse fa-3x'></i><br/>Loading...
                                                </Container>
                                            </Box>
                                        }
                                        data={data}
                                        options={{
                                            title: 'Expenses'
                                        }}
                                        rootProps={{ 'data-testid': '1' }}
                                    />
                                </Card>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                </Box>
            );
        }
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Profile));