import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";

const plans = [
  {
    id: "basic",
    title: "Basic Plan",
    price: "$19.99/month",
    features: [
      "5 Listings",
      "Basic Support",
      "Access to Property & Car Posting",
    ],
  },
  {
    id: "pro",
    title: "Pro Plan",
    price: "$49.99/month",
    features: ["Unlimited Listings", "Priority Support", "Premium Placement"],
  },
  {
    id: "annual",
    title: "Annual Plan",
    price: "$499/year",
    features: [
      "Unlimited Listings",
      "Priority Support",
      "Featured Ads",
      "Yearly Savings",
    ],
  },
];

function MembershipPage() {
  const [activePlan] = useState("pro");
  const [expiryDate] = useState({ pro: "2025-12-31" });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSubscribeClick = (planTitle) => {
    setSelectedPlan(planTitle);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Membership Plans
        </Typography>
        <Typography mb={4}>
          Choose the right plan to boost your visibility and manage more
          listings.
        </Typography>

        <Grid container spacing={3}>
          {plans.map((plan) => {
            const isActive = plan.id === activePlan;
            return (
              <Grid item xs={12} md={4} key={plan.id}>
                <Box
                  sx={{
                    border: isActive ? "2px solid #5B1144" : "1px solid #ccc",
                    boxShadow: isActive ? 6 : 1,
                    backgroundColor: isActive ? "#f9f0f8" : "#fff",
                    position: "relative",
                    p: 3,
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "0.3s",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <WorkspacePremiumIcon color="primary" fontSize="small" />
                      {plan.title}
                    </Typography>

                    <Typography fontWeight={600} color="primary" mt={1}>
                      {plan.price}
                    </Typography>

                    <ul>
                      {plan.features.map((feature, idx) => (
                        <li key={idx}>
                          <Typography fontSize={14}>{feature}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>

                  {isActive && (
                    <Typography
                      variant="caption"
                      color="success.main"
                      sx={{ mt: 1, fontWeight: 600 }}
                    >
                      ✅ Active until {expiryDate[plan.id]}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isActive}
                    sx={{ mt: 2, borderRadius: "30px", fontWeight: 600 }}
                    onClick={() => handleSubscribeClick(plan.title)}
                  >
                    {isActive ? "Current Plan" : "Subscribe"}
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Subscription Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Contact Sales to Subscribe</DialogTitle>
          <Divider />
          <DialogContent sx={{ py: 2 }}>
            <Typography mb={1}>
              Thank you for your interest in the <strong>{selectedPlan}</strong>
              !
            </Typography>
            <Typography>
              Please contact our sales team to proceed with your subscription:
            </Typography>

            <Box mt={2}>
              <Typography>
                <strong>📞 Phone:</strong>{" "}
                <a
                  href="tel:09752733981"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                  }}
                >
                  09752733981
                </a>
                ,{" "}
                <a
                  href="tel:09752733985"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                  }}
                >
                  09752733985
                </a>
              </Typography>

              <Typography mt={1}>
                <strong>✉️ Email:</strong>{" "}
                <a
                  href="mailto:valiant2542023@gmail.com"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                  }}
                >
                  valiant2542023@gmail.com
                </a>
              </Typography>

              <Typography mt={1}>
                <strong>📍 Office:</strong> No.1217, 4th Floor, Pinlon Road, 35
                Ward, North Dagon, Yangon
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default MembershipPage;
