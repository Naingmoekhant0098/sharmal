import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ListingsCarDetailDialogComponents({ open, handleClose, Data }) {
  const {
    Code,
    CarId,
    Title,
    Description,
    Gearbox,
    SteeringPosition,
    EnginePower,
    FuelType,
    Mileage,
    Manufacturer,
    BuildType,
    Model,
    Year,
    PlateDivision,
    PlateNo,
    PlateColor,
    LincenseStatus,
    CarColor,
    Condition,
    Price,
    SpecialStatus,
    NumberOfViewers,
    Availability,
    IsSold,
    Location,
    City,
    PaymentOption,
    TrimName,
    SellerName,
    PrimaryPhoneNumber,
    SecondaryPhoneNumber,
    Email,
    Address,
    CreatedBy,
    CreatedDate,
    UpdatedBy,
    UpdatedDate,
    IsPopular,
    IsHotDeal,
    Approved,
    Images
  } = Data || {};

  const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
  const resourceEndpoint = isProduction
    ? process.env.REACT_APP_RESOURCE_ENDPOINT
    : process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Car Details
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            Title: {Title || 'N/A'}
          </Typography>
          <p>Images </p>
          <div style={{ display: "flex", flexDirection: 'row', overflowX: 'scroll' }}>
            {Images && Images.length > 0 ? (
              Images.map((image, index) => (
                <img
                  key={index}
                  src={`${resourceEndpoint}${image.CreatedBy}/Car/${image.ImageName}`}
                  alt={`Image ${index + 1}`}
                  style={{ width: '200px', height: 'auto', margin: '10px' }} // Style as needed
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <Typography variant="subtitle1" gutterBottom>
            Code: {Code || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Car ID: {CarId || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Description: {Description || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Gearbox: {Gearbox || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Steering Position: {SteeringPosition || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Engine Power: {EnginePower || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Fuel Type: {FuelType || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Mileage: {Mileage || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Manufacturer: {Manufacturer || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Build Type: {BuildType || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Model: {Model || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Year: {Year || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Plate Division: {PlateDivision || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Plate No: {PlateNo || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Plate Color: {PlateColor || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            License Status: {LincenseStatus || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Car Color: {CarColor || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Condition: {Condition || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Price: {Price || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Special Status: {SpecialStatus || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Number of Viewers: {NumberOfViewers || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Availability: {Availability || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Sold: {IsSold ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Location: {Location || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            City: {City || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Payment Option: {PaymentOption || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Trim Name: {TrimName || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Seller Name: {SellerName || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Primary Phone Number: {PrimaryPhoneNumber || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Secondary Phone Number: {SecondaryPhoneNumber || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Email: {Email || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Address: {Address || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Created By: {CreatedBy || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Created Date: {CreatedDate || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Updated By: {UpdatedBy || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Updated Date: {UpdatedDate || 'N/A'}
          </Typography>
          <Box mt={2}>
            <Chip
              label={`Popular: ${IsPopular ? 'Yes' : 'No'}`}
              color={IsPopular ? 'primary' : 'default'}
              style={{ marginRight: 8 }}
            />
            <Chip
              label={`Hot Deal: ${IsHotDeal ? 'Yes' : 'No'}`}
              color={IsHotDeal ? 'primary' : 'default'}
            />
            <Chip
              label={`Approved: ${Approved ? 'Yes' : 'No'}`}
              color={Approved ? 'primary' : 'default'}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ListingsCarDetailDialogComponents;
