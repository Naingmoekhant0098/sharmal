import React, { useState, useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { GetExchangeRateAPI } from '../../api/exchangerate/ExchangeRateAPI';

const UserExchangeRateCardComponent = () => {
  const [userExchangeData, setUserExchangeData] = useState([]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        await GetExchangeRateAPI(setUserExchangeData); 
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, []); 


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap', // Allows multiple cards to wrap in a row
        width: {md: '30%', xs: '100%', sm: '100%' },    // Takes full width of the container
        gap: '10px',      // Adds spacing between the cards
      }}
    >
      {userExchangeData.map((data, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: { xs: '5px 8px', sm: '10px 20px' }, // Responsive padding for mobile and larger screens
            backgroundColor: '#5b1144',
            borderRadius: '10px',
            flexDirection: 'row',
            textAlign: 'center',
            gap: { md: '10px',xs: '10px', sm: '20px' }, // Smaller gap for mobile
            width: { md: '20%',xs: '20%', sm: 'auto' }, // Full width on mobile, auto on larger screens
          }}
        >
          <img
            src={`data:image/png;base64,${data.Image}`}
            alt={`${data.Currency} Flag`}
            style={{
              width: '20px',
              height: '20px',
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: { md: '12px',xs: '12px', sm: '16px' }, // Smaller font size for mobile
              color: 'white',
            }}
          >
            {data.Currency}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{
              fontSize: { md: '10px',xs: '10px', sm: '14px' }, // Smaller font size for mobile
              color: 'white',
            }}
          >
            {data.ExchangeRate} {data.Unit}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default UserExchangeRateCardComponent;
