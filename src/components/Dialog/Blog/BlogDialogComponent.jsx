import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { CreateBlogAPI, UpdateBlogAPI } from "../../../api/blog/BlogController";
import { toast } from "react-toastify";

function BlogDialogComponent({ open, onClose, onRefresh, dialogStatus, DataForEdit }) {
  const isEdit = dialogStatus === 'edit';
  const oldData = isEdit ? DataForEdit : {};

  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (open && isEdit && oldData) {
      setBlogTitle(oldData.Title || '');
      setBlogDescription(oldData.Description || '');
      if (oldData.Image) {
        setPreviewUrl(`data:image/jpeg;base64,${oldData.Image}`);
        setImage(oldData.Image); // Use base64 directly for edit mode
      }
    }
  }, [open, isEdit, oldData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        setImage(base64);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl("");
  };

  const handleSubmit = async () => {
    if (!blogTitle || !blogDescription || !image) return;
    const payload = {
      Title: blogTitle,
      Description: blogDescription,
      Image: image,
    };
    try {
      isEdit ? await UpdateBlogAPI({ ...payload, Id: oldData.Id },toast) : await CreateBlogAPI(payload);
      onRefresh();
      handleClose();
    } catch (error) {
      console.error("Blog Submission Failed:", error);
    }
  };

  const handleClose = () => {
    setBlogTitle("");
    setBlogDescription("");
    setImage(null);
    setPreviewUrl("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{isEdit ? 'Edit Blog Post' : 'New Blog Post'}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          label="Blog Title"
          variant="outlined"
          margin="normal"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={blogDescription}
          onChange={(e) => setBlogDescription(e.target.value)}
        />

        <Box mt={2}>
          <Typography variant="subtitle1">Upload Image</Typography>
          {previewUrl ? (
            <Box mt={1} position="relative" display="inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                style={{ width: "100%", maxWidth: 300, borderRadius: 8 }}
              />
              <IconButton
                onClick={handleRemoveImage}
                size="small"
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  zIndex: 1,
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
              Select Image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
          )}
        </Box>

        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!blogTitle || !blogDescription || !image}
          >
            {isEdit ? 'Update Blog' : 'Submit Blog'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default BlogDialogComponent;