import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';

function AdsPlacementForm({ handleNext, handleBack, adsPagePlacements = [], onCheckedChange, oldData,status  }) {
  const [checked, setChecked] = useState({ allPages: false });
  const [isNextEnabled, setIsNextEnabled] = useState(false); // State to track if 'Next' button should be enabled

  useEffect(() => {
    const initialState = { allPages: false };
    let anyChecked = false;

    adsPagePlacements.map((item) => {
      const key = item.Pages.toLowerCase().replace(/ /g, '');
      initialState[key] = false;

      if (status === 'edit' && oldData?.AdsPagePlacements) {
        const isChecked = oldData.AdsPagePlacements.some(placement => placement.AdsPageId === item.AdsPageId);
        initialState[key] = isChecked;
        if (isChecked) {
          anyChecked = true;
          // Trigger handleChange here to reflect initial checked state
        handleChange({
          target: { name: key, checked: isChecked },
        });
        }
      }

    });

    setChecked(initialState);
    // Enable the 'Next' button if any checkboxes are checked or if in edit mode
    setIsNextEnabled(anyChecked || status === 'edit');
  }, [adsPagePlacements]);

  

  const handleChange = (event) => {
    const { name, checked: isChecked } = event.target;

    if (name === 'allPages') {
      // Update all checkboxes when 'All Pages' is toggled
      setChecked((prevState) => {
        const newCheckedState = {};
        for (const key in prevState) {
          newCheckedState[key] = isChecked;
        }
        // Notify parent with the updated checked data
        onCheckedChange(
          adsPagePlacements
            .filter((page, index) => newCheckedState[page.Pages.toLowerCase().replace(/ /g, '')])
            .map((page) => ({ index: adsPagePlacements.findIndex(p => p.AdsPageId === page.AdsPageId), AdsPageId: page.AdsPageId }))
        );
        // Enable/disable the 'Next' button based on whether any checkboxes are checked
        setIsNextEnabled(Object.values(newCheckedState).some(val => val));
        return newCheckedState;
      });
    } else {
      // Update 'All Pages' if any individual checkbox is unchecked
      setChecked((prevState) => {
        const newCheckedState = {
          ...prevState,
          [name]: isChecked,
          allPages: Object.values({ ...prevState, [name]: isChecked }).slice(1).every(val => val) // Check if all other checkboxes are still checked
        };
        // Notify parent of the changes
        onCheckedChange(
          adsPagePlacements
            .filter(page => newCheckedState[page.Pages.toLowerCase().replace(/ /g, '')])
            .map((page) => ({ index: adsPagePlacements.findIndex(p => p.AdsPageId === page.AdsPageId), AdsPageId: page.AdsPageId }))
        );
        // Enable/disable the 'Next' button based on whether any individual checkboxes are checked
        setIsNextEnabled(Object.values(newCheckedState).slice(1).some(val => val));
        return newCheckedState;
      });
    }
  };

  return (
    <Box sx={{ marginTop: '32px', paddingX: 10 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Ads Placement
      </Typography>
      <Typography variant="subtitle1">Pages</Typography>
      <FormGroup sx={{ paddingLeft: '15px' }}>
        {[{ name: 'allPages', label: 'All Pages' }, ...adsPagePlacements.map((page) => ({
          name: page.Pages.toLowerCase().replace(/ /g, ''),
          label: page.Pages,
        }))].map((item) => (
          <FormControlLabel
            key={item.name}
            control={
              <Checkbox
                checked={checked[item.name] || false}
                onChange={handleChange}
                name={item.name}
              />
            }
            label={<Typography variant="h6" sx={{ fontSize: '12px' }}>{item.label}</Typography>}
          />
        ))}
      </FormGroup>
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
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          sx={{ marginLeft: '8px', textTransform: 'none', width: '100px' }}
          disabled={!isNextEnabled} // Disable 'Next' button based on isNextEnabled state
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default AdsPlacementForm;
