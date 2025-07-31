import React from 'react'
import { Box, ThemeProvider, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import theme from './../../../theme';
import CircleIcon from '@mui/icons-material/Circle';

const TotalInquaryCard = ({ setSelectedIndex, setSelectedItem, DashboardData }) => {

  const { InquiryCarCount, InquiryOtherCount, InquiryPropertyForSaleCount, InquiryPropertyForRentCount } = DashboardData;

  const pieChartData = [
    { label: 'Property For Sale', value: InquiryPropertyForSaleCount, color: theme.components.dashboard.saleCircleIcon },
    { label: 'Property For Rent', value: InquiryPropertyForRentCount, color: theme.components.dashboard.rentCircleIcon },
    { label: 'Cars For Sale', value: InquiryCarCount, color: theme.components.dashboard.saleCarCircleIcon },
    { label: 'Other', value: InquiryOtherCount, color: theme.components.dashboard.inquiryOtherCircleIcon }
  ];

  // const pieChartColors = ['#6FD195', theme.components.dashboard.rentCircleIcon, theme.components.dashboard.saleCarCircleIcon, theme.components.dashboard.inquiryOtherCircleIcon];

  const handleToInquary = () => {
    setSelectedIndex(3)
    setSelectedItem('Inquiries')
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{
          display: "flex",
          flexDirection: 'column',
          gap: "5px",
          height: '100%',
          border: "2px solid #C370A97A",
          borderRadius: "25px",
          padding: "20px 30px",
          backgroundColor: theme.palette.primary.contrastText
        }}
        >
          <Typography sx={{ fontSize: '16px', fontWeight: "600", color: theme.components.dashboard.inquiryTitleColor}}>Total Inquiries</Typography>

          <Box sx={{ width: '100%', position: "relative", marginLeft: "46px" }}>
            <PieChart
              height={200}
              series={[{
                data: pieChartData,
                innerRadius: 70, // Adjust this value based on how much space you want in the center
                // colors: pieChartColors
              }]}

              slotProps={{
                legend: { hidden: true },
              }}

              sx={{ margin: 'auto' }}
            />
            <Box
              sx={{
                position: 'absolute', // Ensure it overlaps the chart correctly
                top: '50%',
                left: '41%',
                transform: 'translate(-50%, -50%)', // Center it horizontally and vertically
                textAlign: 'center',
                pointerEvents: 'none', // Optional: prevent interactions on the text
              }}
            >
              <Typography variant="p" sx={{ fontWeight: '600', fontSize: '30px', color: theme.palette.primary.main }}>
              {parseInt(DashboardData?.TotalInquiryCount || 0).toLocaleString()}
              </Typography>
            </Box>
          </Box>



          <Box
            sx={{
              marginTop: 2, // Add spacing above the label box
              textAlign: 'left', // Align text to the left
            }}
          >
            <Box sx={{
              display: "flex",
              flexDirection: 'row',
              gap: "20px"
            }}>
              <Typography variant="h6" sx={{fontSize: "16px", color: theme.palette.primary.main, fontWeight: '500' }}>
                Properties
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: "20px",
                paddingTop: "3px"
              }}>
                <Typography variant="p" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CircleIcon sx={{ fontSize: 'small', color: theme.components.dashboard.saleCircleIcon }} />
                  For Sale: {InquiryPropertyForSaleCount}
                </Typography>
                <Typography variant="p" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CircleIcon sx={{ fontSize: 'small', color: theme.components.dashboard.rentCircleIcon }} />
                  For Rent: {InquiryPropertyForRentCount}
                </Typography>
              </Box>

            </Box>

            <Box sx={{
              display: "flex",
              flexDirection: 'row',
              gap: "65px",
              alignItems: "center",
              alignContent: "center",
              marginTop: "20px"
            }}>
              <Typography variant="h6" sx={{fontSize: "16px", color: theme.palette.primary.main, fontWeight: '500', marginTop: 1 }}>
                Cars
              </Typography>
              <Typography variant="p" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CircleIcon sx={{ fontSize: 'small', color: theme.components.dashboard.saleCarCircleIcon }} />
                For Sale: {InquiryCarCount}
              </Typography>
            </Box>

            <Box sx={{
              display: "flex",
              flexDirection: 'row',
              gap: "50px",
              alignItems: "center",
              alignContent: "center",
              marginTop: "20px"
            }}>
              <Typography variant="h6" sx={{fontSize: "16px", color: theme.palette.primary.main, fontWeight: '500', marginTop: 1 }}>
                Others
              </Typography>
              <Typography variant="p" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CircleIcon sx={{ fontSize: 'small', color: theme.components.dashboard.inquiryOtherCircleIcon }} />
                other: {InquiryOtherCount}
              </Typography>
            </Box>

          </Box>

          <Button
            onClick={handleToInquary}
            variant="contained"
            sx={{
              marginTop: "30px",
              borderRadius: '15px',
              fontWeight:500,
              fontSize:16,
              padding: '13px',
              backgroundColor: theme.components.dashboard.titleColor,
              textTransform:'none'
            }}>
            View Inquiries
          </Button>
        </Box>
      </ThemeProvider>

    </>

  )
}

export default TotalInquaryCard
