import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Button,
  FormControl,
  FormGroup,
  Checkbox,
  TextField,
  Radio,
  FormLabel
} from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import GradientButtonComponent from "../Button/GradientButtonComponent";
import { toast } from "react-toastify"; // Import toast for notifications
import "./DrawerStyle.css"; // Import the CSS file
import theme from '../../theme';
import { GetPropertyAPI } from "../../api/Listings/property/propertyController";
import LoadingButton from '@mui/lab/LoadingButton';
import { GetPropertyFurnished, GetPropertyTypes } from "../../api/constant/GetConstantDataController";

const ListingsPropertyFilterDrawerComponent = ({
  isFilterDrawerOpen,
  handleFilterClose,
  setData,
  setIsLoading,
  isLoading,
  setTotalCount,
  setPropertyFilterPayload,
  setPage
}) => {
  // Default filter states
  const [selectedStatus, setStatus] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [bankInstallment, setBankInstallment] = useState(false);
  const [hotDeal, setHotDeal] = useState(false);
  const [typeSelections, setTypeSelections] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [furnished, setFurnished] = useState('');
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyFurnished, setPropertyFurnished] = useState([])
  const [code, setCode] = useState('')


  const handleStatusChange = (status) => {
    setStatus(status);
  };

  useEffect(() => {
    const fetchData = async () => {
      await GetPropertyTypes(setPropertyTypes);
      await GetPropertyFurnished(setPropertyFurnished);
    }

    fetchData();
  }, [])

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setTypeSelections((prevSelections) =>
      prevSelections.includes(value)
        ? prevSelections.filter((type) => type !== value)
        : [...prevSelections, value]
    );
  };

  const handleUpdateResults = async () => {
    const payload = {
      PageNo: 1,
      PageSize: 10,
      Code: code,
      Status: selectedStatus !== "All" ? selectedStatus : "",
      Furnished: furnished || "",
      Type: typeSelections.length > 0 ? typeSelections.join(',') : "",
      PaymentOption: [negotiable ? "Negotiable" : "", bankInstallment ? "Bank installment" : "", hotDeal ? "Hot Deal" : ""]
        .filter(Boolean)
        .join(','),
      MinPrice: minPrice || null,
      MaxPrice: maxPrice || null,
      MinBedRooms: minBedrooms || null,
      MaxBedRooms: maxBedrooms || null
    };

    setPropertyFilterPayload({
    
      Status: selectedStatus !== "All" ? selectedStatus : "",
      Furnished: furnished || "",
      Type: typeSelections.length > 0 ? typeSelections.join(',') : "",
      PaymentOption: [negotiable ? "Negotiable" : "", bankInstallment ? "Bank installment" : "", hotDeal ? "Hot Deal" : ""]
        .filter(Boolean)
        .join(','),
      MinPrice: minPrice || null,
      MaxPrice: maxPrice || null,
      MinBedRooms: minBedrooms || null,
      MaxBedRooms: maxBedrooms || null
    });

    handleFilterClose(); // Close drawer after updating results
    await GetPropertyAPI(payload, setData, setTotalCount, toast, setIsLoading);
    setPage(0);
  };


  const handleResetFilters = () => {
    setCode('')
    setStatus('');
    setNegotiable(false);
    setBankInstallment(false);
    setHotDeal(false);
    setTypeSelections([]);
    setMinPrice('');
    setMaxPrice('');
    setMinBedrooms('');
    setMaxBedrooms('');
    setFurnished(null);
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
            <Typography variant="subtitle1">Status</Typography>
            <Button
              variant={selectedStatus === 'ရောင်းရန်' ? 'contained' : 'outlined'}
              onClick={() => handleStatusChange('ရောင်းရန်')}
              sx={{ borderRadius: theme.shape.borderRadius, textTransform: theme.shape.textTransform }}
            >
              Sale
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              variant={selectedStatus === 'ငှားရန်' ? 'contained' : 'outlined'}
              onClick={() => handleStatusChange('ငှားရန်')}
              sx={{ borderRadius: theme.shape.borderRadius, textTransform: theme.shape.textTransform }}
            >
              Rent
            </Button>
          </Box>

          <Box>
            <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row' }}>
              <FormGroup sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={<Checkbox checked={negotiable} onChange={() => setNegotiable(!negotiable)} />}
                  label="Negotiable"
                />
                <FormControlLabel
                  control={<Checkbox checked={bankInstallment} onChange={() => setBankInstallment(!bankInstallment)} />}
                  label="Bank installment"
                />
                <FormControlLabel
                  control={<Checkbox checked={hotDeal} onChange={() => setHotDeal(!hotDeal)} />}
                  label="Hot Deal"
                />
              </FormGroup>
            </FormControl>
          </Box>

          <Box sx={{ height: 'auto', mb: 2 }}>
            <Typography variant="subtitle1">Type</Typography>
            <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'column' }}>
              {propertyTypes.map((type, index) => (
                <FormGroup
                  key={type}
                  sx={{
                    width: index % 2 === 0 ? '87.5%' : '85%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '40%',
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox value={type} checked={typeSelections.includes(type)} onChange={handleTypeChange} />}
                    label={type}
                  />
                </FormGroup>
              ))}
            </FormControl>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Typography variant="subtitle1">Price</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <FormControl fullWidth>
                  <Typography variant='p'>Minimum Price</Typography>
                  <TextField
                    placeholder='No min'
                    variant="outlined"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <Typography variant='p'>Maximum Price</Typography>
                  <TextField
                    placeholder='No max'
                    variant="outlined"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Typography variant="subtitle1">Bedrooms</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <FormControl fullWidth>
                  <Typography variant='p'>Minimum Bedrooms</Typography>
                  <TextField
                    placeholder='No min'
                    variant="outlined"
                    value={minBedrooms}
                    onChange={(e) => setMinBedrooms(e.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <Typography variant='p'>Maximum Bedrooms</Typography>
                  <TextField
                    placeholder='No max'
                    variant="outlined"
                    value={maxBedrooms}
                    onChange={(e) => setMaxBedrooms(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1">Furnished</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="furnished"
                  value={furnished}
                  onChange={(e) => setFurnished(e.target.value)}
                  row
                >
                  {propertyFurnished.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
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

export default ListingsPropertyFilterDrawerComponent;
