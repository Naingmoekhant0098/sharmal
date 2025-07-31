import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function BlogDetailDialogComponent({ open, handleClose, Data }) {
  const {
    Title,
    Description,
    Image, // this is base64 string
  } = Data || {};

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Blog Details
        <IconButton
          edge="end"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          {Image ? (
            <img
              src={`data:image/jpeg;base64,${Image}`}
              alt="Blog Visual"
              style={{ width: '100%', height: 'auto', borderRadius: 8, marginBottom: 16 }}
            />
          ) : (
            <Typography>No image available</Typography>
          )}

          <Typography variant="h6" gutterBottom>
            Title: {Title || 'N/A'}
          </Typography>
          <Typography variant="body1">
            {Description || 'N/A'}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BlogDetailDialogComponent;
