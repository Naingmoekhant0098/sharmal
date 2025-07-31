import React from 'react';
import { Button } from '@mui/material';

const GradientButtonComponent = ({ children,onClick, ...props }) => {
  return (
    <Button   
      onClick={onClick}         
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        background: 'linear-gradient(93deg, #AC2582 -18.36%, #460F35 183.89%)',
        color: 'white',
        textTransform:'none',
        borderRadius: '10px',
        '&:hover': {
          background: 'linear-gradient(93deg, #AC2582 -18.36%, #460F35 183.89%)',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GradientButtonComponent;
