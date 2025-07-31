import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  Select,
  OutlinedInput,
  MenuItem,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import GradientButtonComponent from "../Button/GradientButtonComponent";
import { toast } from "react-toastify";
import { GetCarApi, GetFilterCarApi } from "../../api/Listings/car/carController";
import "./DrawerStyle.css";
import theme from '../../theme';
import LoadingButton  from '@mui/lab/LoadingButton';
import { GetBuildType, GetManufacturers } from "../../api/constant/GetConstantDataController";



const gearBoxes = ['Manual', 'Automatic', 'Semi Auto'];


const ListingCarFilterDrawerComponent = ({
  isFilterDrawerOpen,
  handleFilterClose,
  setData,
  setIsLoading,
  isLoading,
  setTotalCount,
  setCarFilterPayload,
  setPage
}) => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [manufacturers, setManufacturers] = useState([])
  const [builtTypes, setBuiltTypes] = useState([])
  const [carData, setCarData] = useState({
    Manufacturer: '',
    Model: '',
    EnginePower: '',
    BuildType: '',
    GearBox: '',
    MinPrice: '',
    MaxPrice: '',
    SteerPosition: '',
    Color: '',
  });
  const [code, setCode] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        await GetManufacturers(setManufacturers)
        await GetBuildType(setBuiltTypes)
      } catch (error) {
        console.error("Error fetching StateDivision:", error);
      }
    }
    fetchData();
  },[] )


  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setSelectedStatus("All");
    setCode('')
    setCarData({
      Manufacturer: '',
      Model: '',
      EnginePower: '',
      BuildType: '',
      GearBox: '',
      MinPrice: '',
      MaxPrice: '',
      SteerPosition: '',
      Color: '',
    });
  };

  const handleUpdateResults = async () => {
    const payload = {
      PageNo: 1,
      PageSize: 10,
      Code: code,
      Manufacturer: carData.Manufacturer || "",
      Model: carData.Model || "",
      EnginePower: carData.EnginePower || "",
      Gearbox: carData.GearBox || "",
      SteerPosition: carData.SteerPosition || "",
      CarColor: carData.Color || "",
      MinPrice: carData.MinPrice ? parseFloat(carData.MinPrice) : 0,
      MaxPrice: carData.MaxPrice ? parseFloat(carData.MaxPrice) : 0
    };
  
    setCarFilterPayload({
      Manufacturer: carData.Manufacturer || "",
      Model: carData.Model || "",
      EnginePower: carData.EnginePower || "",
      Gearbox: carData.GearBox || "",
      SteerPosition: carData.SteerPosition || "",
      CarColor: carData.Color || "",
      MinPrice: carData.MinPrice ? parseFloat(carData.MinPrice) : 0,
      MaxPrice: carData.MaxPrice ? parseFloat(carData.MaxPrice) : 0
    });
  
    handleFilterClose(); // Close drawer after updating results
    setIsLoading(true);
    await GetCarApi(payload, setData, setTotalCount, toast, setIsLoading);
    setIsLoading(false);
    setPage(0);
  };
  

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

  return (
    <Drawer
      anchor="right"
      open={isFilterDrawerOpen}
      onClose={handleFilterClose}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          paddingX: 5,
          paddingY: 2
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Filter your Results</Typography>
            <MuiIconButton onClick={handleFilterClose} className="icon-close">
              <CloseIcon />
            </MuiIconButton>
          </Box>

          <Box sx={{marginBottom: '20px'}}>
            <Typography variant="subtitle1">Code</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <FormControl fullWidth>
                <TextField
                  placeholder='Enter your Code No.'
                  variant="outlined"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Condition</Typography>
            <Button
              variant={selectedStatus === 'All' ? 'contained' : 'outlined'}
              onClick={() => handleStatusChange('All')}
              sx={{ borderRadius: theme.shape.borderRadius, textTransform: theme.shape.textTransform }}
            >
              All
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              variant={selectedStatus === 'Used' ? 'contained' : 'outlined'}
              onClick={() => handleStatusChange('Used')}
              sx={{ borderRadius: theme.shape.borderRadius, textTransform: theme.shape.textTransform }}
            >
              Used
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              variant={selectedStatus === 'New' ? 'contained' : 'outlined'}
              onClick={() => handleStatusChange('New')}
              sx={{ borderRadius: theme.shape.borderRadius, textTransform: theme.shape.textTransform }}
            >
              New
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <Typography variant='p'>Manufacturer</Typography>
              <Select
                displayEmpty
                name="Manufacturer"
                value={carData.Manufacturer}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (selected ? selected : <em>All</em>)}
                MenuProps={MenuProps}
              >
                <MenuItem  value="">
                  <em>All</em>
                </MenuItem>
                {manufacturers.map((manufacturer) => (
                  <MenuItem key={manufacturer} value={manufacturer}>
                    {manufacturer}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <Typography variant='p'>Model</Typography>
              <TextField
                name="Model"
                value={carData.Model}
                onChange={handleChange}
                placeholder='Enter Model'
                variant="outlined"
              />
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <Typography variant='p'>Build Type</Typography>
              <Select
                displayEmpty
                name="BuildType"
                value={carData.BuildType}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (selected ? selected : <em>All</em>)}
                MenuProps={MenuProps}
              >
                <MenuItem  value="">
                  <em>All</em>
                </MenuItem>
                {builtTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <Typography variant='p'>Gearbox</Typography>
              <Select
                displayEmpty
                name="GearBox"
                value={carData.GearBox}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (selected ? selected : <em>All</em>)}
                MenuProps={MenuProps}
              >
                <MenuItem  value="">
                  <em>All</em>
                </MenuItem>
                {gearBoxes.map((gearBox) => (
                  <MenuItem key={gearBox} value={gearBox}>
                    {gearBox}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <FormControl fullWidth >
                <Typography variant='p'>Minimum Price</Typography>
                <TextField
                  name="MinPrice"
                  value={carData.MinPrice}
                  onChange={handleChange}
                  placeholder='No min'
                  variant="outlined"
                />
              </FormControl>

              <FormControl fullWidth>
                <Typography variant='p'>Maximum Price</Typography>
                <TextField
                  name="MaxPrice"
                  value={carData.MaxPrice}
                  onChange={handleChange}
                  placeholder='No max'
                  variant="outlined"
                />
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <Typography variant='p'>Color</Typography>
              <TextField
                name="Color"
                value={carData.Color}
                onChange={handleChange}
                placeholder='Enter Color'
                variant="outlined"
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel variant="p" sx={{ color: '#000000' }}>Steering Position</FormLabel>
              <RadioGroup
                name="SteerPosition"
                value={carData.SteerPosition}
                onChange={handleChange}
              >
                <FormControlLabel value="" control={<Radio />} label="Any" />
                <FormControlLabel value="LeftHandDrive" control={<Radio />} label="Left-handed" />
                <FormControlLabel value="RightHandDrive" control={<Radio />} label="Right-handed" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button onClick={handleResetFilters}>Reset Filters</Button>
        {isLoading ? (
            <LoadingButton loading variant="outlined">
              Submitting...
            </LoadingButton>
          ) : (
            <GradientButtonComponent onClick={handleUpdateResults}>
              Update Results
            </GradientButtonComponent>
          )}
          
        </Box>
      </Box>
    </Drawer>
  );
};

export default ListingCarFilterDrawerComponent;
