import React, { useState, useEffect } from "react";
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CloseIcon from "@mui/icons-material/Close";

const UserEditModeSelectDialogComponent = ({ open, onClose, setopenUserEditCreateDialog,seteditMode ,}) => {

    const handleChange = (event) => {
        seteditMode(event.target.value);
    };

    const handleComfirm = () =>{
        setopenUserEditCreateDialog(true)
        onClose();
    }
    return (
        <Dialog open={open} onClose={null} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6">Edit user account</Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
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
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Edit Mode</FormLabel>
                    <RadioGroup
                        row
                        onChange={handleChange}
                        sx={{
                            display:"flex",
                            justifyContent: "space-evenly"
                        }}
                    >
                        <FormControlLabel value="profile update" control={<Radio />} label="profile update" />
                        <FormControlLabel value="password update" control={<Radio />} label="password update " />
                    </RadioGroup>
                </FormControl>

                <DialogActions style={{ padding: '16px 24px' }}>
                    <Button
                        onClick={handleComfirm}
                        variant="contained"
                        color="primary"
                        style={{ padding: '8px 24px', width: 123, height: 44, fontSize: '16px', textTransform: 'none' }}
                        
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>

    )
}

export default UserEditModeSelectDialogComponent