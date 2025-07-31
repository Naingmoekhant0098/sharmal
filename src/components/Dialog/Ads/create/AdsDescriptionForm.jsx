import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import LoadingButton from '@mui/lab/LoadingButton';

function AdsDescriptionForm({ handleSubmit, handleBack, Title, TargetUrl, StartDate, EndDate, oldData, status }) {
  const [title, setTitle] = useState(Title || '');
  const [targetUrl, setTargetUrl] = useState(TargetUrl || '');
  const [startDate, setStartDate] = useState(StartDate || null);
  const [endDate, setEndDate] = useState(EndDate || null);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (status === 'edit' && oldData) {
      // Pre-fill form with old data if in edit mode
      setTitle(oldData.Title || '');
      setTargetUrl(oldData.TargetUrl || '');
      setStartDate(oldData.StartDate ? new Date(oldData.StartDate) : null);
      setEndDate(oldData.EndDate ? new Date(oldData.EndDate) : null);
    } else {
      // Initialize with passed props
      setTitle(Title || '');
      setTargetUrl(TargetUrl || '');
      setStartDate(StartDate || null);
      setEndDate(EndDate || null);
    }
  }, [status, oldData, Title, TargetUrl, StartDate, EndDate]);

  const handleFormSubmit = () => {
    
    // Format dates as MM/DD/YYYY
    const formattedStartDate = startDate ? format(startDate, 'M/d/yyyy') : '';
    const formattedEndDate = endDate ? format(endDate, 'M/d/yyyy') : '';

    handleSubmit({ title, targetUrl, startDate: formattedStartDate, endDate: formattedEndDate });
    setIsLoading(true)
  };

  // Check if any required field is empty
  const isSubmitDisabled = !title || !targetUrl || !startDate || !endDate;

  return (
    <Box sx={{ marginTop: 4, paddingX: 5 }}>
      <Typography variant="h6" component="h1" gutterBottom sx={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 3 }}>
        Detailed Description
      </Typography>
      <Box sx={{ width: '100%', height: 'auto' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ paddingX: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Title
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Target URL
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter target URL"
                  variant="outlined"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Start Date
                </Typography>
                <DatePicker
                  sx={{ width: '100%' }}
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  End Date
                </Typography>
                <DatePicker
                  sx={{ width: '100%' }}
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </Box>
        </LocalizationProvider>
      </Box>
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
    </Box>
  );
}

export default AdsDescriptionForm;
