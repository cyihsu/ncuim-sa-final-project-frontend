import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function({ user, open, toggler }) {
  return (
    <Dialog open={open} onClose={toggler} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">修改個人資訊</DialogTitle>
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
        <Button onClick={toggler} color="primary">
          取消
        </Button>
        <Button onClick={toggler} color="primary">
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
}