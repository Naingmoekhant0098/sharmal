import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Link,
  Paper,
  ThemeProvider,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
   
} from "@mui/material";
 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharmalLoginImage from "../../assets/images/Sulay.png";
import theme from "../../theme";
import { LoadingButton } from "@mui/lab";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PhoneIcon from "@mui/icons-material/Phone";
import KeyIcon from "@mui/icons-material/Key";
 
import Checkbox from '@mui/material/Checkbox';

function MemberRegisterPage({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");


 const [data , setData] = useState({});

  // multiple role user
  
  
  const handleNext = async () => {

    console.log(data);
    // if (!name || !email || !password || !confirmPassword) {
    //   toast.error("All fields are required");
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not match");
    //   return;
    // }

    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setStep(2);
    //   toast.success("OTP has been sent to your email");
    // }, 1000);
  };

  const handleOtpConfirm = () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    toast.success("OTP Verified Successfully");
    // You can now call the actual registration API
  };
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Box
        sx={{
          maxWidth: "1600px",
          minHeight: "100vh",
          margin: "0 auto",
          backgroundColor: "white",
          background: "white",
          // background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          elevation={4}
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              // backgroundColor: "#fafafa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={SharmalLoginImage}
              alt="Register Illustration"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              py: 4,
              px: { xs: 2, sm: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignItems: 'center',
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 530, margin: "0 auto" }}>
            
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "30px",
                      fontWeight : "800"
                    }}
                    fontWeight="bold"
                    mb={1}
                  >
                   Hello ,<br/>
                   Welcome Back !
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: 16,
                      opacity: 0.6,
                    }}
                    mb={6}
                  >
                   Log in to your account to continue managing your posts and access your dashboard.
                  </Typography>

                  <Box sx={{ marginTop: 1 }}>
                    
                    <TextField
                      fullWidth
                      // label="Email"
                      margin="normal"
                      value={data?.email}
                      placeholder="Enter Email Address !"
                      onChange={(e) => setData({...data , email : e.target.value})}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailIcon
                              sx={{
                                 fontSize: {sm : 20 , md:30},
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        fontSize : 10,
                        mt :2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px", // reduced radius
                        },
                      }}
                    />
                    
                      
                    <TextField
                      fullWidth
                      // label="Password"
                      type="password"
                      placeholder="Enter Password "
                      margin="normal"
                      value={data?.password}
                      onChange={(e) => setData({...data , password : e.target.value})}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <KeyIcon
                              sx={{
                                fontSize: {sm : 20 , md:30},
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        fontSize : 15,
                        mt :2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px", // reduced radius
                        },
                      }}
                    />  
                    <LoadingButton
                      fullWidth
                      loading={loading}
                      onClick={handleNext}
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 2,
                        borderRadius: "10px",
                        fontWeight: 600,
                        height: "45px",
                        textTransform: "uppercase",
                      }}
                    >
                     Sign In
                    </LoadingButton>
                  </Box>
                </Box>
            
              <Typography textAlign="center" mt={2}>
                Already have an account?{" "}
                <Link
                  onClick={() => history.push("/register")}
                  underline="hover"
                  sx={{ cursor: "pointer" }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MemberRegisterPage;
