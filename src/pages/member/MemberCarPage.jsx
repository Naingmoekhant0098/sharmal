import { Box,Typography } from "@mui/material";
export default function MemberCarPage() {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Member Car Page
        </Typography>
        <Typography variant="body1">
          Welcome to your dashboard! Here you can manage your properties, cars, and profile.
        </Typography>
        {/* Add more components or features as needed */}
      </Box>
    );
  }