import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import { toast } from 'react-toastify';
import { sendData } from '../../utils/dataUtils';

export default function FormDialog({ data, open, toggler }) {
  const [humanResource, setHR] = React.useState();
  return (
    data ?
    (
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
            max={15}
            onChange={(e, newValue) => {
              setHR(newValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          {
            data.requirement
            && (
            <Button
              onClick={() =>{
                sendData({
                  endpoint: `/schedule/date/${data.date}/${data.time}`,
                  method: 'delete',
                  data: {
                  },
                  withAuth: true,
                }).then(() => {
                  toast.success('修改成功！');
                  window.location.reload();
                }).catch(() => {
                  toast.error('修改失敗');
                });
                toggler();
              }}
              color="secondary"
            >
              刪除需求
            </Button>
            )
          }
          <Button onClick={toggler} color="primary">
            取消
          </Button>
          {
            data.requirement
            ? (
            <Button
            
              onClick={() =>{
                if(humanResource < 1) {
                  toast.error('人力需求不能為零！');
                  return;
                }
                else {
                  sendData({
                    endpoint: `/schedule/date/${data.date}/${data.time}`,
                    method: 'patch',
                    data: {
                      workforce: humanResource
                    },
                    withAuth: true,
                  }).then(() => {
                    toast.success('修改成功！');
                    window.location.reload();
                  }).catch(() => {
                    toast.error('修改失敗');
                  });
                  toggler();
                }
              }}
              color="primary"
            >
              確認
            </Button>
            ) :
            (
              <Button
                onClick={() =>{
                  if(humanResource < 1) {
                    toast.error('人力需求不能為零！');
                  }
                  else {
                    sendData({
                      endpoint: `/schedule/date/add`,
                      method: 'post',
                      data: {
                        date: data.date,
                        time: data.time,
                        workforce: humanResource
                      },
                      withAuth: true,
                    }).then(() => {
                      toast.success('修改成功！');
                      window.location.reload();
                    }).catch(() => {
                      toast.error('修改失敗');
                    });
                    toggler();
                  }
                }}
                color="primary"
              >
                確認
              </Button>
            )
          }
          
        </DialogActions>
      </Dialog>
    ) : <React.Fragment />
  );
}
