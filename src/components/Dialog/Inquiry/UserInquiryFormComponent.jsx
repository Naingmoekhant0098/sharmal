import { Dialog, DialogActions, Button, DialogContent, colors } from '@mui/material'
import React, { useState } from 'react'
import SharmalLogo from '../../../assets/images/SharmalWithUrl.png';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Box, Checkbox, FormControlLabel,useMediaQuery, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import theme from './../../../theme';
import { SendInquiryEmailAPI } from '../../../api/contactus/SendEmailController';
import { toast } from 'react-toastify';
import { CreateInquaryAPI } from '../../../api/inquiry/InquiryController';
import LoadingButton from '@mui/lab/LoadingButton';

const UserInquiryFormComponent = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setisLoading] = useState(false)
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if all fields are filled
    if (!name || !phoneNumber || !email || !details) {
      toast.error("All fields are required.");
      return;
    }
  
    try {
      setisLoading(true);
  
      // Send inquiry email
      await SendInquiryEmailAPI(name, phoneNumber, email, details, toast, setisLoading);
  
      const payload = {
        UserName: name,
        PhoneNumber: phoneNumber,
        Email: email,
        Description: details,
      };
  
      // Create inquiry
      await CreateInquaryAPI(payload);
  
      // Clear form fields after successful submission
      setName("");
      setPhoneNumber("");
      setEmail("");
      setDetails("");
  
      // Close the modal or perform any post-submit action
      if (onClose) onClose(true);
  
      toast.success("Inquiry submitted successfully.");
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setisLoading(false);
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={null} fullWidth maxWidth="sm">
        <DialogActions>
          <Button onClick={onClose}>
            <CloseIcon />
          </Button>
        </DialogActions>
        <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ position: 'relative', top: '-20px' }}>
            <img
              src={SharmalLogo}
              alt="logo"
              style={{ width: 'auto', height: '40px' }}
            />
          </Box>

          <Box sx={{ px: 2, mb: 2 }}>
            <Typography variant='h6' className='gradient-text' sx={{ fontWeight: '550' }} >
              လူကြီးမင်း၏ စိတ်ကူးထဲက
            </Typography>
            <Typography variant='h6' className='gradient-text-more' sx={{ fontWeight: '550' }}>
              အိမ်ခြံမြေနှင့်ကားများအား ရှာဖွေရန်
            </Typography>
            <Typography variant='h6' className='gradient-text' sx={{ fontWeight: '550' }}>
              ယခုပဲဆက်သွယ်လိုက်ပါ
            </Typography>
          </Box>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '20px', flexDirection: "column" }}>

            <TextField fullWidth label="အမည်" value={name} onChange={(e) => setName(e.target.value)} id="name" InputLabelProps={{
              style: {
                fontSize: '16px',
                height: 200
              }
            }} />
            <TextField fullWidth label="ဖုန်းနံပါတ်" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} id="phoneNo" InputLabelProps={{
              style: {
                fontSize: '16px',
                height: 200
              }
            }} />
            <TextField fullWidth label="အီးမေးလ်" value={email} onChange={(e) => setEmail(e.target.value)} id="email" InputLabelProps={{
              style: {
                fontSize: '16px',
                height: 200
              }
            }} />
            <TextField
              fullWidth
              label="လူကြီးမင်းအလိုရှိသောအိမ်ခြံမြေနှင့်ကားများအကြောင်းကိုဖော်ပြရေးသားနိုင်ပါတယ်"
              id="description"
              multiline
              variant="outlined"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              margin="normal"
              InputLabelProps={{
                style: {
                  fontSize: '16px',
                  height: 200
                }
              }}
            />
            <FormControlLabel
              value="agree"
              control={<Checkbox sx={{ transform: 'scale(0.8)' }} />}
              label="ရှာမယ် မှကြော်ငြာများကို အချိန်နှင့်တစ်ပြေးညီ သိလိုပါသည်။"
              labelPlacement="end"
              sx={{ '.MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
            />

            {
              isLoading ? (
                <LoadingButton 
                loading 
                variant="outlined" 
                color="primary"
                sx={{
                  background:
                    "var(--Gradient-1, linear-gradient(93deg, #AC2582 -18.36%, #460F35 183.89%))",
                  color: "white",
                  "&:hover": {
                    background:
                      "var(--Gradient-1, linear-gradient(93deg, #AC2582 -18.36%, #460F35 183.89%))",
                  },
                }}
                >
                  Submitting...
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    background:
                      "var(--Gradient-1, linear-gradient(93deg, #AC2582 -18.36%, #460F35 183.89%))",
                    color: "white",
                    "&:hover": {
                      background:
                        "var(--Gradient-1, linear-gradient(93deg, #AC2582 -18.36%, #460F35 183.89%))",
                    },
                  }}
                >
                  ပေးပို့မည်။
                </Button>
              )
            }

          </form>
        </DialogContent>

      </Dialog>
    </ThemeProvider>
  )
}

export default UserInquiryFormComponent
