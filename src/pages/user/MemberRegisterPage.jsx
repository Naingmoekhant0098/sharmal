import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Link,
  Paper,
  ThemeProvider
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SharmalLoginImage from '../../assets/images/Logo.png';
import theme from '../../theme';
import { LoadingButton } from '@mui/lab';

function MemberRegisterPage({ history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');

  const handleNext = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      toast.success("OTP has been sent to your email");
    }, 1000);
  };

  const handleOtpConfirm = () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    toast.success("OTP Verified Successfully");
    // You can now call the actual registration API
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: { xs: '100%', sm: '90%', md: '800px' },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              backgroundColor: '#fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2
            }}
          >
            <img
              src={SharmalLoginImage}
              alt="Register Illustration"
              style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
            />
          </Box>

          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              py: 4,
              px: { xs: 2, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" fontWeight="bold" textAlign="center" mb={3}>
              {step === 1 ? 'Create Your Account' : 'Enter OTP'}
            </Typography>

            <Box sx={{ width: '100%', maxWidth: 330 }}>
              {step === 1 ? (
                <>
                  <TextField
                    fullWidth
                    label="Full Name"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <LoadingButton
                    fullWidth
                    loading={loading}
                    onClick={handleNext}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, borderRadius: '30px', fontWeight: 600, height: '45px', textTransform: 'uppercase' }}
                  >
                    Continue
                  </LoadingButton>
                </>
              ) : (
                <>
                  <TextField
                    fullWidth
                    label="OTP Code"
                    margin="normal"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    inputProps={{ maxLength: 6 }}
                  />
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleOtpConfirm}
                    sx={{ mt: 2, borderRadius: '30px', fontWeight: 600, height: '45px', textTransform: 'uppercase' }}
                  >
                    Verify OTP
                  </LoadingButton>
                </>
              )}

              <Typography textAlign="center" mt={2}>
                Already have an account?{' '}
                <Link onClick={() => history.push('/member/login')} underline="hover" sx={{ cursor: 'pointer' }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default MemberRegisterPage;
