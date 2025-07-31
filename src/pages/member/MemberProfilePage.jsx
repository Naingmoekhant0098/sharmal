import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import theme from "../../theme";
import { _DecryptService } from "../../service/EncryptDecryptService";
import _JWTDecodeService from "../../service/JWTDecodeService";

function MemberProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    membershipStatus: "Active",
    expiry: "2025-12-31",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decryptedToken = _DecryptService(token);
      const decodedToken = _JWTDecodeService(decryptedToken);
      const fullName = _DecryptService(decodedToken?.UserName);
      const email = _DecryptService(decodedToken?.Email);
      setProfile((prev) => ({ ...prev, fullName, email }));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ px: 4, pt: 2 }}>

        <Paper sx={{ p: 4, borderRadius: 3 }} elevation={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ width: 100, height: 100, mb: 2 }} />
                <Button variant="outlined" startIcon={<EditIcon />}>
                  Upload Photo
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={profile.fullName}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={profile.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Membership Status"
                    value={profile.membershipStatus}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Valid Until"
                    value={profile.expiry}
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "right", mt: 4 }}>
            <Button variant="contained" color="primary">
              Update Password
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default MemberProfilePage;
