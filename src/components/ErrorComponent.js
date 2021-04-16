import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {Alert, AlertTitle} from '@material-ui/lab';
import actions from '../redux/actions';

const Error = ({ error, removeError  }) => (
  <Fragment>
    {error.message?
    (
      <Alert severity="error" onClose={() => removeError()}>
        <AlertTitle>Error</AlertTitle>
        <strong>{error.message}</strong>
      </Alert>
    ) : null }

  </Fragment>
);


export default connect(store => ({ error: store.error }), dispatch => ({removeError: () => dispatch(actions.removeError())}))(Error);
