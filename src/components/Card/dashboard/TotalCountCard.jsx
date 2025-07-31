import { Box, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeProvider } from "@emotion/react";
import theme from '../../../theme';

const TotalCountCard = ({ Type, setSelectedIndex, setSelectedItem, DashboardData, setSelectedCategory }) => {
  const handleToVisit = () => {
    setSelectedIndex(Type === "Ads" ? 2 : 1);
    setSelectedItem(Type === "Ads" ? 'Ads Management' : 'Listings');

    if (Type === "Properties") {
      setSelectedCategory('ListingsProperty');
    } else if (Type === "Cars") {
      setSelectedCategory('ListingsCar');
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{
          display: "flex",
          flexDirection: 'column',
          gap: "5px",
          border: "2px solid #C370A97A",
          borderRadius: "25px",
          padding: "20px 30px",
          backgroundColor: theme.palette.primary.contrastText
        }}>
          <Typography>Total {Type}</Typography>
          <Typography sx={{
            color: theme.palette.primary.main,
            fontWeight: "700",
            fontSize: '30px'
          }}>
            {Type === "Properties" ?
              parseInt(DashboardData.TotalPropertyCount || 0).toLocaleString()
              : Type === "Cars" ?
                DashboardData.TotalCarCount :
                Type === "Ads" ?
                  DashboardData.TotalAdsCount :
                  null
            }
          </Typography>

          {Type === "Properties" && (
            <Box sx={{
              width: "100%",
              display: 'flex',
              height: "auto",
              flexDirection: 'row',
            }}>
              <Typography variant='p' sx={{ marginRight: '30px' }}>
                For Sale
                <span style={{ fontWeight: '700', marginLeft: "10px", fontSize: "20px" }}>{DashboardData.PropertyForSaleCount}</span>
              </Typography>
              <Typography variant='p'>
                For Rent
                <span style={{ fontWeight: '700', marginLeft: "10px", fontSize: "20px" }}>{DashboardData.PropertyForRentCount}</span>
              </Typography>
            </Box>
          )}

          <Typography
            onClick={handleToVisit}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: theme.components.dashboard.welcomeTextColor,
              marginTop: Type !== "Properties" ? "30px" : "auto"
            }}
          >
            Visit {Type} {Type !== "Ads"? 'listings' : 'management'} <ArrowForwardIcon sx={{ marginLeft: "5px" }} />
          </Typography>
        </Box>
      </ThemeProvider>

    </>
  )
}

export default TotalCountCard
