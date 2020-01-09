import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import { authenticate } from '../../utils/dataUtils';

import { sendData } from '../../utils/dataUtils';

export default function ({ data, open, toggler }) {
  const [email, setEmail] = React.useState(data.email);
  const [phone, setPhone] = React.useState(data.phone);
  const { dispatch } = React.useContext(UserContext);
  
  useEffect(() => {
    setEmail(data.email);
    setPhone(data.phone);
  }, [data]);
  
  return (
    <Dialog
      open={open}
      onClose={toggler}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title">修改個人資訊</DialogTitle>
      <DialogContent>
        <DialogContentText>
          請在此修改你的個人資料
        </DialogContentText>
        <TextField
          margin="dense"
          id="email"
          label="電子郵件"
          type="email"
          value={email}
          fullWidth
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="phone"
          label="電話號碼"
          type="phone"
          value={phone}
          fullWidth
          onChange={(e)=>{
            setPhone(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggler} color="primary">
          取消
        </Button>
        <Button
          color="primary"
          onClick={() => {
            sendData({
              endpoint: `/user/${localStorage.getItem('uid')}`,
              method: 'patch',
              data: {
                email: email,
                phone: phone,
              },
              withAuth: true,
            }).then(() => {
              authenticate().then((res) => {
                if (!res.data.data.dismissed) {
                  dispatch({
                    type: 'LOGIN',
                    payload: {
                      authenticated: true,
                      me: res.data.data.user,
                      count: parseInt(res.data.data.count)
                    },
                  });
                }
              })
              toast.success('修改資料成功！');
            }).catch(() => {
              toast.error('修改資料失敗');
            });
            toggler();
          }}
        >
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
}
