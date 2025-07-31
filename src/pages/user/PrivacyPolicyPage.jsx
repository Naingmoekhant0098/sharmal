import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import UserNavbarComponent from '../../components/Navbar/UserNavbarComponent';
import FooterComponent from '../../components/Footer/FooterComponent';

const PrivacyPolicyPage = ({history}) => {
  return (
    <>
    <UserNavbarComponent history={history}/>
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Privacy Policy
      </Typography>

      <Typography variant="body1" gutterBottom>
        Welcome to Sharmal.net, a digital platform powered by <a href='https://facebook.com/nksoftwareshouse'>NK Software House (09969119949)</a> that allows users in Myanmar to buy, sell, and rent real estate and vehicles online. We value your privacy and are committed to protecting your personal information.
      </Typography>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" gutterBottom>
          When you use Sharmal.net, we may collect the following types of information:
        </Typography>
        <ul>          
          <li>Location Details (City, Township, Region)</li>
          <li>Listing Details (Property or Car information)</li>          
        </ul>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          We use your data for the following purposes:
        </Typography>
        <ul>          
          <li>To connect buyers and sellers</li>
          <li>To improve our platform and user experience</li>          
        </ul>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          3. Information Sharing
        </Typography>
        <Typography variant="body1" gutterBottom>
          We do not sell, rent or trade your personal information. We may share information with:
        </Typography>
        <ul>
          <li>Service providers who support our platform (e.g., hosting, email)</li>
          <li>Law enforcement agencies if legally required</li>
        </ul>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          4. Data Security
        </Typography>
        <Typography variant="body1" gutterBottom>
          We implement appropriate technical and organizational measures to protect your information from unauthorized access, loss, or misuse.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          5. User Rights
        </Typography>
        <Typography variant="body1" gutterBottom>
          You have the right to access, update, or delete your personal data. You can contact us directly for assistance.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          6. Cookies
        </Typography>
        <Typography variant="body1" gutterBottom>
          We use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          7. Changes to This Policy
        </Typography>
        <Typography variant="body1" gutterBottom>
          We may update this policy from time to time. Changes will be posted on this page with the updated date.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          8. Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you have any questions about this Privacy Policy, please contact us at:
        </Typography>
        <Typography variant="body1">
          📧 Email: valiant2542023@gmail.com <br />
          📞 Phone: 09752733981 , 09752733985 <br />
          🏢 Company: Valiant Co.Ltd
        </Typography>
      </Box>
    </Container>
    <FooterComponent/>
    </>
  );
};

export default PrivacyPolicyPage;
