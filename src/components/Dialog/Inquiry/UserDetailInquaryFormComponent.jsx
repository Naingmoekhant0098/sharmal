import React, { useState } from 'react';
import { Grid, IconButton, TextField, Button, Card, CardContent, ThemeProvider, useMediaQuery, Box } from '@mui/material';
import { Home, ArrowForwardIos, EmailOutlined } from '@mui/icons-material';
import logoIcon from '../../../assets/icons/Logo.png';
import commonStyles from '../../../commonStyles';
import { SendInquiryEmailAPI } from '../../../api/contactus/SendEmailController';
import { CreateInquaryAPI } from '../../../api/inquiry/InquiryController';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';

const UserDetailInquaryFormComponent = ({ itemData }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
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
      await SendInquiryEmailAPI(name, phoneNumber, email, details, toast, setisLoading);
      
      const payload = {
        UserName: name,
        PhoneNumber: phoneNumber,
        Email: email,
        Description: details,
        ...(itemData.Property && { PropertyId: itemData.Property.PropertyId }),
        ...(itemData.Car && { CarId: itemData.Car.CarId }),
      };
  
      await CreateInquaryAPI(payload);
  
      // Clear fields after successful submission
      setName("");
      setPhoneNumber("");
      setEmail("");
      setDetails("");
      toast.success("Inquiry submitted successfully.");
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again.");
    }
  };
  
  return (
    <>
      <Grid item xs={12} md={3.5} order={isMobile ? 3 : 1}>
        <Card style={{ boxShadow: isMobile ? 'none' : '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
              <img src={logoIcon} style={{ width: isMobile ? '40%' : '30%', height: 'auto', marginTop: '3%' }} alt="Logo" />
              <h3 style={{ marginTop: isMobile ? '5%' : '7%', textAlign: isMobile ? 'center' : 'left' }}>Sharmal Real Estate</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="အမည်"
                variant="outlined"
                margin="normal"
                value={name}
                InputLabelProps={{ style: commonStyles.inputLabel }}
                onChange={(e) => setName(e.target.value)}
                type='text'
              />
              <TextField
                fullWidth
                label="ဖုန်းနံပါတ််"
                variant="outlined"
                value={phoneNumber}
                margin="normal"
                InputLabelProps={{ style: commonStyles.inputLabel }}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type='number'
              />
              <TextField
                fullWidth
                label="အီးမေးလ်"
                variant="outlined"
                margin="normal"
                value={email}
                InputLabelProps={{ style: commonStyles.inputLabel }}
                onChange={(e) => setEmail(e.target.value)}
                type='text'
              />
              <TextField
                fullWidth
                label="အကြောင်းအရာ"
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                value={details}
                InputLabelProps={{ style: commonStyles.inputLabel }}
                onChange={(e) => setDetails(e.target.value)}
                type='text'
              />

              {
                isLoading ? (
                  <LoadingButton
                    loading
                    variant="outlined"
                    color="primary"
                    style={{ width: '100%', marginTop: '20px', backgroundColor: '#FBB96F', color: '#131313', textTransform: 'none' }}
                  >
                    Submitting...
                  </LoadingButton>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '20px', backgroundColor: '#FBB96F', color: '#131313', textTransform: 'none' }}
                    startIcon={<EmailOutlined />} // Email icon
                    type="submit"
                  >
                    Inquiry ပေးပို့မည်။
                  </Button>
                )
              }


            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default UserDetailInquaryFormComponent
