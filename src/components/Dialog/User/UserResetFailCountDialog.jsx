import { DisplaySettings, Margin } from '@mui/icons-material'
import { Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  IconButton, } from '@mui/material'
import React from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { Box } from '@mui/material';
import { ResetCountFail } from '../../../api/user/GetUserController';
import { toast } from 'react-toastify';

const UserResetFailCountDialog = ({rowData,open,onClose,onRefresh }) => {

  const handleReset = async () => {
    const userId = rowData.UserId

    
    await ResetCountFail(userId, toast)
    onClose();
    onRefresh();
  }


  
  return (
    <Dialog open={open} onClose={null} maxWidth="sm" fullWidth>
      <DialogTitle sx={{marginBottom: '20px'}}>
        <IconButton
          aria-label="close"
          onClick={() => onClose()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers >
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography variant="h6">Are you sure to enable this account again ? </Typography>
        </div>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button
          onClick={onClose}
          variant="text"
          sx={{ marginRight: 2, textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleReset}
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
          // disabled={!isFormValid}
        >
          Yes
        </Button>
      </Box>
      </DialogContent>
      
    </Dialog>
  )
}

export default UserResetFailCountDialog
