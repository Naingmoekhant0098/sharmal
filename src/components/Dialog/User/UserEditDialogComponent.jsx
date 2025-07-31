import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { UpdateAccountProfileAPI, UpdatePasswordAPI } from "../../../api/user/GetUserController";
import { toast } from "react-toastify";
import { _EncryptService } from "../../../service/EncryptDecryptService";
import LoadingButton from '@mui/lab/LoadingButton';

const UserEditDialogComponent = ({ open, onClose, setopenUserEditCreateDialog, editMode, rowData,onRefresh }) => {
  const [userName, setUserName] = useState(rowData.UserName);
  const [email, setEmail] = useState(rowData.Email);
  const [userRole, setUserRole] = useState(rowData.UserRole);
  const [password, setPassword] = useState("");
  const [OldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleUserEditDialogClose = () => {
    setopenUserEditCreateDialog(false)
    onClose()
  }

  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirm = async () => {
    setIsLoading(true)
    const UserId = rowData.UserId;
    if (editMode === 'profile update' ) {
    const payload = {
      UserName: userName,
      Email: email,
      UserRole: userRole
    };
      await UpdateAccountProfileAPI(payload, UserId,toast, onClose); // Adjusted according to the expected API signature
      onRefresh();
      onClose()
  }

  if (editMode === 'password update' ) {
    const payload = {
      OldPassword: _EncryptService(OldPassword) ,
      NewPassword:_EncryptService(password) 
    };
      await UpdatePasswordAPI(payload, UserId,toast,onClose); // Adjusted according to the expected API signature
      onRefresh();
      onClose()
    }
  };


  return (
    <>
      <Dialog open={open} onClose={null} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Edit user account</Typography>
          <IconButton
            aria-label="close"
            onClick={handleUserEditDialogClose}
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
        <DialogContent dividers>
          {editMode === 'profile update' && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="User Name"
                fullWidth
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="dense"
                label="User Role"
                select
                fullWidth
                variant="outlined"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
              </TextField>
            </>
          )}

          {editMode === 'password update' && (
            <>
              <TextField
                margin="dense"
                label="Old Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                value={OldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                margin="dense"
                label="New Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          

          <DialogActions style={{ padding: '16px 24px' }}>
          {
          isLoading ? (
            <LoadingButton loading variant="outlined" color="primary">
              Submitting...
            </LoadingButton>
          ) : (
            <Button
              onClick={handleConfirm}
              variant="contained"
              color="primary"
              style={{ padding: '8px 24px', width: 123, height: 44, fontSize: '16px', textTransform: 'none' }}

            >
              Update
            </Button>
          )
        }
            
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UserEditDialogComponent