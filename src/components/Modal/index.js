import React, { useState } from 'react';

import {
  Button, TextField, Dialog,
  DialogActions, DialogContent,
  DialogContentText, DialogTitle,
} from '@material-ui/core';

import EditInfo from './EditInfo';
import EditPassword from './EditPassword';
import EditRequirement from './EditRequirement';

import { UIContext } from '../../contexts/UIContext';

export function Test({ data }) {
  const { state, dispatch } = React.useContext(UIContext);
  function handleClose() {
    dispatch({
      type: 'CLOSE_MODAL',
    });
  }

  return (
    <Dialog open={state.toggleModal} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Test Modal</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Not Implemented.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={handleClose} color="primary">
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export {
  EditInfo,
  EditPassword,
  EditRequirement,
};
