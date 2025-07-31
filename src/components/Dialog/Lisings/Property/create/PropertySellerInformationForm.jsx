import React, { useEffect,useState } from 'react';
import { FormControl, Grid, TextField, Typography, Box, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

function PropertySellerInformationForm({ handleBack, handleSubmit, setSellerInformation, sellerInformationData, oldData, status }) {

  useEffect(() => {
    if (status === 'edit' && oldData) {
      setSellerInformation({
        name: oldData.SellerName || '',
        primaryPhone: oldData.PrimaryPhoneNumber || '',
        backupPhone: oldData.SecondaryPhoneNumber || '',
        email: oldData.Email || '',
        address: oldData.Address || '',
      })
    } else if (sellerInformationData) {
      setSellerInformation(prev => ({
        ...prev,
        name: sellerInformationData.name || '',
        primaryPhone: sellerInformationData.primaryPhone || '',
        backupPhone: sellerInformationData.backupPhone || '',
        email: sellerInformationData.email || '',
        address: sellerInformationData.address || '',
      }))
    }
  }, [status, oldData, setSellerInformation, sellerInformationData]);

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSellerInformation(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    setIsLoading(true)
    handleSubmit(); // Call the submit function
  };

  const isSubmitDisabled =
    status !== 'edit' && (
      !sellerInformationData.name ||
      !sellerInformationData.primaryPhone ||
      !sellerInformationData.address ); // Add other required fields if any

  return (
    <Grid container spacing={2} width={'100%'} paddingX={15} paddingY={6} sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <Typography variant='h5' sx={{ fontWeight: '700', width: '100%' }}>
        Seller Information
      </Typography>

      <Grid sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }} item xs={4}>
        <FormControl fullWidth>
          <Typography variant='p'>Name of seller</Typography>
          <TextField
            name="name"
            placeholder='Enter Name'
            value={sellerInformationData.name}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>
      </Grid>

      <Grid sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }} item xs={12}>
        <FormControl fullWidth>
          <Typography variant='p'>Primary Phone Number</Typography>
          <TextField
            name="primaryPhone"
            placeholder='+959 123 456 789'
            value={sellerInformationData.primaryPhone}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography variant='p'>Backup Phone Number (optional)</Typography>
          <TextField
            name="backupPhone"
            placeholder='+959 123 456 789'
            value={sellerInformationData.backupPhone}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography variant='p'>Email Address (optional)</Typography>
          <TextField
            name="email"
            placeholder='seller@gmail.com'
            value={sellerInformationData.email}
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
            value={sellerInformationData.address}
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
              disabled={isSubmitDisabled}
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

export default PropertySellerInformationForm;
