import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Radio,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import theme from "../../theme";
import {
  GetDivisionTownshipAPI,
  GetPropertyTypes,
} from "../../api/constant/GetConstantDataController";
import { SelectableDataForProperty } from "../../data/selectableData";
const label = { inputProps: { "aria-label": "Switch demo" } };

const UserPropertyFilterComponent = ({
  initialState,
  totalRecord,
  setAddiitonFilter,
  setIsLoading,
  fetchDataWrapper,
}) => {
  const [Status, setStatus] = useState();
  const [DataForDivision, setDataForDivision] = useState([]);
  const [location, setLocation] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [City, setCity] = useState("");
  const [MinPrice, setMinPrice] = useState("");
  const [MaxPrice, setMaxPrice] = useState("");
  const [Bedrooms, setBedrooms] = useState("");
  const [Bathrooms, setBathrooms] = useState("");
  const [bankLoan, setBankLoan] = useState(true);
  const [Type, setType] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [Filterpayload, setFilterpayload] = useState({
    Status: Status,
    location: null,
    township: null,
    minBedrooms: null,
    maxBedrooms: null,
    minBathrooms: null,
    maxBathrooms: null,
    bankLoan: bankLoan,
    Type: null,
  });

  useEffect(() => {
    setFilterpayload((prev) => ({
      ...prev,
      Status: initialState,
    }));

    const fetchStateDivision = async () => {
      try {
        await GetDivisionTownshipAPI(setDataForDivision);
        await GetPropertyTypes(setPropertyTypes);
      } catch (error) {}
    };

    fetchStateDivision();
  }, [initialState, totalRecord]);

  // Handle change for Select inputs and buttons
  // const handleChange = (name, value) => {
  //   if (name === "location") {
  //     const index = DataForDivision.findIndex((item) => item.mm === value);
  //     setLocation(value);

  //     setSelectedIndex(index);
  //     setCity(""); // Reset city when location changes
  //   } else if (name === "City") {
  //     setCity(value);
  //   }

  //   if (name === 'Status') {
  //     setStatus(value);
  //     setFilterpayload(prev => ({
  //       ...prev,
  //       Status: value,
  //     }));
  //   }
    

  //   if (name === "Bedrooms") {
  //     setBedrooms(value);
  //   }

  //   if (name === "Type") {
  //     value === "အားလုံး" ? setType("") : setType(value);
  //   }

  //   if (name === "MinPrice") {
  //     setMinPrice(value);
  //   }

  //   if (name === "MaxPrice") {
  //     setMaxPrice(value);
  //   }

  //   if (name === "Bathrooms") {
  //     setBathrooms(value);
  //   }

  //   setFilterpayload((prevPayload) => ({
  //     ...prevPayload,
  //     [name]: value || null,
  //   }));
  // };
  const handleChange = (name, value) => {
    switch (name) {
      case "location":
        const index = DataForDivision.findIndex((item) => item.mm === value);
        setLocation(value);
        setSelectedIndex(index);
        setCity("");
        break;
  
      case "City":
        setCity(value);
        break;
  
      case "Status":
        setStatus(value);
        break;
  
      case "Bedrooms":
        setBedrooms(value);
        break;
  
      case "Bathrooms":
        setBathrooms(value);
        break;
  
      case "MinPrice":
        setMinPrice(value);
        break;
  
      case "MaxPrice":
        setMaxPrice(value);
        break;
  
      case "Type":
        setType(value === "အားလုံး" ? "" : value);
        break;
      
      case "bankLoan":
        setBankLoan(value);
        break;
        
      default:
        break;
    }
  
    // Always update filter payload
    setFilterpayload((prev) => ({
      ...prev,
      [name]: value || null,
    }));
  };
  

  const handleSubmit = () => {
    const cleanPayload = {
      ...Filterpayload,
      Status: Filterpayload.Status || Status, // ensure latest
    };
    setAddiitonFilter(cleanPayload);
    setIsLoading(true);
    fetchDataWrapper(cleanPayload);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        marginTop: "10px",
        width: "100%",
        maxWidth: "1200px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: "25px",
        padding: "20px",
        gap: "20px",
      }}
    >
      {/* Sale/Rent Buttons */}
      <Box>
        <Typography>ရောင်းရန် ငှားရန်</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Button
            variant={Status === "ရောင်းရန်" ? "contained" : "outlined"}
            onClick={() => handleChange("Status", "ရောင်းရန်")}
          >
            ရောင်းရန်
          </Button>
          <Button
            variant={Status === "ငှားရန်" ? "contained" : "outlined"}
            onClick={() => handleChange("Status", "ငှားရန်")}
          >
            ငှားရန်
          </Button>
        </Box>
      </Box>

      {/* Status Checkboxes */}
      <FormGroup>
        <FormLabel>အမျိုးအစား</FormLabel>
        <Box
          sx={{
            display: "flex",
           
            height: "280px",
            flexDirection: { md: "column", sm: "row" },
            flexWrap: "wrap",
            gap: "0px",
          }}
        >
          <FormControlLabel
            control={
              <Radio
                checked={Type === ""}
                onChange={() => handleChange("Type", "")}
                value=""
              />
            }
            label="အားလုံး"
          />
          {propertyTypes.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Radio
                  checked={Type === type}
                  onChange={() => handleChange("Type", type)}
                  value={type}
                />
              }
              label={type}
            />
          ))}
        </Box>
      </FormGroup>

      {/* Location and Township Selects */}

      <FormControl fullWidth>
        <InputLabel id="location-select-label">
          တိုင်းဒေသကြီး/ပြည်နယ်
        </InputLabel>
        <Select
          labelId="location-select-label"
          id="location-select"
          value={location}
          label="တိုင်းဒေသကြီး/ပြည်နယ်"
          onChange={(e) => handleChange("location", e.target.value)}
        >
          {DataForDivision.map((Division, index) => (
            <MenuItem key={index} value={Division.mm}>
              {Division.mm}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="township-select-label">မြို့နယ်</InputLabel>
        <Select
          labelId="township-select-label"
          id="township-select"
          value={City}
          label="မြို့နယ်"
          onChange={(e) => handleChange("City", e.target.value)}
        >
          {selectedIndex !== null &&
          DataForDivision[selectedIndex]?.districts?.length > 0 ? (
            DataForDivision[selectedIndex].districts.flatMap((district) =>
              district.townships.map((township, index) => (
                <MenuItem key={index} value={township.mm}>
                  {township.mm}
                </MenuItem>
              ))
            )
          ) : (
            <MenuItem value="" disabled>
              No townships available
            </MenuItem>
          )}
        </Select>
      </FormControl>

      {/* Price Selects */}
      <Grid>
        <Typography sx={{ mb: 2 }}>
          ဈေးနှုန်း (သိန်း) — ၁ သိန်းရှာရန် "1" လို့ရိုက်ပါ၊ ၁ သိန်း ၅ သောင်း
          (၁၅၀၀၀၀) ရှာရန် "1.5" လို့ရိုက်ပါ။
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="No min"
                variant="outlined"
                value={MinPrice}
                onChange={(e) => handleChange("MinPrice", e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="No max"
                variant="outlined"
                value={MaxPrice}
                onChange={(e) => handleChange("MaxPrice", e.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {/* Bedrooms Select */}
      <FormControl fullWidth>
        <InputLabel id="bedroom-select-label">အိပ်ခန်းအရေအတွက်</InputLabel>
        <Select
          labelId="bedroom-select-label"
          id="bedroom-select"
          value={Bedrooms}
          label="အိပ်ခန်းအရေအတွက်"
          onChange={(e) => handleChange("Bedrooms", e.target.value)}
        >
          {SelectableDataForProperty.bedrooms.map((bedroom) => (
            <MenuItem key={bedroom} value={bedroom}>
              {bedroom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="bedroom-select-label">ရေချိုးခန်းအရေအတွက်</InputLabel>
        <Select
          labelId="bedroom-select-label"
          id="bedroom-select"
          value={Bathrooms}
          label="ရေချိုးခန်းအရေအတွက်"
          onChange={(e) => handleChange("Bathrooms", e.target.value)}
        >
          {SelectableDataForProperty.bathrooms.map((bathroom) => (
            <MenuItem key={bathroom} value={bathroom}>
              {bathroom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Bank Loan Checkbox */}
      <FormControlLabel
        control={
          <Switch
            checked={bankLoan}
            onChange={() => handleChange("bankLoan", !bankLoan)}
          />
        }
        label="ဘဏ်အရစ်ကျ"
        sx={{ alignSelf: "flex-end" }}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        
        onClick={handleSubmit}
        sx={{ mt: 2 ,  background: "#6F1D8E", }}
      >
        ရှာဖွေမည်
      </Button>
    </Box>
  );
};

export default UserPropertyFilterComponent;
