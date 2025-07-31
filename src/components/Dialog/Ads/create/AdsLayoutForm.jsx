import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';

function AdsLayoutForm({ handleNext, handleBack, onLayoutChange, oldData, status }) {
  const [selectedLayout, setSelectedLayout] = useState('');

  useEffect(() => {
    if (status === 'edit' && oldData?.AdsLayout) {
      setSelectedLayout(oldData.AdsLayout);
    }
  }, [status, oldData]);

  const handleClick = (layout) => {
    setSelectedLayout(layout);
    onLayoutChange(layout); // Notify parent component of layout change
  };

  return (
    <Box sx={{ marginTop: '32px', paddingX: 10 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Ads Layout
      </Typography>
      <Grid container spacing={2} sx={{ width: '100%', height: 'auto', paddingX: '20px', marginBottom: 10 }}>
        <Grid
          onClick={() => handleClick('Carousel')}
          item xs={8}
          sx={{
            display: 'flex',
            height: 'auto',
            flexDirection: 'column',
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
            border: selectedLayout === 'Carousel' ? '3px solid black' : '3px solid #e3e3e4',
            borderRadius: '21px 21px 21px 21px',
            backgroundColor: selectedLayout === 'Carousel' ? '#f0f0f0' : 'transparent',
            '&:hover': { borderColor: 'black', backgroundColor: '#f0f0f0' }
          }}
        >
          <Box
            sx={{
              width: '400px',
              height: '200px',
              background: 'linear-gradient(302deg, rgba(80,23,120,1) 0%, rgba(163,32,32,1) 64%, rgba(252,176,69,1) 100%)',
              marginBottom: '5px'
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', alignSelf: 'flex-end', width: 'auto', height: 'auto', gap: '5px', marginBottom: '5px', paddingRight: '120px' }}>
            <Box sx={{ background: 'linear-gradient(302deg, rgba(80,23,120,1) 0%, rgba(163,32,32,1) 64%, rgba(252,176,69,1) 100%)', width: '20px', height: '3px', borderRadius: '20px', display: 'inline-block' }} />
            <Box sx={{ background: 'linear-gradient(302deg, rgba(80,23,120,1) 0%, rgba(163,32,32,1) 64%, rgba(252,176,69,1) 100%)', width: '3px', height: '3px', borderRadius: '100%', display: 'inline-block' }} />
            <Box sx={{ background: 'linear-gradient(302deg, rgba(80,23,120,1) 0%, rgba(163,32,32,1) 64%, rgba(252,176,69,1) 100%)', width: '3px', height: '3px', borderRadius: '100%', display: 'inline-block' }} />
            <Box sx={{ background: 'linear-gradient(302deg, rgba(80,23,120,1) 0%, rgba(163,32,32,1) 64%, rgba(252,176,69,1) 100%)', width: '3.5px', height: '3px', borderRadius: '100%', display: 'inline-block' }} />
          </Box>
          <Typography variant='h4'>Add Carousel Ads</Typography>
        </Grid>
        
        <Grid
          direction="column"
          item xs={4}
          sx={{ padding: 0, margin: 0 }}
        >
          <Grid
            onClick={() => handleClick('Banner')}
            sx={{
              display: 'flex',
              paddingY: 4,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: selectedLayout === 'Banner' ? '3px solid black' : '3px solid #e3e3e4',
              borderRadius: '21px',
              backgroundColor: selectedLayout === 'Banner' ? '#f0f0f0' : 'transparent',
              '&:hover': { borderColor: 'black', backgroundColor: '#f0f0f0' }
            }}
          >
            <Box
              sx={{
                width: '200px',
                height: '20px',
                background: 'linear-gradient(302deg, rgba(80,23,120,1) 0%, rgba(163,32,32,1) 64%, rgba(252,176,69,1) 100%)',
                marginBottom: '20px'
              }}
            />
            <Typography variant='h4' sx={{ fontSize: '15px' }}>Add Banner Ads</Typography>
          </Grid>

          <Grid
            onClick={() => handleClick('Side Bar')}
            sx={{
              display: 'flex',
              paddingY: 4,
              marginTop: 2,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: selectedLayout === 'Side Bar' ? '3px solid black' : '3px solid #e3e3e4',
              borderRadius: '21px',
              backgroundColor: selectedLayout === 'Side Bar' ? '#f0f0f0' : 'transparent',
              '&:hover': { borderColor: 'black', backgroundColor: '#f0f0f0' }
            }}
          >
            <Box
              sx={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(302deg, rgba(80,23,120,1) 0%, rgba(163,32,32,1) 64%, rgba(252,176,69,1) 100%)',
                marginBottom: '20px'
              }}
            />
            <Typography variant='h4' sx={{ fontSize: '15px' }}>Add Side Bar Ads</Typography>
          </Grid>
        </Grid>
      </Grid>


      <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ marginTop: 3 }}>
      <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          sx={{
            border: 'none',
            '&:hover': {
              border: 'none',
            },
            textTransform: 'none',
            width: '100px'
          }}
        >
          Back
        </Button>
      <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          sx={{ marginLeft: '8px', textTransform: 'none', width: '100px' }}

        >
          Next
        </Button>
        
      </Box>
    </Box>
  );
}

export default AdsLayoutForm;
