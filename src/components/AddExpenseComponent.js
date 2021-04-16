import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles, Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Fade, Avatar, Typography, TextField, Button, FormControl, InputLabel, Select} from '@material-ui/core';
import { useState } from 'react';
import actions from '../redux/actions';
import { AccountBalance } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '50vw',
      [theme.breakpoints.down['sm']] : {
        maxWidth: '80vw'
      }
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
      margin: theme.spacing(3, 0, 2)
    },
    formControl: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2)
    }
  }));

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        exp: state.exp
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      addExp: (creds,cb) => dispatch(actions.addExp(creds,cb)),
      addError : (err) => dispatch(actions.addError(err)),
      removeError : () => dispatch(actions.removeError()),
      expReset : () => dispatch(actions.expReset())
    };
};

const RenderOptions = () => {
  const opts = ['Housing',
    'Transportation',
    'Grocery Store Food',
    'Utilities',
    'Insurance',
    'Basic Clothing',
    'Education Costs',
    'Dining Out',
    'Television',
    'Entertainment',
    'Clothing',
    'Memberships',
    'Others'
  ];

  const options = opts.map(opt => {
    return(
      <option value={opt} key={opt.split(' ')[0]}>
        {opt}
      </option>
    );
    });
  return (
    <>
    {options}
    </>
  );
};

function AddExpense(props) {
    const classes = useStyles();
    const open = props.open;
    const handleClose = props.onClose;
    const [title, setTitle] = useState('');
    const [category, setCategory] =useState('');
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const [incdate, setIncDate] = useState(new Date());

    const addExpCB = (err , addedExp) => {
        if(err){
            props.addError(err);
        }
        
        if(addedExp){
            props.removeError();
            setTitle('');
            setCategory('');
            setAmount('');
            setNotes('');
            setIncDate('');
            props.removeError();
            props.expReset();
            handleClose();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addExp({
            title, category, amount, notes, incurred_on: incdate
        }, addExpCB);
    }

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountBalance />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add Expense
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                    onChange = {e => setTitle(e.target.value)}
                  />
                    <FormControl margin="normal" required fullWidth variant="outlined" >
                      <InputLabel htmlFor="categorySelect">Category</InputLabel>
                      <Select
                        native
                        onChange={e => setCategory(e.target.value)}
                        label="Age"
                        inputProps={{
                          name: 'category',
                          id: 'categorySelect',
                        }}
                      >
                        <option value=""></option>
                        <RenderOptions />
                      </Select>
                    </FormControl>
                    <TextField
                      id="incdate"
                      label="Incurred On"
                      type="date"
                      variant="outlined"
                      name="incdate"
                      onChange={e => setIncDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="amount"
                    label="Amount"
                    type="number"
                    id="amount"
                    onChange = {e => setAmount(e.target.value)}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="notes"
                    label="Notes"
                    name="notes"
                    multiline={true}
                    rows={2}
                    onChange = {e => setNotes(e.target.value)}
                    />
                    <Grid container direction="row" justify="space-evenly">
                      <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={props.exp.processing? true: false}
                      >
                      Add
                      </Button>
                      <Button
                      type="reset"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={props.exp.processing? true: false}
                      >
                      Reset
                      </Button>
                      <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={()=> handleClose()}
                      disabled={props.exp.processing? true: false}
                      >
                      Close
                      </Button>
                    </Grid>
                </form>
            </div>
          </Fade>
        </Modal>
      </div>
    );
}

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddExpense));