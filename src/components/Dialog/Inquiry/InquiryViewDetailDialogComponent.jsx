import React from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility } from "@mui/icons-material";
import { useHistory } from "react-router-dom"; // Import useHistory
import theme from '../../../theme';

const InquiryViewDetailDialogComponent = ({ open, onClose, rowData }) => {
  const history = useHistory();

  if (!rowData) return null; // Return null if rowData is undefined

  // Handle click event for the eye icon
  const handleViewDetail = () => {
    const status = rowData.InquiryStatus;

    if (rowData.PropertyId) {
      // If PropertyId exists, navigate to /property
      history.push(`/property?Status=${status}&PropertyId=${rowData.PropertyId}`);
    } else if (rowData.CarId) {
      // If CarId exists, navigate to /car
      history.push(`/car?Status=${status}&CarId=${rowData.CarId}`);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={null} // Disable default close behavior
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">
              Inquiry Details
              {rowData.Status && (
                <Chip
                  label={rowData.Status}
                  style={{
                    backgroundColor:
                      rowData.Status === "ငှားရန်" ? "#FBB96F" : "#FF98DF",
                    color: rowData.Status === "ငှားရန်" ? "#AB5B00" : "#C40087",
                    marginLeft: 10,
                  }}
                />
              )}
              {rowData.InquiryStatus && (
                <>
                  <Chip
                    label={rowData.InquiryStatus}
                    style={{
                      backgroundColor:
                        rowData.InquiryStatus === "Unread"
                          ? "#FFC107"
                          : "#4CAF50",
                      color: "#000",
                      marginLeft: 10,
                    }}
                  />
                  {(rowData.PropertyId || rowData.CarId) && ( // Show eye icon only if PropertyId or CarId exists
                    <IconButton
                      color="black"
                      style={{ marginLeft: 10 }}
                      onClick={handleViewDetail} // Call the view detail handler
                    >
                      <Visibility style={{ color: theme.palette.text.main }} />
                    </IconButton>
                  )}
                </>
              )}
            </Typography>
            {rowData.CreatedDate && (
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginTop: 8 }}
              >
                Added on {rowData.CreatedDate}
              </Typography>
            )}
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers style={{ padding: "30px" }}>
        {Object.keys(rowData).map(
          (key) =>
            rowData[key] !== null &&
            rowData[key] !== undefined &&
            key !== "Status" &&
            key !== "InquiryStatus" &&
            key !== "IsDeleted" &&
            key !== "IsDone" &&
            key !== "CreatedDate" && ( // Exclude CreatedDate from content since it's shown in the header
              <Typography
                key={key}
                variant="body1"
                gutterBottom
                style={{ marginBottom: "20px" }}
              >
                <strong>{key}:</strong> {rowData[key]}
              </Typography>
            )
        )}
      </DialogContent>
      <DialogActions style={{ padding: "16px 24px" }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          style={{
            padding: "8px 24px",
            width: 123,
            height: 44,
            fontSize: "16px",
            textTransform: "none",
          }}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InquiryViewDetailDialogComponent;
