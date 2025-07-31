import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(180deg, #E0DEF7 0%, rgba(224, 222, 247, 0) 100%)',
  borderRadius: '20px',
  marginTop: 30,
  [theme.breakpoints.down('md')]: {
    padding: '15px 20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 15px',
  },
}));

const ExchangeRateCardComponent = ({ exchangeRates, onDataChange }) => {
  const [rates, setRates] = useState(exchangeRates);

  useEffect(() => {
    setRates(exchangeRates);
  }, [exchangeRates]);

  const handleRateChange = (id, newRate) => {
    const updatedRates = rates.map((rate) =>
      rate.ExchangeRateId === id ? { ...rate, ExchangeRate: newRate } : rate
    );
    setRates(updatedRates);
    onDataChange(updatedRates);
  };

  return (
    <ThemeProvider theme={theme}>
      {rates.map((rate) => (
        <GradientCard key={rate.ExchangeRateId} theme={theme}>
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}
            >
              <img
                src={`data:image/png;base64,${rate.Image}`}
                alt={`${rate.Currency} Flag`}
                className="animated-img"
              />
              <Typography
                variant="h4"
                component="div"
                sx={{
                  ml: 2,
                  fontSize: { xs: '24px', sm: '30px', md: '34px' },
                }}
              >
                {rate.Currency}
              </Typography>
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: { xs: '18px', sm: '20px', md: '22px' },
              }}
            >
              <Typography
                variant="h4"
                component="span"
                sx={{
                  color: theme.palette.error.main,
                  letterSpacing: '0.1em',
                  fontSize: { xs: '30px', sm: '40px', md: '50px' },
                  fontWeight: 'bold',
                }}
              >
                1
              </Typography>
              <Typography variant="h6" component="span" sx={{ letterSpacing: '0.1em', mt: 2 }}>
                {rate.Currency}
              </Typography>
              <Typography variant="h6" component="span" sx={{ ml: 2, mr: 2, mt: 2 }}>
                =
              </Typography>
              <TextField
                value={rate.ExchangeRate}
                onChange={(e) => handleRateChange(rate.ExchangeRateId, e.target.value)}
                variant="outlined"
                inputProps={{ maxLength: 4 }}
                sx={{
                  width: '80px',
                  marginRight: 1,
                  '& .MuiInputBase-input': {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: theme.palette.error.main,
                    marginTop: 2,
                    backgroundColor: '#E6E0E9',
                    letterSpacing: '0.1em'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
              <Typography variant="h6" component="span" sx={{ ml: 1, mt: 2 }}>
                MMK
              </Typography>
            </Typography>
          </CardContent>
        </GradientCard>
      ))}
    </ThemeProvider>
  );
};

export default ExchangeRateCardComponent;
