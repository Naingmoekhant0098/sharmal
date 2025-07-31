import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button } from "@mui/material";
import { SelectableDataForProperty } from "./../../../../../data/selectableData";
import {
  GetDivisionTownshipAPI,
  GetFloorsAPI,
  GetPropertyCondition,
  GetPropertyTypes,
} from "../../../../../api/constant/GetConstantDataController";

function PropertyInformationForm({
  handleNext,
  handleBack,
  setpropertyInformationData,
  propertyInformationData,
  oldData,
  status,
}) {
  const [propertyData, setPropertyData] = useState({
    Code: "",
    Location: "",
    City: "",
    Status: "",
    Price: "",
    NumberOfViewer: "",
    Bedrooms: "",
    Bathrooms: "",
    Area: "",
    PaymentOption: "",
    IsHotDeal: "",
    Type: "",
    Conditions: "",
    Floor: "",
  });
  const [DataForDivision, setDataForDivision] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [floors, setFloors] = useState([]);
  const [propertyCondition, setPropertyCondition] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  useEffect(() => {
    const fetchStateDivision = async () => {
      try {
        await GetDivisionTownshipAPI(setDataForDivision);
        await GetFloorsAPI(setFloors);
        await GetPropertyCondition(setPropertyCondition);
        await GetPropertyTypes(setPropertyTypes);
        console.log(oldData);
      } catch (error) {}
    };

    if (status === "edit" && oldData) {
      setPropertyData({
        Code: oldData.Code || "000",
        Location: oldData.Location || "",
        City: oldData.City || "",
        Status: oldData.Status || "",
        Price: oldData.Price || "",
        NumberOfViewer: oldData.NumberOfViewers || "",
        Bedrooms: oldData.Bedrooms !== undefined ? oldData.Bedrooms : "",
        Bathrooms: oldData.Bathrooms !== undefined ? oldData.Bathrooms : "",
        Area: oldData.Area || "",
        PaymentOption: oldData.PaymentOption || "",
        IsHotDeal: oldData.IsHotDeal || false,
        Type: oldData.Type || "",
        Conditions: oldData.Condition || "",
        Floor: oldData.Floor || "",
      });

      setCheckboxes({
        negotiable: oldData.PaymentOption?.includes("Negotiable") || false,
        hotDeal: oldData.IsHotDeal || false,
        bankInstallment:
          oldData.PaymentOption?.includes("Bank Installment") || false,
      });
    } else if (propertyInformationData) {
      setPropertyData({
        Code: propertyInformationData.Code || "",
        Location: propertyInformationData.Location || "",
        City: propertyInformationData.City || "",
        Status: propertyInformationData.Status || "",
        Price: propertyInformationData.Price || "",
        NumberOfViewer: propertyInformationData.NumberOfViewer || "",
        Bedrooms: propertyInformationData.Bedrooms || "",
        Bathrooms: propertyInformationData.Bathrooms || "",
        Area: propertyInformationData.Area || "",
        PaymentOption: propertyInformationData.PaymentOption || null,
        Type: propertyInformationData.Type || "",
        IsHotDeal: oldData.IsHotDeal || false,
        Conditions: propertyInformationData.Conditions || "",
        Floor: propertyInformationData.Floor || "",
      });

      setCheckboxes({
        negotiable:
          propertyInformationData.PaymentOption?.includes("Negotiable") ||
          false,
        hotDeal: propertyInformationData.IsHotDeal || false,
        bankInstallment:
          propertyInformationData.PaymentOption?.includes("Bank Installment") ||
          false,
      });
    }
    fetchStateDivision();
  }, [status, oldData, propertyInformationData]);

  const isNextDisabled =
    status !== "edit" &&
    (!propertyData.Code ||
      !propertyData.Location ||
      !propertyData.City ||
      !propertyData.Status ||
      !propertyData.Price ||
      !propertyData.Bedrooms ||
      !propertyData.Bathrooms ||
      !propertyData.NumberOfViewer ||
      !propertyData.Area ||
      !propertyData.Type);
  // State for checkbox values
  const [checkboxes, setCheckboxes] = useState({
    negotiable: false,
    hotDeal: false,
    bankInstallment: false,
  });

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

  const handleChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;

    if (name === "Location") {
      const index = DataForDivision.findIndex((item) => item.mm === value);

      setSelectedIndex(index);
      propertyData.City = "";
    }
    if (name === "PaymentOption") {
      setPropertyData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setPropertyData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckboxes((prevCheckboxes) => {
      const newCheckboxes = { ...prevCheckboxes, [name]: checked };

      // Update PaymentOption based on checkboxes
      let paymentOptions = [];
      if (newCheckboxes.bankInstallment)
        paymentOptions.push("Bank Installment");
      if (newCheckboxes.negotiable) paymentOptions.push("Negotiable");

      setPropertyData((prevData) => ({
        ...prevData,
        PaymentOption: paymentOptions.join(", "),
        IsHotDeal: newCheckboxes.hotDeal ? true : false, // Update IsHotDeal based on checkbox state
      }));

      return newCheckboxes;
    });
  };

  const handleFormSubmit = () => {
    setpropertyInformationData(propertyData); // Pass the propertyData to the parent component (AdsDialog)

    handleNext(); // Move to the next step
  };

  return (
    <Grid
      container
      spacing={4}
      width={"100%"}
      paddingX={15}
      paddingY={6}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h5" sx={{ fontWeight: "700" }}>
        Property Information
      </Typography>

      <Grid
        sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
        item
        xs={12}
      >
        <FormControl fullWidth>
          <Typography variant="p">Code</Typography>
          <TextField
            name="Code"
            value={propertyData.Code}
            onChange={handleChange}
            placeholder="Enter Code"
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Location</Typography>
          <Select
            displayEmpty
            name="Location"
            value={propertyData.Location}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select a region/state</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select a region/state</em>
            </MenuItem>
            {DataForDivision.map((Division, index) => (
              <MenuItem key={index} value={Division.mm}>
                {Division.mm}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">City</Typography>
          <Select
            displayEmpty
            name="City"
            value={propertyData.City}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select a city</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select a city</em>
            </MenuItem>
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

        <FormControl fullWidth>
          <Typography variant="p">Status</Typography>
          <Select
            displayEmpty
            name="Status"
            value={propertyData.Status}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select status</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select status</em>
            </MenuItem>
            {SelectableDataForProperty.Possiblestatues.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
        item
        xs={12}
      >
        <FormControl fullWidth>
          <Typography variant="p">Price (lakhs)</Typography>
          <TextField
            name="Price"
            value={propertyData.Price}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only numbers and one optional decimal point
              if (/^\d*\.?\d*$/.test(value)) {
                handleChange(e); // your original handler
              }
            }}
            placeholder="Enter Price"
            variant="outlined"
          />
        </FormControl>

        <FormControl
          fullWidth
          sx={{ display: "flex", flexDirection: "column", height: "30px" }}
        >
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="negotiable"
                  checked={checkboxes.negotiable}
                  onChange={handleCheckboxChange}
                />
              }
              label="Negotiable"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hotDeal"
                  checked={checkboxes.hotDeal}
                  onChange={handleCheckboxChange}
                />
              }
              label="Hot Deal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="bankInstallment"
                  checked={checkboxes.bankInstallment}
                  onChange={handleCheckboxChange}
                />
              }
              label="Bank Installment"
            />
          </FormGroup>
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Number of Viewers</Typography>
          <TextField
            name="NumberOfViewer"
            value={propertyData.NumberOfViewer}
            onChange={handleChange}
            placeholder="Enter number of viewers"
            variant="outlined"
          />
        </FormControl>
      </Grid>

      <Grid
        sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
        item
        xs={12}
      >
        <FormControl fullWidth>
          <Typography variant="p">Bedrooms</Typography>
          <Select
            displayEmpty
            name="Bedrooms"
            value={propertyData.Bedrooms}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected !== undefined && selected !== null ? (
                selected
              ) : (
                <em>Select number of bedrooms</em>
              )
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select number of bedrooms</em>
            </MenuItem>
            {SelectableDataForProperty.bedrooms.map((bedroom) => (
              <MenuItem key={bedroom} value={bedroom}>
                {bedroom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Bathrooms</Typography>
          <Select
            displayEmpty
            name="Bathrooms"
            value={propertyData.Bathrooms}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected !== undefined && selected !== null ? (
                selected
              ) : (
                <em>Select number of bathrooms</em>
              )
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select number of bathrooms</em>
            </MenuItem>
            {SelectableDataForProperty.bathrooms.map((bathroom) => (
              <MenuItem key={bathroom} value={bathroom}>
                {bathroom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Area</Typography>
          <TextField
            name="Area"
            value={propertyData.Area}
            onChange={handleChange}
            placeholder="Enter area"
            variant="outlined"
          />
        </FormControl>
      </Grid>

      <Grid
        sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
        item
        xs={12}
      >
        <FormControl fullWidth>
          <Typography variant="p">Type</Typography>
          <Select
            displayEmpty
            name="Type"
            value={propertyData.Type}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select type</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select type</em>
            </MenuItem>
            {propertyTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Conditions</Typography>
          <Select
            displayEmpty
            name="Conditions"
            value={propertyData.Conditions}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>New property (Kyo Point)</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>New property</em>
            </MenuItem>
            {propertyCondition.map((condition) => (
              <MenuItem key={condition} value={condition}>
                {condition}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Floors</Typography>
          <Select
            displayEmpty
            name="Floor"
            value={propertyData.Floor}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select floor</em>
            }
          >
            <MenuItem disabled value="">
              <em>Select floor</em>
            </MenuItem>
            {floors.map((floor) => (
              <MenuItem key={floor} value={floor}>
                {floor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ marginTop: 3 }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          sx={{
            border: "none",
            "&:hover": {
              border: "none",
            },
            textTransform: "none",
            width: "100px",
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormSubmit} // Call handleFormSubmit instead of handleNext
          disabled={isNextDisabled}
          sx={{ marginLeft: "8px", textTransform: "none", width: "100px" }}
        >
          Next
        </Button>
      </Box>
    </Grid>
  );
}

export default PropertyInformationForm;
