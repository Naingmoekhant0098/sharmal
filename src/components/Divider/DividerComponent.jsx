import { Divider } from '@mui/material';
import { Fragment } from 'react';

function DividerComponent() {
  return (
    <Fragment>      
      <Divider
    sx={{
      backgroundColor: '#1D1B201F',
      width: '100%', // Adjust width based on margins
      mx: 'auto', // Center the divider horizontally
      mt: '3%' // Top margin
    }}
  />       
    </Fragment>
  );
}

export default DividerComponent;
