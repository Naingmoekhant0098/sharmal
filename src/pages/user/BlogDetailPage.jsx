import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import theme from "../../theme";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function BlogDetailPage({ history }) {
  const location = useLocation();
  const { data } = location.state || {};
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Failed to load blog details. Please try again later.");
      }
    };
    fetchBlogDetails();
  }, [id]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setSnackbarOpen(true);
  };

  return (
    <div>
      <UserNavbarComponent history={history} />
      <Container>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : blog ? (
          <>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mt: 2,
                mb: 3,
                color: theme.palette.primary.main,
                fontWeight: "bold",
                lineHeight: 2,
              }}
            >
              {blog.Title}
            </Typography>
            <img
              src={`data:image/jpeg;base64,${blog?.Image}`}
              alt={blog.Title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
              {blog.Description}
            </Typography>

            {/* Share Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 4 }}>
              <Typography variant="body2" sx={{ alignSelf: "center" }}>
                Share this blog:
              </Typography>
              <FacebookShareButton url={currentUrl} quote={blog.Title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              {/* <TwitterShareButton url={currentUrl} title={blog.Title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton> */}
              {/* <WhatsappShareButton url={currentUrl} title={blog.Title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton> */}
              <Tooltip title="Copy URL">
                <IconButton onClick={handleCopyUrl}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        ) : (
          <Typography>Loading blog details...</Typography>
        )}
      </Container>

      {blog && <FooterComponent />}

      {/* Snackbar for Copy Success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          URL copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
}
