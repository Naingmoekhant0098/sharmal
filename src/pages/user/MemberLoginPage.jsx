import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Link,
  Paper,
  ThemeProvider,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SharmalLoginImage from '../../assets/images/Logo.png';
import theme from '../../theme';
import { MemberLoginAPI } from '../../api/auth/AuthController';
import { _EncryptService } from '../../service/EncryptDecryptService';
import { LoadingButton } from '@mui/lab';

function MemberLoginPage({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in both fields');
      return;
    }

    const encryptedPassword = _EncryptService(password);

    const payload = {
      Email: email,
      Password: encryptedPassword
    };

    setLoading(true);
    await MemberLoginAPI(payload, toast, history);
    setLoading(false);
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
          {/* Left: Illustration */}
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
              alt="Login Illustration"
              style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
            />
          </Box>

          {/* Right: Login Form */}
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
              Login to Sharmal
            </Typography>

            <Box sx={{ width: '100%', maxWidth: 330 }}>
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
                margin="normal"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <LoadingButton
                fullWidth
                loading={loading}
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{
                  mt: 2,
                  borderRadius: '30px',
                  fontWeight: 600,
                  height: '45px',
                  textTransform: 'uppercase'
                }}
              >
                Login
              </LoadingButton>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Link onClick={() => history.push('/member/forget-password')} underline="hover" sx={{ cursor: 'pointer' }}>
                  Forgot Password?
                </Link>
                <Link onClick={() => history.push('/member/register')} underline="hover" sx={{ cursor: 'pointer' }}>
                  Register
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default MemberLoginPage;
