import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Link,
  ThemeProvider,
  InputAdornment,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
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

import Checkbox from "@mui/material/Checkbox";
import FacebookLogin from "react-facebook-login";

function MemberRegisterPage({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  const [data, setData] = useState({});

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

  const handleFacebookCallback = (response) => {
    if (response?.status === "unknown") {
      console.error("Sorry!", "Something went wrong with facebook Login.");
      return;
    }
    console.log(response);
    // // console will print following object for you.
    //   {
    //     "name": "Syed M Ahmad",
    //     "email": "ssgcommando90@yahoo.com",
    //     "picture": {
    //         "data": {
    //             "height": 50,
    //             "is_silhouette": false,
    //             "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=7138203302951151&height=50&width=50&ext=1714730459&hash=AfplSQ-UxV9LeHd5wYnaKbeKEIfUjMN-pHFGZJaWwC-00g",
    //             "width": 50
    //         }
    //     },
    //     "id": "7138203302951151",
    //     "userID": "7138203302951151",
    //     "expiresIn": 7142,
    //     "accessToken": "EAANdCvUejTUBO3C5uZCp0n6i9H31bCdW6bZBUcOET2aTbWlZCJA7kQoQ1jxDCsnFctxZBAQPl2kSUSqb4N6KDLM8wROXn4fZCBj1Pmgq5peKkmPv7YJWHKXLb9mOIwcBbJJGj5EaXwLURktOGSv7HeNsiGxZBPBr1jewzZAL7FxbITljSsBq6LYnhKO6xT9D5FbFZB1JWdjii63xAeU36wZDZD",
    //     "signedRequest": "r3tHehW5aounQcMzalAtmiHR_lCmRHy0GSmrlD4w3zM.eyJ1c2VyX2lkIjoiNzEzODIwMzMwMjk1MTE1MSIsImNvZGUiOiJBUURUaEItZ3Z6RjViN09yV3VyM2tOai1FdDNQM1NGSHpheWVsMEYxSXc1NTNlTHBoZUs3M2RtTENFbVZTVjgySEZlUUFCQ0dPR19zME94RjU4LS14MFYxUWZIYkhCdDFTVl9FNG1scnh6Y2Z5RTVFNVozUy03SllRWUI2MEh1bW15b19mN3FKc3pLZENSbWFBbkE2c3JXenBCYnRfLXZIVTZjRTNYSjZnN19Db2xXNjk0Z1JDODd5eVVjT2R4NEszMHY4LXdrVlpVQWNvMXBkZGR1eTVqbFN4Yld0RkhGVlNpS282OGZxc09YdndYSXlDR0NOTjJrZEhDUDJSZElkT3VmSmRhbGs0dEo1TTRFUU9nWXJ3QllkeVlyUlY1ZlRuS3RvdGJyMF9ROHpQT21PTzQ2eXNBZmtJdGdjblFjOG5VaHQ5U0RMRlAzRVBhS0Q0dV9mY0YwbyIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNzEyMTM4NDU4fQ",
    //     "graphDomain": "facebook",
    //     "data_access_expiration_time": 1719914458
    // }
  };
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
          // elevation={4}
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            px: { xs: 2, sm: 0 },
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              // backgroundColor: "#fafafa",
              display: { xs: "none", md: "flex" },
              // display: "flex",
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
              overflowY: "scroll",
              height: "auto",
              width: { xs: "100%", md: "50%" },
              py: { xs: 2, sm: 2, md: 2, lg: 2 },
              px: { md: 4, lg: 4, xl: 5 },
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
                    fontWeight: "800",
                  }}
                  fontWeight="bold"
                  mb={1}
                >
                  Hello ,<br />
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
                  Log in to your account to continue managing your posts and
                  access your dashboard.
                </Typography>

                <Box sx={{ marginTop: 1 }}>
                  <TextField
                    fullWidth
                    // label="Email"
                    margin="normal"
                    value={data?.email}
                    placeholder="Enter Email Address !"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailIcon
                            sx={{
                              fontSize: { sm: 20, md: 30 },
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      fontSize: 10,
                      mt: 2,
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
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon
                            sx={{
                              fontSize: { sm: 20, md: 30 },
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      fontSize: 15,
                      mt: 2,
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

              <Divider sx={{ mt: 2 }}>Or</Divider>
              <FacebookLogin
                appId="1076770271246017"
                autoLoad={false}
                fields="name,email,picture"
                callback={handleFacebookCallback}
                icon={<FacebookIcon  sx={{xs : 16 , sm : 16 , md:20 , lg : 20 , xl :10}}/>}
                textButton="Continue with Facebook"
                buttonStyle={{
                  border: "1px solid #6F1D8E",
                  marginTop: "15px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  height: "45px",
                  fontSize: "14px",
                  width: "100%",
                  textTransform: "uppercase",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                cssClass="facebook-btn"
              />

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
