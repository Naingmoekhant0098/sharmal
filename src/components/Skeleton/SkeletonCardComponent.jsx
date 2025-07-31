import React from 'react';
import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
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

const SkeletonCardComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      {[1, 2, 3].map((item) => (
        <GradientCard key={item} theme={theme}>
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
              <Skeleton variant="rectangular" width={40} height={40} />
              <Typography
                variant="h4"
                component="div"
                sx={{
                  ml: 2,
                  fontSize: { xs: '24px', sm: '30px', md: '34px' },
                }}
              >
                <Skeleton width={60} />
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
                <Skeleton width={20} />
              </Typography>
              <Typography variant="h6" component="span" sx={{ letterSpacing: '0.1em', mt: 2 }}>
                <Skeleton width={40} />
              </Typography>
              <Typography variant="h6" component="span" sx={{ ml: 2, mr: 2, mt: 2 }}>
                <Skeleton width={20} />
              </Typography>
              <Skeleton variant="rectangular" width={80} height={40} sx={{ marginRight: 1 }} />
              <Typography variant="h6" component="span" sx={{ ml: 1, mt: 2 }}>
                <Skeleton width={40} />
              </Typography>
            </Typography>
          </CardContent>
        </GradientCard>
      ))}
    </ThemeProvider>
  );
};

export default SkeletonCardComponent;
