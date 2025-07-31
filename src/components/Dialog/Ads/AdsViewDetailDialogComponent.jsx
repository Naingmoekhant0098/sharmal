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

const AdsViewDetailDialogComponent = ({ open, handleClose, adsData }) => {
  // Safely access adsData properties
  const {
    AdsId,
    Title,
    Description,
    CreatedBy,
    CreatedDate,
    IsDeleted,
    StartDate,
    EndDate,
    ImageName
    // Add more properties as needed
  } = adsData || {};

  // Check if adsData is null or undefined
  if (!adsData) return null;

  const imageUrl = {CreatedBy} && {ImageName}
      ? `http://nksoftware-001-site17.dtempurl.com/${CreatedBy}/Ads/${ImageName}`
      : null;

  return (
    <Dialog
      open={open}
      onClose={null} // Disable default close behavior
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Ad Details</Typography>
          <Box>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent dividers style={{ padding: '30px' }}>
        {imageUrl && (
            <Box marginBottom="20px">
              <img src={imageUrl} alt="Ad Image" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
            </Box>
          )}
        {AdsId && (
          <Typography variant="body1" gutterBottom>
            <strong>Ads ID:</strong> {AdsId}
          </Typography>
        )}
        {Title && (
          <Typography variant="body1" gutterBottom>
            <strong>Title:</strong> {Title}
          </Typography>
        )}
        {Description && (
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong> {Description}
          </Typography>
        )}
        {CreatedBy && (
          <Typography variant="body1" gutterBottom>
            <strong>Created By:</strong> {CreatedBy}
          </Typography>
        )}
        {CreatedDate && (
          <Typography variant="body1" gutterBottom>
            <strong>Created Date:</strong> {CreatedDate}
          </Typography>
        )}
        {IsDeleted !== undefined && (
          <Chip
            label={IsDeleted ? 'Deleted' : 'Active'}
            style={{
              backgroundColor: IsDeleted ? '#d32f2f' : '#388e3c',
              color: 'white',
              marginBottom: '8px',
            }}
          />
        )}
        {StartDate && (
          <Typography variant="body1" gutterBottom>
            <strong>Start Date:</strong> {StartDate}
          </Typography>
        )}
        {EndDate && (
          <Typography variant="body1" gutterBottom>
            <strong>End Date:</strong> {EndDate}
          </Typography>
        )}
        {/* Add more fields as necessary */}
      </DialogContent>
      <DialogActions style={{ padding: '16px 24px' }}>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          style={{
            padding: '8px 24px',
            width: 123,
            height: 44,
            fontSize: '16px',
            textTransform: 'none',
          }}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdsViewDetailDialogComponent;



// import React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   IconButton,
//   Box,
//   Chip,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import EditIcon from '@mui/icons-material/Edit'; // Import the Edit icon
// import { useTheme } from '@mui/material/styles'; // Import the useTheme hook

// const AdsViewDetailDialogComponent = ({ open, onClose, rowData }) => {
//   const theme = useTheme(); // Get the theme for using the primary color

//   // if (!rowData) return null; // Return null if rowData is undefined

//   // Construct the image URL
//   const imageUrl = rowData.CreatedBy && rowData.ImageName
//     ? `http://nksoftware-001-site17.dtempurl.com/${rowData.CreatedBy}/Ads/${rowData.ImageName}`
//     : null;



//   return (
//     <Dialog
//       open={open}
//       onClose={null} // Disable default close behavior
//       maxWidth="sm"
//       fullWidth
//     >
//       <Box position="relative">
//         {/* Close Icon */}
//         <IconButton
//           onClick={onClose}
//           aria-label="close"
//           sx={{
//             position: 'absolute',
//             top: 8,
//             right: 23,
//             zIndex: 1000, // Ensure it appears above other elements
//             padding: 0,
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogTitle sx={{ paddingTop: '32px' }}> {/* Added padding to make space for the close icon */}
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             <Box>
//               <Typography variant="h6">
//                 Ads Preview
//                 {rowData.Status && (
//                   <Chip
//                     label={rowData.Status}
//                     style={{
//                       backgroundColor: rowData.Status === 'ငှားရန်' ? '#FBB96F' : '#FF98DF',
//                       color: rowData.Status === 'ငှားရန်' ? '#AB5B00' : '#C40087',
//                       marginLeft: 10,
//                     }}
//                   />
//                 )}
//                 {rowData.InquiryStatus && (
//                   <Chip
//                     label={rowData.InquiryStatus}
//                     style={{
//                       backgroundColor: rowData.InquiryStatus === 'Unread' ? '#FFC107' : '#4CAF50',
//                       color: '#000',
//                       marginLeft: 10,
//                     }}
//                   />
//                 )}
//               </Typography>
//               {rowData.StartDate && (
//                 <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
//                   Start Date: {rowData.StartDate}
//                 </Typography>
//               )}
//               {rowData.CreatedDate && (
//                 <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
//                   Added on {rowData.CreatedDate}
//                 </Typography>
//               )}
//             </Box>
//             <Box display="flex" alignItems="center">
//               {/* Edit Button with Icon, BorderRadius, and Elevation */}
//               <Button
//                 startIcon={<EditIcon />}
//                 variant="contained"
//                 sx={{
//                   borderRadius: 2,
//                   right:20,
//                   boxShadow: theme.shadows[3], // Elevation
//                   backgroundColor: '#fff',
//                   color: theme.palette.primary.main,
//                   textTransform: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f0f0f0', // Lighter color on hover
//                   },
//                 }}
//               >
//                 Edit
//               </Button>
//             </Box>
//           </Box>
//         </DialogTitle>
//         <DialogContent dividers style={{ padding: '30px' }}>
//           {imageUrl && (
//             <Box marginBottom="20px">
//               <img src={imageUrl} alt="Ad Image" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
//             </Box>
//           )}
//           {Object.keys(rowData).map(
//             (key) =>
//               rowData[key] !== null &&
//               rowData[key] !== undefined &&
//               !['Status', 'InquiryStatus', 'IsDeleted', 'IsDone', 'CreatedDate', 'CreatedBy', 'ImageName'].includes(key) && ( // Exclude certain fields from being shown
//                 <Typography key={key} variant="body1" gutterBottom style={{ marginBottom: '20px' }}>
//                   <strong>{key}:</strong> {rowData[key]}
//                 </Typography>
//               )
//           )}
//         </DialogContent>
//         <DialogActions style={{ padding: '16px 24px' }}>
//           <Button
//             onClick={onClose}
//             variant="contained"
//             color="primary"
//             style={{ padding: '8px 24px', width: 123, height: 44, fontSize: '16px', textTransform: 'none' }}
//           >
//             Okay
//           </Button>
//         </DialogActions>
//       </Box>
//     </Dialog>
//   );
// };

// export default AdsViewDetailDialogComponent;
