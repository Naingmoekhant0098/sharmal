import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, FormControl, FormControlLabel, Checkbox, FormLabel, FormGroup, Box, Button, Select, MenuItem, InputLabel, Radio } from '@mui/material';
import Switch from '@mui/material/Switch';
import { GetAllNeededDataFromCarApi } from '../../api/Listings/car/carController';
import { GetCarColor, GetFuelTypes, GetManufacturers, GetPlateColors, GetPlateDivision } from '../../api/constant/GetConstantDataController';

const UserCarFilterComponent = ({ totalCount, setAddiitonFilter }) => {
  const [formData, setFormData] = useState({
    Condition: '',
    Manufacturer: '',
    Model: '',
    Gearbox: '',
    MinPrice: '',
    MaxPrice: '',
    SteeringPosition: '',
    Year: '',
    EnginePower: '',
    FuelType: '',
    CarColor: '',
    PlateDivision: '',
    Location: '',
    PlateColor: '',
    bankLoan: true,
  });

  const [AvaliableYear, setAvaliableYear] = useState([])
  const [AvaliableEnginPower, setAvaliableEnginPower] = useState([])
  const [AvaliableCarModel, setAvaliableCarModel] = useState([])
  const [manufacturers, setManufacturers] = useState([])
  const [fuelTypes, setFuelTypes] = useState([])
  const [carColors, setCarColors] = useState([])
  const [plateDivision, setPlateDivision] = useState([])
  const [plateColors, setPlateColors] = useState([])

  useEffect(() => {
    const fetchNeededData = async () => {
      try {
        await GetAllNeededDataFromCarApi(totalCount, setAvaliableYear, setAvaliableCarModel,setAvaliableEnginPower)
        await GetManufacturers(setManufacturers)
        await GetFuelTypes(setFuelTypes)
        await GetCarColor(setCarColors)
        await GetPlateDivision(setPlateDivision)
        await GetPlateColors(setPlateColors)
      } catch (error) {


      }
    }

    fetchNeededData();
  }, [totalCount])


  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = () => {


    setAddiitonFilter(formData)
  };
  return (
    <>
      <Box sx={{
        backgroundColor: '#ffffff',
        marginTop: "10px",
        width: '70%',
        height: 'auto',
        display: "flex",
        flexDirection: 'column',
        borderRadius: "25px",
        padding: '20px',
        gap: '30px'
      }}>



        <Box>
          <Typography>New/ Used</Typography>
          <Box sx={{
            width: '100%',
            display: 'flex',
            marginTop: "5px",
            flexDirection: 'row',
            gap: '10px'
          }}>
            <Button
              variant={formData.Condition === 'အားလုံး' ? 'contained' : 'outlined'}
              onClick={() => handleChange('Condition', '')}>
              အားလုံး
            </Button>
            <Button
              variant={formData.Condition === 'Used' ? 'contained' : 'outlined'}
              onClick={() => handleChange('Condition', 'Used')}>
              Used
            </Button>
            <Button
              variant={formData.Condition === 'Brand New' ? 'contained' : 'outlined'}
              onClick={() => handleChange('Condition', 'Brand New')}>
              New
            </Button>
          </Box>
        </Box>

        {/* Manufacturer Select */}
        <Box>
          <Typography>ကားထုတ်လုပ်သူ</Typography>
          <FormControl fullWidth>
            <InputLabel id="bedroom-select-label">ကားထုတ်လုပ်သူ</InputLabel>
            <Select
              labelId="bedroom-select-label"
              id="bedroom-select"
              value={formData.Manufacturer}
              label="ကားထုတ်လုပ်သူ"
              onChange={(e) => handleChange('Manufacturer', e.target.value)}
            >
              {manufacturers.map((manufacturer, index) => (
                <MenuItem key={index} value={manufacturer}>
                  {manufacturer}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Manufacturer Select */}
        <Box>
          <Typography>ကားမော်ဒယ်</Typography>
          <FormControl fullWidth>
            <InputLabel id="bedroom-select-label">ကားမော်ဒယ်</InputLabel>
            <Select
              labelId="bedroom-select-label"
              id="bedroom-select"
              value={formData.Model}
              label="ကားမော်ဒယ်"
              onChange={(e) => handleChange('Model', e.target.value)}
            >
              {AvaliableCarModel.map((CarModel, index) => (
                <MenuItem key={index} value={CarModel}>
                  {CarModel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Gearbox Select */}
        <Box>
          <Typography>Auto/Manual/Semi Auto</Typography>
          <FormControl fullWidth>
            <InputLabel id="bedroom-select-label">Auto/Manual/Semi Auto</InputLabel>
            <Select
              labelId="bedroom-select-label"
              id="bedroom-select"
              value={formData.Gearbox}
              label="Auto/Manual"
              onChange={(e) => handleChange('Gearbox', e.target.value)}
            >
              <MenuItem value="Automatic">Automatic</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
              <MenuItem value="Semi Auto">Semi Auto</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography sx={{mb:2}}>ဈေးနှုန်း (သိန်း) — ၁ သိန်းရှာရန် "1" လို့ရိုက်ပါ၊ ၁ သိန်း ၅ သောင်း (၁၅၀၀၀၀) ရှာရန် "1.5" လို့ရိုက်ပါ။</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <FormControl fullWidth>
              <TextField
                label="No min"
                value={formData.MinPrice}
                onChange={(e) => handleChange('MinPrice', e.target.value)}
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="No max"
                value={formData.MaxPrice}
                onChange={(e) => handleChange('MaxPrice', e.target.value)}
                variant="outlined"
              />
            </FormControl>
          </Box>
        </Box>


        {/* Status Checkboxes */}
        <FormGroup>
          <FormLabel>ဘယ်မောင်း/ညာမောင်း</FormLabel>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormGroup>
              <FormControlLabel
                control={<Radio checked={formData.SteeringPosition === ''} onChange={() => handleChange('SteeringPosition', '')} value="Any" />}
                label="Any"
              />
              <FormControlLabel
                control={<Radio checked={formData.SteeringPosition === 'Left-hand Drive'} onChange={() => handleChange('SteeringPosition', 'Left-hand Drive')} value="Left-hand Drive" />}
                label="ဘယ်မောင်း"
              />
              <FormControlLabel
                control={<Radio checked={formData.SteeringPosition === 'Right-hand Drive'} onChange={() => handleChange('SteeringPosition', 'Right-hand Drive')} value="Right-hand Drive" />}
                label="ညာမောင်း"
              />

            </FormGroup>
          </Box>
        </FormGroup>

        {/* Year Select */}
        <Box>
          <Typography>ထုတ်လုပ်သည့်နှစ်</Typography>
          <FormControl fullWidth>
            <InputLabel id="bedroom-select-label">Year</InputLabel>
            <Select
              labelId="bedroom-select-label"
              id="bedroom-select"
              value={formData.Year}
              label="Auto/Manual"
              onChange={(e) => handleChange('Year', e.target.value)}
            >
              {AvaliableYear.map((year, index) => (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* EnginePower Select */}
        <Box>
          <Typography>အင်ဂျင်ပါဝါ</Typography>
          <FormControl fullWidth>
            <InputLabel id="bedroom-select-label">EnginePower</InputLabel>
            <Select
              labelId="bedroom-select-label"
              id="bedroom-select"
              value={formData.EnginePower}
              label="Auto/Manual"
              onChange={(e) => handleChange('EnginePower', e.target.value)}
            >
              {AvaliableEnginPower.map((EnginPower) => (
                <MenuItem key={EnginPower} value={EnginPower}>
                  {EnginPower}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* FuelType Select */}
        <Box>
          <Typography>လောင်စာအမျိုးအစား</Typography>
          <FormControl fullWidth>
            <InputLabel id="fueltype-select-label">FuelType</InputLabel>
            <Select
              labelId="fueltype-select-label"
              id="fueltype-select"
              value={formData.FuelType}
              label="FuelType"
              onChange={(e) => handleChange('FuelType', e.target.value)}
            >
              {fuelTypes.map((fuelType) => (
                <MenuItem key={fuelType} value={fuelType}>
                  {fuelType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Color Select */}
        <Box>
          <Typography>အရောင်</Typography>
          <FormControl fullWidth>
            <InputLabel id="bedroom-select-label">CarColor</InputLabel>
            <Select
              labelId="bedroom-select-label"
              id="bedroom-select"
              value={formData.CarColor}
              label="Auto/Manual"
              onChange={(e) => handleChange('CarColor', e.target.value)}
            >
              {carColors.map((color, index) => (
                <MenuItem key={index} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* နံပါတ်ပြား Select */}
        <Box>
          <Typography>နံပါတ်ပြား</Typography>
          <FormControl fullWidth>
            <InputLabel id="bedroom-select-label">PlateDivision</InputLabel>
            <Select
              labelId="bedroom-select-label"
              id="bedroom-select"
              value={formData.PlateDivision}
              label="Auto/Manual"
              onChange={(e) => handleChange('PlateDivision', e.target.value)}
            >
              {plateDivision.map((PlateDivision, index) => (
                <MenuItem key={index} value={PlateDivision}>
                  {PlateDivision}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* နံပါတ်ပြားအရောင် Select */}
        <Box>
          <Typography>နံပါတ်ပြားအရောင်</Typography>
          <FormControl fullWidth>
            <InputLabel id="bedroom-select-label">PlateColor</InputLabel>
            <Select
              labelId="bedroom-select-label"
              id="bedroom-select"
              value={formData.PlateColor}
              label="Auto/Manual"
              onChange={(e) => handleChange('PlateColor', e.target.value)}
            >
              {plateColors.map((PlateColor, index) => (
                <MenuItem key={index} value={PlateColor}>
                  {PlateColor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


        </Box>

        {/* Bank Loan Checkbox */}
        <FormControlLabel
          control={<Switch checked={formData.bankLoan} onChange={() => handleChange('bankLoan', !formData.bankLoan)} />}
          label="ဘဏ်အရစ်ကျ"
          sx={{ marginLeft: 'auto', flexDirection: 'row-reverse' }}
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" onClick={handleSubmit}>ရှာဖွေမည်</Button>
      </Box>
    </>
  )
}

export default UserCarFilterComponent
