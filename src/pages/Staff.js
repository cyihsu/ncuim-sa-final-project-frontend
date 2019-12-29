import React, { Suspense, lazy, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { EditPassword } from '../components/Modal';

const StaffTable = lazy(() => import('../components/StaffTable'));

export default function() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const handleModal = () => {
    setOpen(!open);
  };
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h1>員工相關資訊</h1>
        <Suspense fallback={<Skeleton width={'100%'} height={'100%'} />}>
          <EditPassword
            open={open}
            toggler={handleModal}
            data={user}
          />
          <StaffTable
            toggler={handleModal}
            setter={setUser}
          />
        </Suspense>
      </Grid>
    </Grid>
  );
}