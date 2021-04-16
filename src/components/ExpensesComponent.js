import { Container, makeStyles, GridList, Fab, Box, GridListTile, GridListTileBar, Paper, Grid, withTheme, useMediaQuery, Typography } from '@material-ui/core';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import actions from '../redux/actions';
import ErrorComponent from './ErrorComponent';
import {Chart} from 'react-google-charts';
import AddExpense from './AddExpenseComponent';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        expenses: state.expenses
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchExpenses: () => dispatch(actions.fetchExpenses()),
        resetExpenses: () => dispatch(actions.expensesReset()),
    };
};

const CustomTile = (props) => {
    return (
            <Paper elevation={4} {...props} />
    )
}

const RenderGridList = ({tileData, overview}) => {

    const match = useMediaQuery(theme => theme.breakpoints.down('md'));

    let tiles = tileData.map((tile) => {
        if(tile.chartData.length >= 2){
        return (
            <GridListTile key={tile.key} cols={1} rows={1}>
                <Paper variant="outlined" elevation={4}>
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
                        data={tile.chartData}
                        rootProps={{ 'data-testid': '1' }}
                    />
                    <GridListTileBar
                    title={tile.title}
                    titlePosition="bottom"
                    actionPosition="left"
                    />
                </Paper>
            </GridListTile>
        );
        }
        else{
            return null;
        }
    }
    );

    let infoTile = (
        <GridListTile key='overview' cols={1} rows={1}>
            <Paper variant="outlined" elevation={4}>
                <Grid container spacing={2}>
                    <Grid item xs md={6}>
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
                            data={overview.chartData}
                            title={'Expenses Overview'}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </Grid>
                    <Grid item xs md={6}>
                        <Grid container spacing={2} wrap='wrap' justify='space-between'>
                            <Grid item xs sm={6}>
                                <Typography variant='subtitle2'>
                                    Today's Expenses:
                                </Typography>
                                <Typography variant='subtitle1' color='secondary'>
                                    &#8377; {overview.today}
                                 </Typography>
                            </Grid>
                            <Grid item xs sm={6}>
                                <Typography variant='subtitle2'>
                                    Yesterday's Expenses:
                                </Typography>
                                <Typography variant='subtitle1' color='secondary'>
                                    &#8377; {overview.yesterday}
                                 </Typography>
                            </Grid>
                            <Grid item xs sm={6}>
                                <Typography variant='subtitle2'>
                                    Total Expenses:
                                </Typography>
                                <Typography variant='subtitle1' color='secondary'>
                                    &#8377; {overview.total}
                                </Typography>
                            </Grid>
                            <Grid item xs sm={6}>
                                <Typography variant='subtitle2'>
                                    Current Month Expenses:
                                </Typography>
                                <Typography variant='subtitle1' color='secondary'>
                                    &#8377; {overview.month}
                                 </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </GridListTile>
    );

    return (
        <Paper elevation={4} variant="outlined">
            <GridList component={CustomTile} cellHeight='auto' cols={match ? 1 :2} >
                {infoTile}
                {tiles}
            </GridList>
        </Paper>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
      flexDirection: 'column',
      '& .ant-empty-img-1': {
        fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
      },
      '& .ant-empty-img-2': {
        fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
      },
      '& .ant-empty-img-3': {
        fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
      },
      '& .ant-empty-img-4': {
        fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
      },
      '& .ant-empty-img-5': {
        fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
        fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
      },
    },
    label: {
      marginTop: theme.spacing(1),
    },
  }));

function CustomNoRowsOverlay() {
    const classes = useStyles();
  
    return (
      <GridOverlay className={classes.root}>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <div className={classes.label}>No Rows</div>
      </GridOverlay>
    );
  }

class Expenses extends Component {

