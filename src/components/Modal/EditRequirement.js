import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';

export default function FormDialog({ data, open, toggler }) {
  return (
    <Dialog
      open={open}
      onClose={toggler}
      fullWidth
      maxWidth="xs"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {data.requirement ? '修改' : '新增'}
時段需求
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          請輸入該時段人力需求及人力安排資訊。
        </DialogContentText>
        <InputLabel htmlFor="slider">人力需求數</InputLabel>
        <Slider
          defaultValue={data.requirement ? data.requirement : 0}
          aria-labelledby="slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={10}
        />
        {
          data.requirement
            ? (
              <TextField
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
              />
            ) : null
        }

      </DialogContent>
      <DialogActions>
        {
          data.requirement
          && (
          <Button onClick={toggler} color="secondary">
            刪除需求
          </Button>
          )
        }
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
