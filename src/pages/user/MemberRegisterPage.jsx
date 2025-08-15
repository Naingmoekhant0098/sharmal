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
  Divider,
  Button,
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
import FacebookIcon from "@mui/icons-material/Facebook";
import Checkbox from "@mui/material/Checkbox";
import FacebookLogin from "react-facebook-login";
import facebookLogo from "../../assets/icons/facebook.png";
function MemberLoginPage({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  const [data, setData] = useState({});

  // 1076770271246017
  // 022db5ceddf1d9d6ab08ffaf3f405d71
  // sharmal
  const roles = [
    {
      name: "Owner",
      value: "owner",
    },
    {
      name: "Beneficiary",
      value: "beneficiary",
    },
    {
      name: "Company",
      value: "company",
    },
    {
      name: "Construction",
      value: "construction",
    },
  ];
  const [current, setCurrent] = useState("owner");

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
          elevation={4}
          sx={{
            width: "100%",
            height: "100vh",
            px: { xs: 2, sm: 0 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },

              // backgroundColor: "#fafafa",
              display: { xs: "none", md: "flex" },
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
              <Box
                sx={{
                  display: "flex",
                  background: "#f4f4f4",
                  p: { xs: 0.2, sm: 0.2, md: 0.5, lg: 0.5, xl: 0.5 },
                  // mt: 3,
                  borderRadius: "10px",
                  width: "100%",
                  maxWidth: 500,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 4,
                    left: `${
                      roles.findIndex((r) => r.value === current) *
                      (100 / roles.length)
                    }%`,
                    width: `${100 / roles.length}%`,
                    height: "calc(100% - 8px)",
                    background: theme.palette.primary.main,
                    borderRadius: "10px",
                    transition: "left 0.3s ease",
                    zIndex: 0,
                  }}
                />
                {roles.map((role) => (
                  <Box
                    key={role.value}
                    onClick={() => setCurrent(role.value)}
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      p: 1.5,
                      px: { xs: 1, sm: 1, md: 1.4, lg: 1.4, xl: 1.4 },
                      cursor: "pointer",
                      color: current === role.value ? "white" : "black",
                      fontWeight: 500,
                      zIndex: 1,
                      fontSize: {
                        xs: "13px",
                        sm: "13px",
                        md: "15px",
                        lg: "15px",
                      },
                      userSelect: "none",
                    }}
                  >
                    {role.name}
                  </Box>
                ))}
              </Box>

              {current === "owner" ? (
                <Box sx={{ mt: 2, height: 650 }}>
                  <Typography
                    sx={{
                      fontSize: "30px",
                    }}
                    fontWeight="bold"
                    mb={1}
                  >
                    Create Sharmal Owner Account
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: 16,
                      opacity: 0.6,
                    }}
                    mb={6}
                  >
                    Start your journey with a free trial — enjoy 10 posts at no
                    cost.
                  </Typography>

                  <Box sx={{ marginTop: 1 }}>
                    <TextField
                      fullWidth
                      placeholder="Enter Fullname"
                      margin="normal"
                      value={data?.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{
                                fontSize: { sm: 20, md: 30 },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px",
                        },
                      }}
                    />

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
                        mt: 2,

                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px", // reduced radius
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      value={data?.phone}
                      placeholder="Enter Phone Number"
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon
                              sx={{
                                fontSize: { sm: 20, md: 30 },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        mt: 2,
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
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
                        mt: 2,
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px", // reduced radius
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      // label="Password"
                      type="password"
                      placeholder="Enter Confirm Password "
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
                        mt: 2,
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px", // reduced radius
                        },
                      }}
                    />

                    <FormControlLabel
                      control={<Checkbox />}
                      label="I agree with Terms and Privacy."
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
                      Continue
                    </LoadingButton>
                    <Divider sx={{ mt: 2 }}>Or</Divider>
                    <FacebookLogin
                      appId="1076770271246017"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={handleFacebookCallback}
                      icon={<FacebookIcon />}
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
                  </Box>
                </Box>
              ) : current === "beneficiary" ? (
                <Box sx={{ mt: 2, height: 650 }}>
                  <Typography
                    sx={{
                      fontSize: "30px",
                    }}
                    fontWeight="bold"
                    mb={1}
                  >
                    Create Sharmal Beneficiary Account
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: 16,
                      opacity: 0.6,
                    }}
                    mb={6}
                  >
                    Experience the benefits with 10 free posts — no commitment
                    required.
                  </Typography>

                  <Box sx={{ marginTop: 1 }}>
                    <TextField
                      fullWidth
                      placeholder="Enter Fullname"
                      margin="normal"
                      value={name || ""}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{
                                fontSize: { sm: 20, md: 30 },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px",
                        },
                      }}
                    />

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
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      value={data?.phone}
                      placeholder="Enter Phone Number"
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon
                              sx={{
                                fontSize: { sm: 20, md: 30 },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px",
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
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px", // reduced radius
                        },
                      }}
                    />

                    <FormControlLabel
                      control={<Checkbox />}
                      label="I agree with Terms and Privacy."
                    />

                    {/* <TextField
                   fullWidth
                   label="Confirm Password"
                   type="password"
                   margin="normal"
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                 /> */}
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
                      Continue
                    </LoadingButton>
                    <Divider sx={{ mt: 2 }}>Or</Divider>
                    <FacebookLogin
                      appId="1076770271246017"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={handleFacebookCallback}
                      icon={<FacebookIcon />}
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
                  </Box>
                </Box>
              ) : current === "company" ? (
                <Box sx={{ mt: 2, height: 650 }}>
                  <Typography
                    sx={{
                      fontSize: "30px",
                    }}
                    fontWeight="bold"
                    mb={1}
                  >
                    Create Sharmal Company Account
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: 16,
                      opacity: 0.6,
                    }}
                    mb={6}
                  >
                    Experience the benefits with 10 free posts — no commitment
                    required.
                  </Typography>

                  <Box sx={{ marginTop: 1 }}>
                    <TextField
                      fullWidth
                      placeholder="Enter Fullname"
                      margin="normal"
                      value={name || ""}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{
                                fontSize: { sm: 20, md: 30 },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      // label="Email"
                      margin="normal"
                      value={data?.company_name}
                      placeholder="Enter Company Name"
                      onChange={(e) =>
                        setData({ ...data, company_name: e.target.value })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ApartmentIcon
                              sx={{
                                fontSize: { sm: 20, md: 30 },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px",
                        },
                      }}
                    />
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
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      value={data?.phone}
                      placeholder="Enter Phone Number"
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon
                              sx={{
                                fontSize: { sm: 20, md: 30 },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px",
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
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px", // reduced radius
                        },
                      }}
                    />

                    <FormControlLabel
                      control={<Checkbox />}
                      label="I agree with Terms and Privacy."
                    />

                    {/* <TextField
                   fullWidth
                   label="Confirm Password"
                   type="password"
                   margin="normal"
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                 /> */}
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
                      Continue
                    </LoadingButton>
                    <Divider sx={{ mt: 2 }}>Or</Divider>
                    <FacebookLogin
                      appId="1076770271246017"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={handleFacebookCallback}
                      icon={<FacebookIcon />}
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
                  </Box>
                </Box>
              ) : (
                <Box sx={{ mt: 2, minHeight: 650 }}>
                  <Typography
                    sx={{
                      fontSize: "30px",
                    }}
                    fontWeight="bold"
                    mb={1}
                  >
                    Create Construction Account
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: 16,
                      opacity: 0.6,
                    }}
                    mb={6}
                  >
                    Experience the benefits with 10 free posts — no commitment
                    required.
                  </Typography>

                  <Box sx={{ marginTop: 1 }}>
                    <TextField
                      fullWidth
                      placeholder="Enter Fullname"
                      margin="normal"
                      value={name || ""}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{
                                fontSize: { sm: 20, md: 30 },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px",
                        },
                      }}
                    />

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
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      value={data?.phone}
                      placeholder="Enter Phone Number"
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon
                              sx={{
                                fontSize: { sm: 20, md: 30 },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px",
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
                        "& .MuiOutlinedInput-root": {
                          fontSize: { xs: 15, sm: 15, md: 15, lg: 15, xl: 16 },
                          borderRadius: "10px", // reduced radius
                        },
                      }}
                    />

                    <FormControlLabel
                      control={<Checkbox />}
                      label="I agree with Terms and Privacy."
                    />

                    {/* <TextField
                   fullWidth
                   label="Confirm Password"
                   type="password"
                   margin="normal"
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                 /> */}
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
                      Continue
                    </LoadingButton>

                    <Divider sx={{ mt: 2 }}>Or</Divider>
                    <FacebookLogin
                      appId="1076770271246017"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={handleFacebookCallback}
                      icon={<FacebookIcon />}
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
                  </Box>
                </Box>
              )}

              <Typography textAlign="center" mt={5}>
                Already have an account?{" "}
                <Link
                  onClick={() => history.push("/login")}
                  underline="hover"
                  sx={{ cursor: "pointer" }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MemberLoginPage;
