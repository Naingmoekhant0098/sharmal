import React from 'react';
import { Box, Typography } from '@mui/material';
import StreeringPositionIcon from '../../../assets/icons/SteeringPositionIcon.png'; // Adjust the import path accordingly

const SteeringPositionDisplay = ({ steeringPosition, isMobile }) => (
  <Box className="SteeringPosition" sx={{ display: 'flex', alignItems: 'center', flexBasis: '50%' }}>
    <img 
      src={StreeringPositionIcon} 
      alt="" 
      style={{ width: isMobile ? '15px' : '20px', height: isMobile ? '15px' : '20px' }} 
    />
    <Typography 
      variant='p' 
      sx={{ fontSize: isMobile ? '10px' : '13px', marginLeft: '4px', width: isMobile ? '50px' : '70px' }}
    >
      {steeringPosition === "LeftHandDrive" ? "ဘယ်မောင်း" : "ညာမောင်း" || 'N/A'}
    </Typography>
  </Box>
);

export default SteeringPositionDisplay;
