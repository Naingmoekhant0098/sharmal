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
import EditIcon from '@mui/icons-material/Edit';

function ListingsPropertyDetailDialogComponents({ open, handleClose, Data }) {
  const {
    Code,
    PropertyId,
    Title,
    Status,
    Type,
    Price,
    PaymentOption,
    Location,
    City,
    NumberOfViewers,
    Bedrooms,
    Area,
    Condition,
    Floor,
    Description,
    Furnished,
    MapUrl,
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
    <Dialog open={open} onClose={null} maxWidth="md" fullWidth>
      <DialogTitle>
        Property Details
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
                  src={`${resourceEndpoint}${image.CreatedBy}/Property/${image.ImageName}`}
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
            Property ID: {PropertyId || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Status: {Status || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Type: {Type || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Price: {Price || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Payment Option: {PaymentOption || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Location: {Location || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            City: {City || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Number of Viewers: {NumberOfViewers || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Bedrooms: {Bedrooms || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Area: {Area || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Condition: {Condition || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Floor: {Floor || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Description: {Description || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Furnished: {Furnished ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Map URL: {MapUrl || 'N/A'}
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
    </Dialog>
  );
}

export default ListingsPropertyDetailDialogComponents;
