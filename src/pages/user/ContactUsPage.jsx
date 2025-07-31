import React, { useEffect, useState } from "react";
import { Card, Typography, Grid, TextField } from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent";
import GradientButtonComponent from "../../components/Button/GradientButtonComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import { SendInquiryEmailAPI } from "../../api/contactus/SendEmailController";
import { toast } from "react-toastify";
import theme from "../../theme";
import SharmalLogo from "../../assets/images/SharmalLogo.png";
import { useLocation } from "react-router-dom";
import { CreateInquaryAPI } from "../../api/inquiry/InquiryController";
import LoadingButton from "@mui/lab/LoadingButton";

export default function ContactUsPage({ history }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const paramLocation = useLocation(); // Use useLocation hook
  const [CarId, setCarId] = useState(null);
  const [PropertyId, setPropertyId] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(paramLocation.search);

    setCarId(queryParams.get("CarId") || null);
    setPropertyId(queryParams.get("PropertyId") || null);
  }, [paramLocation.search]);

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
        CarId: CarId || null, // Ensure CarId is handled properly
        PropertyId: PropertyId || null, // Ensure PropertyId is handled properly
      };
  
      // Create inquiry
      await CreateInquaryAPI(payload);
  
      // Clear form fields after successful submission
      setName("");
      setPhoneNumber("");
      setEmail("");
      setDetails("");
  
      toast.success("Inquiry submitted successfully.");
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setisLoading(false);
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <div style={styles.container}>
        <UserNavbarComponent history={history} />
        <div style={styles.cardWrapper}>
          <Card style={styles.card}>
            <Typography variant="h5" component="h2" style={styles.header}>
              ဆက်သွယ်ရန်
            </Typography>
            <Grid container spacing={4}>
              {/* Left Side Content */}
              <Grid item xs={12} md={6}>
                <div style={styles.logoContainer}>
                  <img src={SharmalLogo} alt="Logo" style={styles.logo} />
                  <Typography variant="h6" sx={{ mt: 1, ml: 3 }}>
                    Sharmal Real Estate
                  </Typography>
                </div>
                <div style={styles.contactInfo}>
                  <ContactItem icon={<Phone />} text="09752733981,09752733985  " />
                  <ContactItem icon={<Email />} text="valiant2542023@gmail.com" />
                  <ContactItem
                    icon={<LocationOn />}
                    text="No.1217, 4th Floor, Pinlon Road, 35 Ward, North Dagon, Yangon."
                  />
                </div>
                <div style={styles.mapContainer}>
                  <iframe                  
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.109491413952!2d96.1909924!3d16.8704774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c193e67d129303%3A0xe7810f5734933b77!2sValiant%20Co.Ltd%20(Sharmal%20Office)!5e0!3m2!1sen!2smm!4v1728275070012!5m2!1sen!2smm"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    title="Google Map"
                  />                 
                </div>
              </Grid>

              {/* Right Side Contact Form */}
              <Grid item xs={12} md={6}>
                <form style={styles.form} onSubmit={handleSubmit}>
                  <ContactFormField
                    label="အမည်"
                    value={name}
                    onChange={setName}
                  />
                  <ContactFormField
                    label="ဖုန်းနံပါတ်"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                  <ContactFormField
                    label="အီးမေးလ်"
                    value={email}
                    onChange={setEmail}
                  />
                  <TextField
                    label="အကြောင်းအရာ"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    InputLabelProps={{ style: styles.inputLabel }}
                  />
                  {isLoading ? (
                    <LoadingButton
                      loading
                      variant="outlined"
                      color="primary"
                      sx={{
                        mt: 3,
                        mb: 2,
                        background:
                          "linear-gradient(93deg, #AC2582 -18.36%, #460F35 183.89%)",
                        color: "white",
                        textTransform: "none",
                        borderRadius: "10px",
                        "&:hover": {
                          background:
                            "linear-gradient(93deg, #AC2582 -18.36%, #460F35 183.89%)",
                        },
                      }}
                    >
                      Submitting...
                    </LoadingButton>
                  ) : (
                    <GradientButtonComponent type="submit">
                      <p>ဆက်သွယ်မည်</p>
                    </GradientButtonComponent>
                  )}
                </form>
              </Grid>
            </Grid>
          </Card>
        </div>
        <FooterComponent />
      </div>
    </ThemeProvider>
  );
}

const ContactItem = ({ icon, text }) => (
  <div style={styles.contactItem}>
    {icon}
    <Typography variant="body1">{text}</Typography>
  </div>
);

const ContactFormField = ({ label, value, onChange }) => (
  <TextField
    label={label}
    variant="outlined"
    fullWidth
    margin="normal"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    InputLabelProps={{ style: styles.inputLabel }}
  />
);

const styles = {
  container: {
    height: "100vh",
    backgroundColor: theme.homePage.backgroundColor,
  },
  cardWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "75%",
    height: "75%",
    margin: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "20px",
  },
  header: {
    textAlign: "left",
    marginBottom: "20px",
  },
  logoContainer: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
  },
  logo: {
    width: "100px",
    marginBottom: "10px",
  },
  contactInfo: {
    marginBottom: "20px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  mapContainer: {
    width: "100%",
    height: "300px",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputLabel: {
    fontSize: "16px",
    height: 200,
  },
};
