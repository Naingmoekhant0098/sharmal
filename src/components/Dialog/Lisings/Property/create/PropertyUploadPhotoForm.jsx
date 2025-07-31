import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import UploadPic from "../../../../../assets/images/UploadPic.png";
import CloseIcon from "@mui/icons-material/Close";

function PropertyUploadPhotoForm({
  handleNext,
  handleBack,
  onFileChange,
  status,
  oldData,
  onRemoveImage
}) {
  const fileInputRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";
  const resourceEndpoint = isProduction
    ? process.env.REACT_APP_RESOURCE_ENDPOINT
    : process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;

  useEffect(() => {
    if (status === "edit" && oldData && oldData.Images) {
      const existingImagePreviews = oldData.Images.map(
        (image) =>
          `${resourceEndpoint}${image.CreatedBy}/Property/${image.ImageName}`
      );
      console.log("Existing Image Previews:", existingImagePreviews); // Log the mapped URLs
      setImagePreviews(existingImagePreviews);
    }
  }, [status, oldData]);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Append new files to existing files
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    // Create previews for the new files
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]); // Add the new preview
      };
      reader.readAsDataURL(file);
    });

    setFileUploaded(files.length > 0);
  };

  const handleRemovePhoto = (url) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((preview) => preview !== url)
    );

    // For newly uploaded files (local blobs), just remove selected file
    const indexToRemove = imagePreviews.indexOf(url);
    if (indexToRemove !== -1) {
      setSelectedFiles((prevFiles) =>
        prevFiles.filter((_, index) => index !== indexToRemove)
      );
    }

    // 🧠 NEW: if it's from oldData.Images (existing URL), extract filename and notify parent
    if (status === "edit" && oldData && oldData.Images) {
      const matchedImage = oldData.Images.find((img) =>
        url.includes(img.ImageName)
      );
      if (matchedImage) {
        onRemoveImage(matchedImage.ImageName); // Notify parent
      }
    }
  };

  const handleToNext = () => {
    // Call onFileChange with selectedFiles (the actual files)
    onFileChange(selectedFiles);
    handleNext();
  };

  return (
    <Box sx={{ marginTop: "32px", paddingX: 10 }}>
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        sx={{ fontSize: "30px", fontWeight: "bold", marginBottom: 3 }}
      >
        Upload Photos
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            item
            sx={{
              width: "100%",
              height: "auto",
              border: "1px dashed grey",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {imagePreviews.length === 0 && (
              <>
                <Box
                  sx={{
                    width: "50px",
                    height: "50px",
                    backgroundImage: `url(${UploadPic})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Typography variant="h5">Drag your photos here</Typography>
                <Typography variant="body1">
                  Choose at least 5 photos
                </Typography>
                <Typography variant="h5" sx={{ fontSize: "13px" }}>
                  - OR -
                </Typography>
                <Button variant="contained" onClick={handleBrowseClick}>
                  Browse Photos
                </Button>
              </>
            )}

            {/* Grid for displaying uploaded image previews */}
            <Grid
              container
              spacing={2}
              sx={{
                flexWrap: "nowrap",
                overflowX: "auto",
                overflowY: "hidden",
                maxHeight: "600px",
              }}
            >
              {imagePreviews.map((url, index) => (
                <Grid
                  item
                  key={index}
                  sx={{
                    minWidth: "400px",
                    height: "400px",
                    flex: "0 0 auto",
                    marginRight: "16px",
                    position: "relative", // For positioning the close icon
                  }}
                >
                  <img
                    src={url}
                    alt="Uploaded preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // Equivalent to backgroundSize: 'cover'
                      borderRadius: "8px",
                    }}
                  />
                  <CloseIcon
                    onClick={() => handleRemovePhoto(url)}
                    sx={{
                      position: "absolute",

                      top: "20px",
                      right: "10px",
                      height: "20px",
                      backgroundColor: "rgba(128, 128, 128, 0.5)", // Semi-transparent gray
                      borderRadius: "100%",
                      "&:hover": {
                        cursor: "pointer",
                        color: "red",
                        backgroundColor: "rgba(255, 0, 0, 0.5)", // Change to semi-transparent red on hover
                      },
                    }}
                  />
                </Grid>
              ))}
              {imagePreviews.length < 5 && imagePreviews.length !== 0 && (
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    onClick={handleBrowseClick}
                    sx={{ height: "100px" }} // Match the button height to the image
                  >
                    Browse Photos
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ marginTop: 3 }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          sx={{
            border: "none",
            "&:hover": {
              border: "none",
            },
            textTransform: "none",
            width: "100px",
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleToNext}
          disabled={imagePreviews.length === 0}
          sx={{ marginLeft: "8px", textTransform: "none", width: "100px" }}
        >
          Next
        </Button>
      </Box>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        multiple
      />
    </Box>
  );
}

export default PropertyUploadPhotoForm;
