import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DeleteDialogComponent = ({ open, onClose, onDelete }) => {

  // Custom handler to close the dialog based only on specific reasons
  const handleClose = (event, reason) => {
    if (reason === 'escapeKeyDown') {
      onClose(); // Allow close when "Esc" is pressed
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose} // Custom close handler
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      disableEscapeKeyDown={false} // Ensure escape key works
    >
      <DialogTitle
        id="delete-dialog-title"
        sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center' }}
      >
        <span style={{ flexGrow: 1 }}>Are you sure you want to delete?</span>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: '16px 24px' }}>
        <DialogContentText id="delete-dialog-description">
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '8px 24px' }}>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onDelete();
            onClose(); // Close the dialog after deletion
          }}
          variant="contained"
          sx={{ backgroundColor: '#C30000', color: '#fff' }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialogComponent;
