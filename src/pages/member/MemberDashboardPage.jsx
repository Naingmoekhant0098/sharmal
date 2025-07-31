import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
import { _DecryptService } from "../../service/EncryptDecryptService";
import _JWTDecodeService from "../../service/JWTDecodeService";
import DashboardCard from "../../components/Card/dashboard/DashboardCard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

function MemberDashboardPage() {
  const [user, setUser] = useState("");
  const [summary, setSummary] = useState({
    totalListings: 8,
    approvedListings: 6,
    pendingListings: 2,
    soldOrRentedOut: 3,
    membershipStatus: "Active",
    membershipExpiry: "2025-12-31",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decryptedToken = _DecryptService(token);
      const decodedToken = _JWTDecodeService(decryptedToken);
      const userName = _DecryptService(decodedToken?.UserName);
      setUser(userName || "Member");
    }

    // TODO: Fetch dashboard summary data from API if backend is ready
  }, []);

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
        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
          Dashboard Overview
        </Typography>
        <Typography
          sx={{
            color: theme.components.dashboard.welcomeTextColor,
            fontWeight: 700,
            fontSize: 26,
          }}
        >
          Welcome, {user} 👋
        </Typography>

        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <DashboardCard
            title="Total Listings"
            value={summary.totalListings}
            icon={<FormatListBulletedIcon />}
          />
          <DashboardCard
            title="Approved Listings"
            value={summary.approvedListings}
            icon={<CheckCircleIcon />}
          />
          <DashboardCard
            title="Pending Approval"
            value={summary.pendingListings}
            icon={<HourglassBottomIcon />}
          />
          <DashboardCard
            title="Sold Out"
            value={summary.soldOrRentedOut}
            icon={<EventAvailableIcon />}
          />
        <DashboardCard
            title="Rent Out"
            value={summary.soldOrRentedOut}
            icon={<EventAvailableIcon />}
          />
          <DashboardCard
            title="Membership Status"
            value={summary.membershipStatus}
            description={`Valid until ${summary.membershipExpiry}`}
            icon={<WorkspacePremiumIcon />}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MemberDashboardPage;
