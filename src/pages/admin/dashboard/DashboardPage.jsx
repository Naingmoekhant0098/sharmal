import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme";
import { Box, Typography,Button } from "@mui/material";
import { _DecryptService } from "../../../service/EncryptDecryptService";
import _JWTDecodeService from "../../../service/JWTDecodeService";
import TotalInquaryCard from "../../../components/Card/dashboard/TotalInquaryCard";
import { GetDashboardDataAPI } from "../../../api/dashboard/GetDashboardDataController";
import TotalCountCard from "../../../components/Card/dashboard/TotalCountCard";
import AnalyticsIcon from '@mui/icons-material/BarChart'; // import at top


export default function DashboardPage({
  setSelectedIndex,
  setSelectedItem,
  setSelectedCategory,
}) {
  const [user, setUser] = useState("");
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decryptedToken = _DecryptService(token);
      const decodedToken = _JWTDecodeService(decryptedToken);
      const userName = _DecryptService(decodedToken?.UserName);
      setUser(userName || "Guest");
    }
    const fetchDashboardData = async () => {
        try {
          await GetDashboardDataAPI(setDashboardData);
        } catch (error) {

          
        }
      };
  
      fetchDashboardData();
  }, []); // Empty dependency array to run once on mount
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginTop: { lg: -8 },
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginLeft: "40px",
        }}
      >
        <Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
          Dashboard Overview
        </Typography>
        <Typography
          sx={{ color: theme.components.dashboard.welcomeTextColor, fontWeight: "700", fontSize: "26px" }}
        >
          Hello, {user} 👋
        </Typography>
        <Button
  startIcon={<AnalyticsIcon />}
  variant="contained"
  color="primary"
  sx={{ width: 'fit-content' }}
  onClick={() => window.open('https://analytics.google.com/analytics/....', '_blank')}
>
  View Google Analytics
</Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "77vw",
            height: "50%",
          }}
        >
          {/* Left side */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "50%",
            }}
          >
            <TotalCountCard
              Type="Properties"
              setSelectedIndex={setSelectedIndex}
              setSelectedItem={setSelectedItem}
              DashboardData={dashboardData}
              setSelectedCategory={setSelectedCategory}
            />
            <TotalCountCard
              Type="Cars"
              setSelectedIndex={setSelectedIndex}
              setSelectedItem={setSelectedItem}
              DashboardData={dashboardData}
              setSelectedCategory={setSelectedCategory}
            />
            <TotalCountCard
              Type="Ads"
              setSelectedIndex={setSelectedIndex}
              setSelectedItem={setSelectedItem}
              DashboardData={dashboardData}
            />
          </Box>

          {/* Right side */}
          <Box sx={{ width: "50%" }}>
            <TotalInquaryCard
              setSelectedIndex={setSelectedIndex}
              setSelectedItem={setSelectedItem}
              DashboardData={dashboardData}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