    constructor(props){
        super(props);
        this.props.fetchExpenses();
        this.state = {
            modalOpen: false
        }
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleModalClose(){
        this.setState({modalOpen: false})
    }

    componentWillUnmount(){
        this.props.resetExpenses();
    }

    render(){
        if(!this.props.auth.isLoggedIn){
            this.props.history.push('/home');
        }
        if(this.props.expenses.loading){
           return(
                <Box p={4} textAlign='center' height='100%'>
                    <Container maxWidth='md'>
                        <i className='fas fa-spinner fa-pulse fa-3x'></i><br/>Loading...
                    </Container>
                </Box>
            );
        }
        else if(!this.props.expenses.loading && !this.props.expenses.expenses){
            return (
                <ErrorComponent />
            )
        }
        else{
            let expenses = this.props.expenses.expenses;
            let fields = [['Category','Amount']];

            let monthSpent = 0;
            let todaySpent = 0;
            let yesterdaySpent = 0;
            let totalSpent = 0;

            let todayTrans = expenses.today.map(exp => {
                todaySpent+=exp.totalSpent;
                return [exp._id,exp.totalSpent];
            });
            let todaydata = fields.concat(todayTrans);

            let yesterdayTrans = expenses.yesterday.map(exp => {
                yesterdaySpent+=exp.totalSpent;
                return [exp._id,exp.totalSpent];
            });
            let yesterdaydata = fields.concat(yesterdayTrans);

            let monthTrans = expenses.month.map(exp => {
                monthSpent+=exp.totalSpent;
                return [exp._id,exp.totalSpent];
            });
            let monthdata = fields.concat(monthTrans);

            let totalTrans = expenses.total.map(exp => {
                totalSpent+=exp.totalSpent;
                return [exp._id,exp.totalSpent];
            });
            let totaldata = fields.concat(totalTrans);

            let tileData = [
                {
                    title: "Today's Overview",
                    chartData: todaydata,
                    featured: false,
                    key: 1
                },
                {
                    title: "Yesterday's Overview",
                    chartData: yesterdaydata,
                    featured: false,
                    key: 2
                },
                {
                    title: 'Month Overview',
                    chartData: monthdata,
                    featured: false,
                    key: 3
                }
            ]
            
            let overviewData = {
                month: monthSpent,
                today: todaySpent,
                yesterday: yesterdaySpent,
                total: totalSpent,
                chartData: totaldata
            }

            let rows = expenses.transactions;

            const columns = [
                {
                    field: '_id',
                    headerName: 'ID',
                    sortable:false,
                    width: 250
                },
                {
                    field: 'title',
                    headerName: 'Title',
                    width: 200
                },
                {
                    field: 'category',
                    headerName: 'Category',
                    width: 200
                },
                {
                  field: 'amount',
                  headerName: 'Amount',
                  type: 'number', 
                  valueFormatter: (params) => (String.fromCharCode(8377)+" "+params.value),
                  width: 110
                },
                {
                  field: 'incurred_on',
                  headerName: 'Incurred On',
                  type: 'date',
                  width: 150,
                  valueFormatter: (params) => new Date(params.value).toLocaleDateString()
                }
            ];

            return (
                <>
                    <Fab title="Add Expense" id="addExpense" onClick={() => this.setState({modalOpen: true})} color="primary" aria-label="add expense">
                        <AddIcon />
                    </Fab>
                    <AddExpense open={this.state.modalOpen} onClose={this.handleModalClose} />
                    <Box pt={4} pb={4} height='100%'>
                        <Container maxWidth='lg'>
                            <RenderGridList tileData={tileData} overview={overviewData}/>
                        </Container>
                    </Box>
                    <Box pt={4} pb={8} height='100%'>
                        <Container maxWidth='lg'>
                        <div style={{ height: 400, width: '100%' }}>
                            <div style={{ display: 'flex', height: '100%' , width: 'auto'}}>
                                <div style={{ flexGrow: 1 }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        components={{NoRowsOverlay: CustomNoRowsOverlay}}
                                        pageSize={5}
                                    />
                                </div>
                            </div>
                        </div>
                        </Container>
                    </Box>
                </>
            );
        }
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withTheme(Expenses)));