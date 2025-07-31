import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import theme from '../../theme';

const BackdropComponent = ({ open }) => {
  return (
    <Backdrop
      sx={{ color:theme.palette.primary.contrastText, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropComponent;
