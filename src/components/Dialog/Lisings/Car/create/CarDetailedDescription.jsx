import React, { useState, useEffect } from 'react';
import { FormControl, Grid, TextField, Typography, MenuItem, Select, Radio, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import { Box, Button, OutlinedInput } from '@mui/material';
import { SelectableDataForCar } from '../../../../../data/selectableData';
import { GetFuelTypes, GetLincenseStatus, GetPlateColors, GetPlateDivision } from '../../../../../api/constant/GetConstantDataController';

function CarDetailedDescription({ handleNext, handleBack, descriptionData, setDescriptionData, oldData, status }) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [fuelTypes, setFuelTypes] = useState([]);
  const [lincenseStatus, setLincenseStatus] = useState([]);
  const [plateColors, setPlateColors] = useState([])
  const [plateDivision, setPlateDivision] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        await GetFuelTypes(setFuelTypes)
        await GetLincenseStatus(setLincenseStatus)
        await GetPlateColors(setPlateColors)
        await GetPlateDivision(setPlateDivision)
      } catch (error) {

      }
    }

    fetchData()

    if (status === 'edit' && oldData) {
      setDescriptionData({
        Title: oldData.Title || '',
        Gearbox: oldData.Gearbox || '',
        SteeringPosition: oldData.SteeringPosition || '',
        EnginePower: oldData.EnginePower || '',
        Description: oldData.Description || '',
        Division: oldData.PlateDivision        || '',
        PlateNo: oldData.PlateNo || '',
        PlateColor: oldData.PlateColor || '',
        FuelType: oldData.FuelType || '',
        Mileage: oldData.Mileage || '',
        LicenseStatus: oldData.LincenseStatus || '',
      });
    }
  }, [status, oldData, setDescriptionData]);


  const isNextDisabled = status !== 'edit' &&  !(
    descriptionData.Title &&
    descriptionData.Gearbox &&
    descriptionData.SteeringPosition &&
    descriptionData.EnginePower &&
    descriptionData.Description &&
    descriptionData.Division &&
    descriptionData.PlateNo &&
    descriptionData.PlateColor &&
    descriptionData.FuelType &&
    descriptionData.Mileage &&
    descriptionData.LicenseStatus
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDescriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={2} width={'100%'} paddingX={10} paddingY={6} sx={{ display: 'flex', flexDirection: 'row' }}>
      <Typography variant='h5' sx={{ fontWeight: '700', width: '100%' }}>
        Detailed Description
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <Typography variant='p'>Title</Typography>
            <TextField
              name="Title"
              placeholder='Enter Title'
              value={descriptionData.Title || ''}
              onChange={handleChange}
              multiline
              variant="outlined"
            />
            <Grid item xs={12} spacing={4} sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px', gap: '10px' }}>
              <FormControl sx={{ marginRight: '25px' }}>
                <FormLabel>Gearbox</FormLabel>
                <RadioGroup
                  name="Gearbox"
                  value={descriptionData.Gearbox}
                  onChange={handleChange}
                  sx={{ display: 'flex', flexDirection: 'row' }}
                >
                  <FormControlLabel value="Manual" control={<Radio />} label="Manual" />
                  <FormControlLabel value="Automatic" control={<Radio />} label="Automatic" />
                  <FormControlLabel value="Semi Auto" control={<Radio />} label="Semi Auto" />
                </RadioGroup>
              </FormControl>

              <FormControl sx={{ marginRight: '25px' }}>
                <FormLabel>Steering Position</FormLabel>
                <RadioGroup
                  name="SteeringPosition"
                  value={descriptionData.SteeringPosition}
                  onChange={handleChange}
                  sx={{ display: 'flex', flexDirection: 'row' }}
                >
                  <FormControlLabel value="LeftHandDrive" control={<Radio />} label="Left-hand Drive" />
                  <FormControlLabel value="RightHandDrive" control={<Radio />} label="Right-hand Drive" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <FormControl fullWidth sx={{ marginTop: '20px' }}>
              <Typography variant='p'>Engine Power</Typography>
              <TextField
                name="EnginePower"
                placeholder='Enter engine power'
                value={descriptionData.EnginePower || ''}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
          </FormControl>
        </Grid>

        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl fullWidth>
            <Typography variant='p'>Description</Typography>
            <TextField
              name="Description"
              placeholder='Enter description'
              value={descriptionData.Description || ''}
              onChange={handleChange}
              multiline
              rows={6}
              maxRows={6}
              variant="outlined"
            />
          </FormControl>

          <Grid sx={{ display: 'flex', flexDirection: 'row', gap: '10px', mt: '25px' }} item>
            <FormControl fullWidth>
              <Typography variant="body1">Plate Division</Typography>
              <Select
                displayEmpty
                name="Division"
                value={descriptionData.Division}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (selected ? selected : <em>Select a division</em>)}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em>Select a division</em>
                </MenuItem>
                {plateDivision.map((division) => (
                  <MenuItem key={division} value={division}>
                    {division}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Typography variant='p'>Plate No.</Typography>
              <TextField
                name="PlateNo"
                value={descriptionData.PlateNo || ''}
                onChange={handleChange}
                placeholder='Enter plate no.'
                variant="outlined"
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="body1">Plate Color</Typography>
              <Select
                displayEmpty
                name="PlateColor"
                value={descriptionData.PlateColor}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (selected ? selected : <em>Select a color</em>)}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em>Select a color</em>
                </MenuItem>
                {plateColors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid sx={{ display: 'flex', flexDirection: 'row', gap: '10px', mt: '25px' }}>
            <FormControl fullWidth>
              <Typography variant="body1">Fuel Type</Typography>
              <Select
                displayEmpty
                name="FuelType"
                value={descriptionData.FuelType}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (selected ? selected : <em>Select a fuel type</em>)}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em>Select a fuel type</em>
                </MenuItem>
                {fuelTypes.map((fuelType) => (
                  <MenuItem key={fuelType} value={fuelType}>
                    {fuelType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="body1">Mileage (km/l)</Typography>
              <TextField
                name="Mileage"
                value={descriptionData.Mileage || ''}
                onChange={handleChange}
                placeholder="Enter mileage"
                variant="outlined"
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="body1">License Status</Typography>
              <Select
                displayEmpty
                name="LicenseStatus"
                value={descriptionData.LicenseStatus}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (selected ? selected : <em>Select a status</em>)}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em>Select a status</em>
                </MenuItem>
                {lincenseStatus.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default CarDetailedDescription;
