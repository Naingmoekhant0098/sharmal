import React, { useState, useEffect } from 'react';
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
import UserEditModeSelectDialogComponent from './UserEditModeSelectDialogComponent';
import UserEditDialogComponent from './UserEditDialogComponent';
import { _DecryptService } from '../../../service/EncryptDecryptService';
import _JWTDecodeService from '../../../service/JWTDecodeService';

const UserViewDetailDialogComponent = ({ open, onClose, rowData, onEdit, onRefresh }) => {
  const [openEditModeDialog, setopenEditModeDialog] = useState(false)
  const [editMode, seteditMode] = useState('')
  const [openUserEditCreateDialog, setopenUserEditCreateDialog] = useState(false)
  

  const handleEditModeDialogCLose = () => {
    setopenEditModeDialog(false)
  }

  const handleDetailDialogCloseDialog = () => {
    setopenUserEditCreateDialog(false)
    onClose();
  }


  

  if (!rowData) return null; // Return null if rowData is undefined
  return (
    <Dialog
      open={open}
      onClose={null} // Disable default close behavior
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            User Details
          </Typography>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => setopenEditModeDialog(true)}
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <IconButton edge="end" color="inherit" onClick={handleDetailDialogCloseDialog} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent dividers style={{ padding: '30px' }}>
        {rowData.UserId && (
          <Typography variant="body1" gutterBottom>
            <strong>User ID:</strong> {rowData.UserId}
          </Typography>
        )}
        {rowData.UserName && (
          <Typography variant="body1" gutterBottom>
            <strong>User Name:</strong> {rowData.UserName}
          </Typography>
        )}
        {rowData.Email && (
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {rowData.Email}
          </Typography>
        )}
        {rowData.UserRole && (
          <Typography variant="body1" gutterBottom>
            <strong>User Role:</strong> {rowData.UserRole}
          </Typography>
        )}
        {rowData.CreatedDate && (
          <Typography variant="body1" gutterBottom>
            <strong>Created Date:</strong> {rowData.CreatedDate}
          </Typography>
        )}
      </DialogContent>
      <DialogActions style={{ padding: '16px 24px' }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          style={{ padding: '8px 24px', width: 123, height: 44, fontSize: '16px', textTransform: 'none' }}
        >
          Okay
        </Button>
      </DialogActions>

      <UserEditModeSelectDialogComponent
        open={openEditModeDialog}
        onClose={handleEditModeDialogCLose}
        setopenUserEditCreateDialog={setopenUserEditCreateDialog}
        seteditMode={seteditMode}
      />

      <UserEditDialogComponent
        open={openUserEditCreateDialog}
        onClose={onClose}
        setopenUserEditCreateDialog={setopenUserEditCreateDialog}
        editMode={editMode}
        rowData={rowData}
        onRefresh={onRefresh}
      />
    </Dialog>
  );
};

export default UserViewDetailDialogComponent;
