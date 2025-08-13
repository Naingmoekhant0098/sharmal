import React, { useState } from "react";
import { Box, Typography, Link, ThemeProvider } from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharmalLoginImage from "../../assets/images/Sulay.png";
import theme from "../../theme";
import { LoadingButton } from "@mui/lab";
import OtpInput from "react-otp-input";
function MemberOtpPage({ history }) {
  const [loading, setLoading] = useState(false);

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

  // const handleOtpConfirm = () => {
  //   if (!otp || otp.length !== 6) {
  //     toast.error("Please enter a valid 6-digit OTP");
  //     return;
  //   }
  //   toast.success("OTP Verified Successfully");
  //   // You can now call the actual registration API
  // };
  const [otp, setOtp] = useState("");

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
                    fontWeight: "800",
                  }}
                  fontWeight="bold"
                  mb={1}
                >
                  Verify With OTP !
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: 16,
                    opacity: 0.6,
                  }}
                  mb={6}
                >
                  Verify your account with the code that we send to your email
                  example@gamil.com
                </Typography>

                <Box sx={{ marginTop: 4 }}>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputType="number"
                    style
                    containerStyle={{
                      gap: "20px",
                      justifyContent: "space-between",
                    }}
                    renderInput={(props) => <input style={{}} {...props} />}
                    inputStyle={{
                      width: "50px",
                      height: "50px",
                      border: "1px solid black",
                      borderRadius: "10px",
                      fontSize : "16px"
                    }}
                  />

                  <Typography textAlign="center" mt={4}>
                    Don’t receive the OTP ?
                    <Link
                      onClick={() => history.push("/member/register")}
                      underline="hover"
                      sx={{ cursor: "pointer" }}
                    >
                      Resend Code
                    </Link>
                  </Typography>

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
                    verify
                  </LoadingButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MemberOtpPage;
