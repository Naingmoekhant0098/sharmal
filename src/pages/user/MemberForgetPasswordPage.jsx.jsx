import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  ThemeProvider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharmalLoginImage from "../../assets/images/Logo.png";
import theme from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { SendOtpEmailAPI } from "../../api/auth/AuthController";

function MemberForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1 = enter email, Step 2 = enter OTP
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [isEditingEmail, setIsEditingEmail] = useState(false); // false = locked

  useEffect(() => {
    let timer;
    if (step === 2 && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, step]);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await SendOtpEmailAPI(email); // or your actual API call
      setStep(2);
      setIsEditingEmail(false); // Lock after sending OTP

      if (res.status === 200) {
        toast.success("OTP code sent to your email");
        setStep(2);
        setResendTimer(60);
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (err) {
      toast.error("Server error: Unable to send OTP");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP code");
      return;
    }

    setLoading(true);
    // Call your Verify OTP API here
    await new Promise((res) => setTimeout(res, 1000)); // simulate

    toast.success("OTP verified successfully");
    setLoading(false);
    // Optionally redirect to reset password
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      handleSendOtp();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: { xs: "100%", sm: "90%", md: "800px" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* Left: Image */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              backgroundColor: "#fafafa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <img
              src={SharmalLoginImage}
              alt="Forgot Password"
              style={{ width: "100%", maxWidth: "300px", height: "auto" }}
            />
          </Box>

          {/* Right: Form */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              py: 4,
              px: { xs: 2, sm: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="center"
              mb={1}
            >
              Forgot Password
            </Typography>
            <Typography
              variant="body2"
              textAlign="left"
              color="text.secondary"
              mb={2}
            >
              Enter your email address and we’ll send you a code to reset your
              password.
            </Typography>

            <Box sx={{ width: "100%", maxWidth: 330 }}>
              {step === 1 ? (
                <>
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <LoadingButton
                    fullWidth
                    loading={loading}
                    onClick={handleSendOtp}
                    variant="contained"
                    sx={{
                      mt: 2,
                      borderRadius: "30px",
                      height: "45px",
                      textTransform: "uppercase",
                    }}
                  >
                    Send OTP
                  </LoadingButton>
                </>
              ) : (
                <>
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={email}
                    disabled={!isEditingEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      endAdornment: !isEditingEmail && (
                        <IconButton
                          onClick={() => {
                            setIsEditingEmail(true);
                            setOtp("");
                            setStep(1); // Optional: reset to Step 1 if you want to repeat sending OTP
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Enter OTP Code"
                    margin="normal"
                    value={otp}
                    inputProps={{ maxLength: 6, inputMode: "numeric" }}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Only digits
                      if (value.length <= 6) setOtp(value);
                    }}
                  />
                  <LoadingButton
                    fullWidth
                    loading={loading}
                    onClick={handleVerifyOtp}
                    variant="contained"
                    sx={{
                      mt: 2,
                      borderRadius: "30px",
                      height: "45px",
                      textTransform: "uppercase",
                    }}
                  >
                    Verify
                  </LoadingButton>

                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    {resendTimer > 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Resend code in {resendTimer}s
                      </Typography>
                    ) : (
                      <Button
                        onClick={handleResendOtp}
                        sx={{ textTransform: "none" }}
                      >
                        Resend OTP
                      </Button>
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default MemberForgetPasswordPage;
