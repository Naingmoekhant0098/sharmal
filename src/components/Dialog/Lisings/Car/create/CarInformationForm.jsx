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
  Button,
  Box,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { SelectableDataForCar } from "../../../../../data/selectableData";
import {
  GetBuildType,
  GetCarColor,
  GetDivisionTownshipAPI,
  GetManufacturers,
} from "../../../../../api/constant/GetConstantDataController";

function CarInformationForm({
  handleNext,
  handleBack,
  setCarData,
  carData,
  oldData,
  status,
}) {
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

  const [carDataState, setCarDataState] = useState({
    Code: "",
    Location: "",
    City: "",
    Condition: "",
    Price: "",
    NumberOfViewer: "",
    Manufacturer: "",
    Model: "",
    Year: "",
    BuildType: "",
    TrimName: "",
    CarColor: "",
  });

  // State for checkbox values
  const [checkboxes, setCheckboxes] = useState({
    negotiable: false,
    hotDeal: false,
    bankInstallment: false,
  });

  const [DataForDivision, setDataForDivision] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [buildType, setBuildType] = useState([]);
  const [carColors, setCarColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    const fetchStateDivision = async () => {
      try {
        await GetDivisionTownshipAPI(setDataForDivision);
        await GetBuildType(setBuildType);
        await GetCarColor(setCarColors);
        await GetManufacturers(setManufacturers);
      } catch (error) {}
    };

    if (status === "edit" && oldData) {
      // Set initial state from oldData
      setCarDataState({
        Code: oldData.Code || "000",
        Location: oldData.Location || "",
        City: oldData.City || "",
        Condition: oldData.Condition || "",
        Price: oldData.Price || "",
        NumberOfViewer: oldData.NumberOfViewers || "",
        Manufacturer: oldData.Manufacturer || "",
        Model: oldData.Model || "",
        Year: oldData.Year || "",
        BuildType: oldData.BuildType || "",
        IsHotDeal: oldData.IsHotDeal || false,
        TrimName: oldData.TrimName || "",
        CarColor: oldData.CarColor || "",
        PaymentOption: oldData.PaymentOption || "",
      });

      // Set checkbox values based on oldData
      setCheckboxes({
        negotiable: oldData.PaymentOption.includes("Negotiable") || false,
        hotDeal: oldData.IsHotDeal || false,
        bankInstallment:
          oldData.PaymentOption.includes("Bank Installment") || false,
      });
    } else if (carData) {
      // For scenarios where carData is directly used
      setCarDataState({
        Code: carData.Code || "",
        Location: carData.Location || "",
        City: carData.City || "",
        Condition: carData.Condition || "",
        Price: carData.Price || "",
        NumberOfViewer: carData.NumberOfViewer || "",
        Manufacturer: carData.Manufacturer || "",
        Model: carData.Model || "",
        Year: carData.Year || "",
        IsHotDeal: oldData.IsHotDeal || false,
        BuildType: carData.BuildType || "",
        TrimName: carData.TrimName || "",
        CarColor: carData.CarColor || "",
        PaymentOption: carData.PaymentOption || "",
      });

      setCheckboxes({
        negotiable: carData.PaymentOption.includes("Negotiable") || false,
        hotDeal: carData.IsHotDeal || false,
        bankInstallment:
          carData.PaymentOption.includes("Bank Installment") || false,
      });
    }
    fetchStateDivision();
  }, [status, oldData, carData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "Location") {
      const index = DataForDivision.findIndex((item) => item.mm === value);

      setSelectedIndex(index);
      carData.City = "";
    }

    setCarDataState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isNextDisabled =
    status !== "edit" &&
    (!carDataState.Code ||
      !carDataState.Location ||
      !carDataState.City ||
      !carDataState.Condition ||
      !carDataState.Price ||
      !carDataState.NumberOfViewer ||
      !carDataState.Manufacturer ||
      !carDataState.Model ||
      !carDataState.Year ||
      !carDataState.BuildType ||
      !carDataState.TrimName ||
      !carDataState.CarColor);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckboxes((prevCheckboxes) => {
      const newCheckboxes = { ...prevCheckboxes, [name]: checked };

      // Convert checkbox states to a comma-separated string for PaymentOption
      let paymentOptions = [];
      if (newCheckboxes.bankInstallment)
        paymentOptions.push("Bank Installment");
      if (newCheckboxes.negotiable) paymentOptions.push("Negotiable");
      if (newCheckboxes.hotDeal) paymentOptions.push("Hot Deal");

      setCarDataState((prevData) => ({
        ...prevData,
        PaymentOption: paymentOptions.join(", "),
      }));

      return newCheckboxes;
    });
  };

  const handleFormSubmit = () => {
    setCarData(carDataState); // Pass the carData to the parent component
    handleNext(); // Move to the next step
  };

  return (
    <Grid
      container
      spacing={4}
      width={"100%"}
      paddingX={15}
      paddingY={10}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h5" sx={{ fontWeight: "700" }}>
        Car Information
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
            value={carDataState.Code}
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
            value={carDataState.Location}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select a region</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select a region</em>
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
            value={carDataState.City}
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
          <Typography variant="p">Condition</Typography>
          <Select
            displayEmpty
            name="Condition"
            value={carDataState.Condition}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select condition</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select condition</em>
            </MenuItem>
            {SelectableDataForCar?.conditions?.map((condition) => (
              <MenuItem key={condition} value={condition}>
                {condition}
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
            value={carDataState.Price}
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

          <Typography variant="p">Price (lakhs)</Typography>
          <TextField
            name="Price"
            value={carDataState.Price}
            onChange={(e) => {
              const raw = e.target.value;

              // Only allow digits and at most one dot
              const cleaned = raw.replace(/[^0-9.]/g, "");

              // Prevent multiple decimals
              const parts = cleaned.split(".");
              const sanitized =
                parts.length > 2
                  ? parts[0] + "." + parts.slice(1).join("") // Keep only first dot
                  : cleaned;

              handleChange({
                target: {
                  name: "Price",
                  value: sanitized,
                },
              });
            }}
            inputProps={{
              inputMode: "decimal",
              pattern: "[0-9]*[.,]?[0-9]*",
            }}
            placeholder="Enter Price"
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth>
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
            value={carDataState.NumberOfViewer}
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
          <Typography variant="p">Manufacturer</Typography>
          <Select
            displayEmpty
            name="Manufacturer"
            value={carDataState.Manufacturer}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select Manufacturer</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select Manufacturer</em>
            </MenuItem>
            {manufacturers.map((manufacturer) => (
              <MenuItem key={manufacturer} value={manufacturer}>
                {manufacturer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Model</Typography>
          <TextField
            name="Model"
            value={carDataState.Model}
            onChange={handleChange}
            placeholder="Enter Model"
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Year</Typography>
          <TextField
            name="Year"
            value={carDataState.Year}
            onChange={handleChange}
            placeholder="Enter Year"
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
          <Typography variant="p">Build Type</Typography>
          <Select
            displayEmpty
            name="BuildType"
            value={carDataState.BuildType}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select Build Type</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select Build Type</em>
            </MenuItem>
            {buildType.map((buildType) => (
              <MenuItem key={buildType} value={buildType}>
                {buildType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Trim Name</Typography>
          <TextField
            name="TrimName"
            value={carDataState.TrimName}
            onChange={handleChange}
            placeholder="Enter Trim Name"
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Car Color</Typography>
          <Select
            displayEmpty
            name="CarColor"
            value={carDataState.CarColor}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select Car Color</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select Car Color</em>
            </MenuItem>
            {carColors.map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ marginTop: 3, gap: 5 }}
      >
        <Button variant="outlined" onClick={handleBack}>
          Close
        </Button>
        <Button
          variant="contained"
          disabled={isNextDisabled}
          onClick={handleFormSubmit}
        >
          Next
        </Button>
      </Box>
    </Grid>
  );
}

export default CarInformationForm;
