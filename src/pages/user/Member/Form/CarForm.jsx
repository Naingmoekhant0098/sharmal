import * as React from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  ThemeProvider,
  createTheme,
  FormLabel,
  OutlinedInput,
} from "@mui/material";
import {
  Person,
  DirectionsCar,
  Security,
  CheckCircle,
} from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6F1D8E",
      light: "#8B2FB8",
      dark: "#5A1770",
    },
    secondary: {
      main: "#8B2FB8",
    },
  },
});

const steps = [
  "Car Information",
  "Detailed Description",
  "Upload Photos",
  "Seller Information",
];

const CustomStepper = ({ activeStep, steps }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 4,
        px: 2,
        mt: 8,
        width: "100%",
      }}
    >
      {steps.map((step, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: { xs: "0.7rem", sm: "14px" },
                  fontWeight: 600,
                  color: index <= activeStep ? "#6F1D8E" : "#9CA3AF",
                  textAlign: "center",

                  lineHeight: 1.2,
                  position: "absolute",
                  top: -44,
                  left: -15,
                }}
              >
                {step}
              </Typography>
              <Box
                sx={{
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  transition: "all 0.3s ease",
                  ...(index < activeStep
                    ? {
                        background: "linear-gradient(45deg, #6F1D8E, #8B2FB8)",
                        color: "white",
                      }
                    : index === activeStep
                    ? {
                        background: "linear-gradient(45deg, #6F1D8E, #8B2FB8)",
                        color: "white",
                      }
                    : {
                        backgroundColor: "#D5E4FF",
                        color: "#9CA3AF",
                      }),
                }}
              >
                {index < activeStep ? "✓" : index + 1}
              </Box>
            </Box>
          </Box>

          {index < steps.length - 1 && (
            <Box
              sx={{
                height: 3,
                flex: 1,

                backgroundColor: index < activeStep ? "#6F1D8E" : "#D5E4FF",
                transition: "background-color 0.3s ease",
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default function CarForm() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [formData, setFormData] = React.useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Vehicle Details
    make: "",
    model: "",
    year: "",
    vin: "",
    color: "",
    mileage: "",
    condition: "",

    // Insurance & Registration
    insuranceProvider: "",
    policyNumber: "",
    registrationNumber: "",
    registrationExpiry: "",
    features: [],
  });

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (feature) => (event) => {
    const checked = event.target.checked;
    setFormData((prev) => ({
      ...prev,
      features: checked
        ? [...prev.features, feature]
        : prev.features.filter((f) => f !== feature),
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    setActiveStep(0);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      make: "",
      model: "",
      year: "",
      vin: "",
      color: "",
      mileage: "",
      condition: "",
      insuranceProvider: "",
      policyNumber: "",
      registrationNumber: "",
      registrationExpiry: "",
      features: [],
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Box display="flex" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Car Information
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Code
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Code"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Location
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Location"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  City
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter City"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Condition
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Condition"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Price(Lakhs)
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Price(Lakhs)"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Number of views
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Number Of Views"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Manufacturer
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Manufacturer"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Model
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Model"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Year
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Year"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Build Type
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Build Type"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Trim Name
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Trim Name"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Car Color
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Car Color"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Additional Information
                </FormLabel>
                <Box>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Negotiable"
                  />
                  <FormControlLabel control={<Checkbox />} label="Hot Deal" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Bank Installment"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Box display="flex" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Detailed Description
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Title
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Title"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Engine Power
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Engine Power"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Gearbox
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Manual"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Automatic"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Semi Auto"
                  />
                </RadioGroup>
              </Grid>

              <Grid item xs={12} md={12}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Steering Position
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Left-hand Drive"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Right-hand Drive"
                  />
                </RadioGroup>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Plate Division
                </FormLabel>

              
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


                <FormControl fullWidth required sx={{ mt: 2 }}>
                  <Select
                    value={formData.year}
                    onChange={handleInputChange("year")}
                    input={<OutlinedInput />}
                    placeholder="Select Plate Division"
                    inputProps={{ "aria-label": "Select Plate Division" }}
                  >
                    <MenuItem disabled value="">
                      Select Plate Division
                    </MenuItem>
                    {Array.from({ length: 30 }, (_, i) => (
                      <MenuItem key={2024 - i} value={(2024 - i).toString()}>
                        {2024 - i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={formData.year}
                    onChange={handleInputChange("year")}
                    label="Year"
                  >
                    {Array.from({ length: 30 }, (_, i) => (
                      <MenuItem key={2024 - i} value={(2024 - i).toString()}>
                        {2024 - i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Color"
                  value={formData.color}
                  onChange={handleInputChange("color")}
                  required
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="VIN Number"
                  value={formData.vin}
                  onChange={handleInputChange("vin")}
                  required
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={handleInputChange("mileage")}
                  required
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Vehicle Condition
                </Typography>
                <RadioGroup
                  value={formData.condition}
                  onChange={handleInputChange("condition")}
                  row
                >
                  <FormControlLabel
                    value="excellent"
                    control={<Radio />}
                    label="Excellent"
                  />
                  <FormControlLabel
                    value="good"
                    control={<Radio />}
                    label="Good"
                  />
                  <FormControlLabel
                    value="fair"
                    control={<Radio />}
                    label="Fair"
                  />
                  <FormControlLabel
                    value="poor"
                    control={<Radio />}
                    label="Poor"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    background: "linear-gradient(45deg, #6F1D8E, #8B2FB8)",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <Security sx={{ color: "white" }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                  Insurance & Registration
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Insurance Provider"
                    value={formData.insuranceProvider}
                    onChange={handleInputChange("insuranceProvider")}
                    required
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Policy Number"
                    value={formData.policyNumber}
                    onChange={handleInputChange("policyNumber")}
                    required
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Registration Number"
                    value={formData.registrationNumber}
                    onChange={handleInputChange("registrationNumber")}
                    required
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Registration Expiry"
                    type="date"
                    value={formData.registrationExpiry}
                    onChange={handleInputChange("registrationExpiry")}
                    required
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                    Vehicle Features
                  </Typography>
                  <FormGroup row>
                    {[
                      "Air Conditioning",
                      "GPS Navigation",
                      "Bluetooth",
                      "Backup Camera",
                      "Sunroof",
                      "Leather Seats",
                    ].map((feature) => (
                      <FormControlLabel
                        key={feature}
                        control={
                          <Checkbox
                            checked={formData.features.includes(feature)}
                            onChange={handleFeatureChange(feature)}
                          />
                        }
                        label={feature}
                      />
                    ))}
                  </FormGroup>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    background: "linear-gradient(45deg, #6F1D8E, #8B2FB8)",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <CheckCircle sx={{ color: "white" }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                  Review Your Information
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    background:
                      "linear-gradient(45deg, rgba(111, 29, 142, 0.05), rgba(139, 47, 184, 0.05))",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="bold"
                    mb={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Person sx={{ mr: 1 }} />
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Name:</strong> {formData.firstName}{" "}
                        {formData.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Email:</strong> {formData.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Phone:</strong> {formData.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <strong>Address:</strong> {formData.address},{" "}
                        {formData.city}, {formData.state} {formData.zipCode}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    background:
                      "linear-gradient(45deg, rgba(111, 29, 142, 0.05), rgba(139, 47, 184, 0.05))",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="bold"
                    mb={2}
                    display="flex"
                    alignItems="center"
                  >
                    <DirectionsCar sx={{ mr: 1 }} />
                    Vehicle Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Vehicle:</strong> {formData.year}{" "}
                        {formData.make} {formData.model}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Color:</strong> {formData.color}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>VIN:</strong> {formData.vin}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Mileage:</strong> {formData.mileage}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <strong>Condition:</strong> {formData.condition}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    background:
                      "linear-gradient(45deg, rgba(111, 29, 142, 0.05), rgba(139, 47, 184, 0.05))",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="bold"
                    mb={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Security sx={{ mr: 1 }} />
                    Insurance & Registration
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Insurance:</strong> {formData.insuranceProvider}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Policy:</strong> {formData.policyNumber}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Registration:</strong>{" "}
                        {formData.registrationNumber}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Expires:</strong> {formData.registrationExpiry}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <strong>Features:</strong>
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {formData.features.length > 0 ? (
                          formData.features.map((feature) => (
                            <Chip
                              key={feature}
                              label={feature}
                              sx={{ mr: 1, mb: 1 }}
                              color="primary"
                              variant="outlined"
                            />
                          ))
                        ) : (
                          <Typography color="text.secondary">
                            None selected
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        );

      default:
        return "Unknown step";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          //   background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          //   py: 4,
          px: 2,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 24,
              mt: 3,
            }}
          >
            Create Properly Post
          </Typography>
          <CustomStepper activeStep={activeStep} steps={steps} />

          {activeStep === steps.length ? (
            <Card
              elevation={3}
              sx={{ textAlign: "center", p: 6, borderRadius: 3 }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  background: "linear-gradient(45deg, #4caf50, #66bb6a)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <CheckCircle sx={{ fontSize: 40, color: "white" }} />
              </Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="text.primary"
                mb={2}
              >
                Congratulations!
              </Typography>
              <Typography variant="h6" color="text.secondary" mb={4}>
                Your vehicle registration form has been submitted successfully.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => setActiveStep(0)}
                sx={{
                  background: "linear-gradient(45deg, #6F1D8E, #8B2FB8)",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                }}
              >
                Start New Registration
              </Button>
            </Card>
          ) : (
            <Box>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4, py: 2 }}>
                  <Box>{getStepContent(activeStep)}</Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "flex-end",
                      gap: 2,
                      px: 2,
                    }}
                  >
                    {activeStep !== 0 && (
                      <Button
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        variant="outlined"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1,
                          boxShadow: "none",
                          borderRadius: 2,
                          fontWeight: "bold",
                          border: "1px solid #6F1D8E",
                          transition: "all .3s ease",
                          "&:hover": {
                            color: "white",
                            boxShadow: "none",
                            backgroundColor: " #6F1D8E",
                          },
                        }}
                      >
                        Back
                      </Button>
                    )}

                    <Button
                      onClick={
                        activeStep === steps.length - 1
                          ? handleSubmit
                          : handleNext
                      }
                      variant="contained"
                      size="medium"
                      sx={{
                        background: "linear-gradient(45deg, #6F1D8E, #8B2FB8)",
                        px: 4,
                        py: 1,
                        boxShadow: "none",
                        borderRadius: 2,
                        fontWeight: 600,
                        border: "1px solid #6F1D8E",
                        transition: "all .3s ease",
                        "&:hover": {
                          background: "white",
                          boxShadow: "none",
                          border: "1px solid #6F1D8E",
                          color: "black",
                        },
                      }}
                    >
                      {activeStep === steps.length - 1 ? "Submit Form" : "Next"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
