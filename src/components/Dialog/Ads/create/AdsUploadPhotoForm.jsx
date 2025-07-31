import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import UploadPic from '../../../../assets/images/UploadPic.png';
import CloseIcon from '@mui/icons-material/Close';

function AdsUploadPhotoForm({ handleNext, handleBack, onFileChange, files, status, oldData }) {
  const fileInputRef = useRef(null);
  const [imageURL, setImageURL] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);

  useEffect(() => {
    if (status === 'edit' && oldData) {
      // Load the existing image from oldData if in edit mode
      setImageURL(`http://nksoftware-001-site17.dtempurl.com/${oldData.CreatedBy}/Ads/${oldData.image[0].ImageName}`);
    } else {
      if (files && files.length > 0) {
        // Load a preview for the selected file
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageURL(reader.result);
          setFileUploaded(true);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [status, oldData, files]);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageURL(URL.createObjectURL(file)); // Update the image preview
      setFileUploaded(true); // Mark as uploaded
      onFileChange(file); // Notify the parent component about the file
    }
  };

  const handleRemoveImage = () => {
    // Clear the image preview and file input
    setImageURL('');
    setFileUploaded(false);
    fileInputRef.current.value = null; // Reset the file input
  };

  return (
    <Box sx={{ marginTop: '32px', paddingX: 10 }}>
      <Typography variant="h6" component="h1" gutterBottom sx={{ fontSize: '30px', fontWeight: 'bold', marginBottom: 3 }}>
        Upload Photo
      </Typography>
      <Box sx={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sx={{
            width: '350px',
            height: '350px',
            border: '1px dashed grey',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative' // To position the close icon
          }}>
            {imageURL ? (
              <>
                <img
                  src={imageURL}
                  alt="Uploaded"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Ensures the image covers the container without distortion
                    border: 'none',
                  }}
                />
                <IconButton
                  onClick={handleRemoveImage}
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red background on hover
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    width: '50px',
                    height: '50px',
                    backgroundImage: `url(${UploadPic})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Typography variant='h5'>Drag your photo here</Typography>
                <Typography variant='h5' sx={{ fontSize: '13px' }}>- OR -</Typography>
                <Button variant='contained' onClick={handleBrowseClick}>
                  Browse Photo
                </Button>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ marginTop: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          sx={{
            border: 'none',
            '&:hover': {
              border: 'none',
            },
            textTransform: 'none',
            width: '100px'
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={!imageURL} // Disable if no image is uploaded
          sx={{ marginLeft: '8px', textTransform: 'none', width: '100px' }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default AdsUploadPhotoForm;
