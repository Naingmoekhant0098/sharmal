import React from 'react';
import { Radio } from '@mui/material';
import theme from '../../theme';

const RadioComponent = (props) => {
  return (
    <Radio
      {...props}
      sx={{
        color: theme.palette.secondary.main,
        '&.Mui-checked': {
          color: theme.palette.secondary.main,
        },
      }}
    />
  );
};

export default RadioComponent;
