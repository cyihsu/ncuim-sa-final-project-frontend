import React, { useState } from 'react';
import {
  Button, TextField, Dialog,
  DialogActions, DialogContent,
  DialogContentText, DialogTitle
} from '@material-ui/core';
import { sha256 } from 'js-sha256';

import { sendData } from '../../utils/dataUtils';

export default function({ data, open, toggler }) {
  const [password, setPassword] = useState();
  const [passwordCheck, setCheck] = useState();

  return (
    <Dialog open={open} onClose={toggler} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">修改 {data.name} 的登入密碼</DialogTitle>
      <DialogContent>
        <DialogContentText>
          請注意，以下操作將直接覆蓋使用者既有密碼，請謹慎操作。
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="請輸入密碼"
          type="password"
          fullWidth
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="passwordCheck"
          label="請再輸入一次"
          type="password"
          error={password && passwordCheck && password !== passwordCheck}
          helperText={
            (password && passwordCheck && password !== passwordCheck) &&
            "重新輸入密碼不一致！"
          }
          fullWidth
          onChange={(event) => {
            setCheck(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggler} color="primary">
          取消
        </Button>
        <Button
          onClick={() => {
            sendData({
              endpoint: `/data/credentials/${data.id}`,
              method: 'patch',
              data: {
                password: sha256(password)
              },
              withAuth: true
            });
            toggler();
          }}
          color="primary"
        >
          送出
        </Button>
      </DialogActions>
    </Dialog>
  );
}