import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, FormControl, FormControlLabel, Checkbox, Radio, FormLabel, RadioGroup, FormGroup, Box, Button } from '@mui/material';
import { GetPropertyFurnished } from '../../../../../api/constant/GetConstantDataController';

function PropertyDetailedDescriptionForm({ handleNext, handleBack, propertyFeatures = [], detailedDescriptionData, setDetailedDescriptionData, onCheckedChange, oldData, status }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [furnished, setFurnished] = useState('');
  const [features, setFeatures] = useState({});
  const [featureIndex, setFeatureIndex] = useState([]);
  const [propertyFurnished, setPropertyFurnished] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        await GetPropertyFurnished(setPropertyFurnished)
      } catch (error) {
      }
    }

    if (status === 'edit' && oldData) {
      setTitle(oldData.Title || '');
      setDescription(oldData.Description || '');
      setMapUrl(oldData.MapUrl || '');
      setFurnished(oldData.Furnished || '');

      const initialFeatures = {};
      const selectedFeatureIndices = [];

      propertyFeatures.forEach((item, index) => {
        if (item && item.Name && !item.IsDeleted) {
          const isSelected = oldData.PropertyFeatures.some(
            (feature) => feature.FeatureId === item.FeatureId && !feature.IsDeleted
          );

          initialFeatures[item.FeatureId] = isSelected;

          if (isSelected) {
            selectedFeatureIndices.push({ index, FeatureId: item.FeatureId });
          }
        }
      });

      setFeatures(initialFeatures);
      setFeatureIndex(selectedFeatureIndices);
      onCheckedChange(selectedFeatureIndices);
    } else if (detailedDescriptionData) {
      setTitle(detailedDescriptionData.title || '');
      setDescription(detailedDescriptionData.description || '');
      setMapUrl(detailedDescriptionData.mapUrl || '');
      setFurnished(detailedDescriptionData.furnished || '');

      const initialFeatures = {};
      const selectedFeatureIndices = [];

      propertyFeatures.forEach((item, index) => {
        if (item && item.Name && !item.IsDeleted) {
          const isSelected = detailedDescriptionData.features.includes(item.FeatureId.toString());

          initialFeatures[item.FeatureId] = isSelected;

          if (isSelected) {
            selectedFeatureIndices.push({ index, FeatureId: item.FeatureId });
          }
        }
      });

      setFeatures(initialFeatures);
      setFeatureIndex(selectedFeatureIndices);
      onCheckedChange(selectedFeatureIndices);
    }

    fetchData();
  }, [status, propertyFeatures, detailedDescriptionData]);


  const handleFeatureChange = (event) => {
    const { name, checked } = event.target;

    setFeatures((prevFeatures) => {
      const newFeatures = { ...prevFeatures, [name]: checked };

      const selectedFeatureIndices = propertyFeatures
        .map((feature, index) => {
          return newFeatures[feature.FeatureId] ? { index, FeatureId: feature.FeatureId } : null;
        })
        .filter(item => item !== null);

      setFeatureIndex(selectedFeatureIndices);
      onCheckedChange(selectedFeatureIndices);

      return newFeatures;
    });
  };

  const handleFormSubmit = () => {
    const selectedFeatures = Object.keys(features).filter(featureId => features[featureId]).join(', ');

    setDetailedDescriptionData({
      title,
      description,
      mapUrl,
      furnished,
      features: selectedFeatures,
      featureIndex
    });
    handleNext();
  };

  // Check if the required fields are filled when not in edit mode
  const isNextDisabled = status !== 'edit' && (!title || !description || !furnished);

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
                  {propertyFurnished.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                  {/* <FormControlLabel value="Fully-furnished" control={<Radio />} label="Fully-furnished" />
                  <FormControlLabel value="Unfurnished" control={<Radio />} label="Unfurnished" />
                  <FormControlLabel value="Partly-furnished" control={<Radio />} label="Partly-furnished" /> */}
                </RadioGroup>
              </FormControl>

              <FormGroup>
                <FormLabel>Features</FormLabel>
                {propertyFeatures.length > 0 ? (
                  propertyFeatures.map((feature) => {
                    if (!feature.Name) return null;

                    return (
                      <FormControlLabel
                        key={feature.FeatureId}
                        control={
                          <Checkbox
                            name={feature.FeatureId.toString()}
                            checked={features[feature.FeatureId] || false}
                            onChange={handleFeatureChange}
                          />
                        }
                        label={<Typography variant="p" sx={{ fontSize: '17px' }}>{feature.Name}</Typography>}
                      />
                    );
                  })
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
              disabled={isNextDisabled}
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
