import React, { useEffect, useState } from 'react';
import { FormControl, Grid, TextField, Typography, Box, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

function CarSellerInformationForm({ handleBack, handleSubmit, carSellerData, setSellerInformation, oldData, status }) {
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerInformation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Pre-fill form fields if status is 'edit'
  useEffect(() => {
    if (status === 'edit' && oldData) {
      setSellerInformation({
        sellerName: oldData.SellerName || '',
        primaryPhoneNumber: oldData.PrimaryPhoneNumber || '',
        backupPhoneNumber: oldData.SecondaryPhoneNumber || '',
        emailAddress: oldData.Email || '',
        address: oldData.Address || ''
      });
    }
  }, [status, oldData, setSellerInformation]);
  const [isLoading, setIsLoading] = useState(false)

  // Handle form submission
  const handleFormSubmit = () => {
    setIsLoading(true)

    handleSubmit(); // Call the submit function
  };

  return (
    <Grid container spacing={2} width={'100%'} paddingX={15} paddingY={6} sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <Typography variant='h5' sx={{ fontWeight: '700', width: '100%' }}>
        Seller Information
      </Typography>

      <Grid sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }} item xs={4}>
        <FormControl fullWidth>
          <Typography variant='p'>Name of seller</Typography>
          <TextField
            name="sellerName"
            placeholder='Enter Name'
            value={carSellerData.sellerName}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>
      </Grid>
      <Grid sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }} item xs={12}>
        <FormControl fullWidth>
          <Typography variant='p'>Primary Phone Number</Typography>
          <TextField
            name="primaryPhoneNumber"
            placeholder='+959 123 456 789'
            value={carSellerData.primaryPhoneNumber}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography variant='p'>Backup Phone Number (optional)</Typography>
          <TextField
            name="backupPhoneNumber"
            placeholder='+959 123 456 789'
            value={carSellerData.backupPhoneNumber}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography variant='p'>Email Address (optional)</Typography>
          <TextField
            name="emailAddress"
            placeholder='seller@gmail.com'
            value={carSellerData.emailAddress}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>
      </Grid>
      <Grid sx={{ display: 'flex', flexDirection: 'row' }} item xs={12}>
        <FormControl fullWidth>
          <Typography variant='p'>Address</Typography>
          <TextField
            name="address"
            placeholder='Enter Address'
            value={carSellerData.address}
            onChange={handleChange}
            multiline
            rows={4}
            maxRows={6}
            variant="outlined"
          />
        </FormControl>
      </Grid>

      <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ marginTop: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          sx={{ border: 'none', '&:hover': { border: 'none' }, textTransform: 'none', width: '100px' }}
        >
          Back
        </Button>
        {
          isLoading ? (
            <LoadingButton loading variant="outlined" color="primary">
              Submitting...
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              sx={{ marginLeft: '8px', textTransform: 'none', width: '100px' }}
            >
              Submit
            </Button>
          )
        }

      </Box>
    </Grid>
  );
}

export default CarSellerInformationForm;
