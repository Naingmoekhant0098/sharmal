import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, FormControl, FormControlLabel, Checkbox, Radio, FormLabel, RadioGroup, FormGroup, Box, Button } from '@mui/material';

function PropertyDetailedDescriptionForm({ handleNext, handleBack, propertyFeatures = [], setDetailedDescriptionData, onCheckedChange}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [furnished, setFurnished] = useState('');
  const [features, setFeatures] = useState({});

  useEffect(() => {
    
    if (!propertyFeatures || !Array.isArray(propertyFeatures)) {
      console.error('Invalid propertyFeatures data');
      return;
    }

    const initialState = {};
    propertyFeatures.forEach((item) => {
      if (item && item.Name && !item.IsDeleted) {
        const key = item.Name.toLowerCase().replace(/ /g, '');
        initialState[key] = false;
      }
    });
    
    setFeatures(initialState);
  }, [propertyFeatures]);

  const handleFeatureChange = (event) => {
    const { name, checked } = event.target;
    setFeatures((prevFeatures) => ({ ...prevFeatures, [name]: checked }));
  };

  const handleFormSubmit = () => {
    const selectedFeatures = Object.keys(features).filter(feature => features[feature]).join(', ');

    setDetailedDescriptionData({
      title,
      description,
      mapUrl,
      furnished,
      features: selectedFeatures,
    });
    handleNext(); // Move to the next step
  };

  return (
    <Grid container spacing={2} width={'100%'} paddingX={15} paddingY={6} sx={{ display: 'flex', flexDirection: 'row' }}>
      <Typography variant='h5' sx={{ fontWeight: '700', width: '100%' }}>
        Detailed Description
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <Typography variant='p'>Title</Typography>
            <TextField
              placeholder='Enter Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              multiline
              rows={4}
              maxRows={6}
              variant="outlined"
            />
            <Grid item xs={12} spacing={4} sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
              <FormControl sx={{ marginRight: '25px' }}>
                <FormLabel>Furnished</FormLabel>
                <RadioGroup
                  aria-labelledby="furnished-radio-buttons-group-label"
                  name="furnished-group"
                  value={furnished}
                  onChange={(e) => setFurnished(e.target.value)}
                >
                  <FormControlLabel value="Fully-furnished" control={<Radio />} label="Fully-furnished" />
                  <FormControlLabel value="Unfurnished" control={<Radio />} label="Unfurnished" />
                  <FormControlLabel value="Partly-furnished" control={<Radio />} label="Partly-furnished" />
                </RadioGroup>
              </FormControl>

              <FormGroup>
                <FormLabel>Features</FormLabel>
                {Object.keys(features).length > 0 ? (
                  Object.keys(features).map((feature) => (
                    <FormControlLabel
                      key={feature}
                      control={
                        <Checkbox
                          name={feature}
                          checked={features[feature]}
                          onChange={handleFeatureChange}
                        />
                      }
                      label={<Typography variant="p" sx={{ fontSize: '17px' }}>{feature.replace(/([A-Z])/g, ' $1').trim()}</Typography>}
                    />
                  ))
                ) : (
                  <Typography variant="body2">No features available</Typography>
                )}
              </FormGroup>
            </Grid>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <Typography variant='p'>Description</Typography>
            <TextField
              placeholder='Enter Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={10}
              maxRows={10}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <Typography variant='p'>Map URL</Typography>
            <TextField
              placeholder='Enter URL'
              value={mapUrl}
              onChange={(e) => setMapUrl(e.target.value)}
              variant="outlined"
            />
          </FormControl>

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
              onClick={handleFormSubmit}
              sx={{ marginLeft: '8px', textTransform: 'none', width: '100px' }}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PropertyDetailedDescriptionForm;
