import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from '../../../assets/icons/Logo.png';
import SulayImage from '../../../assets/images/Sulay.png';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CopyrightComponent from "../../../components/Copyright/CopyrightComponent";
import theme from "../../../theme";
import { toast } from 'react-toastify';
import { LoginAPI } from "../../../api/auth/AuthController";
import { _DecryptService, _EncryptService } from "../../../service/EncryptDecryptService";
import BackdropComponent from "../../../components/Loading/BackDropComponent";

export default function LoginPage({ history }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    
    //   Email: data.get("email"),
    //   Password: data.get("password"),
    // });
    const postBody = {
      Email: data.get("email"),
      Password: _EncryptService(data.get("password"))
    };

    setLoading(true);
    try {
      await LoginAPI(postBody, toast, history);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${SulayImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img alt="Sharmal Official Logo" src={Logo} width={200} height={100} />
            <Typography component="h1" variant="h5" mt={2}>
              Welcome Back
            </Typography>
            <Typography component="body" variant="body2">
              Sign in to Sharmal admin dashboard
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background:
                    "var(--Gradient-1, linear-gradient(93deg, #AC2582 -18.36%, #460F35 183.89%))",
                  color: "white",
                  "&:hover": {
                    background:
                      "var(--Gradient-1, linear-gradient(93deg, #AC2582 -18.36%, #460F35 183.89%))",
                  },
                }}
              >
                Sign In
              </Button>
              {/* <Button variant="contained" onClick={()=>_DecryptService("o5b2nKYsm/L4DvBergC6OTgFo9odLh/oBec3nplsR+o=")}>
                Decrypt
              </Button>  */}
              <Box sx={{mt:5}}>
                <Typography textAlign='center' variant="body2">Privacy Policy | Cookie Policy | Terms of Use</Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <CopyrightComponent />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <BackdropComponent open={loading}/>
    </ThemeProvider>
  );
}
