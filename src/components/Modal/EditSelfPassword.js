import React, { useState } from 'react';
import {
  Button, TextField, Dialog,
  DialogActions, DialogContent,
  DialogContentText, DialogTitle,
} from '@material-ui/core';
import { sha256 } from 'js-sha256';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';

import { sendData } from '../../utils/dataUtils';

export default function ({ data, open, toggler }) {
  const [old_password, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setCheck] = useState("");
  const { state } = React.useContext(UserContext);
  return (
    <Dialog open={open} onClose={toggler} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        修改你的登入密碼
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          請注意，以下操作將直接覆蓋使用者既有密碼，請謹慎操作。
        </DialogContentText>
        {
          state.me.rank
          && !state.me.rank.admin ? (
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="請輸入舊密碼"
              type="password"
              fullWidth
              onChange={(event) => {
                setOldPassword(event.target.value);
              }}
            />
          ) : (<React.Fragment />)
        }
        <TextField
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
            (password && passwordCheck && password !== passwordCheck)
            && '重新輸入密碼不一致！'
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
              endpoint: `/user/credentials/${localStorage.getItem('uid')}`,
              method: 'patch',
              data: {
                old_password: sha256(old_password),
                password: sha256(password),
              },
              withAuth: true,
            }).then(() => {
              toast.success('修改密碼成功！');
            }).catch(() => {
              toast.error('修改密碼失敗');
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
