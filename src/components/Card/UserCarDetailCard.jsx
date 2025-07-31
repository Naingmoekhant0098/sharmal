import React, { useState, useEffect, useRef } from 'react';
import { Grid, IconButton, useMediaQuery, Box, Button, Typography } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import DividerComponent from './../Divider/DividerComponent';
import AirConForCarIcon from '../../assets/icons/AirConForCarIcon.png';
import Location from '../../assets/icons/Location.png'; // Assuming LocationIcon is the correct image path
import _LinkifyService from '../../service/LinkifyService';

const UserCarDetailCard = ({ itemData }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);
  const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
  const resourceEndpoint = isProduction
    ? process.env.REACT_APP_RESOURCE_ENDPOINT
    : process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (itemData && itemData.Images && itemData.Images.length > 0) {
      const imageUrls = itemData.Images.map(
        (image) => `${resourceEndpoint}${image.CreatedBy}/Car/${image.ImageName}`
      );
      setImages(imageUrls);
    }
  }, [itemData]);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        setIsOverflowing(contentRef.current.scrollHeight > 300);
      }
    };

    const timeoutId = setTimeout(checkOverflow, 100);

    return () => clearTimeout(timeoutId);
  }, [itemData.Car.Description]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const getPaymentOptionValue = (paymentOption) =>
    paymentOption === "Bank Installment" ? 'Yes' : 'No';

  if (images.length === 0) {
    return <div>Loading images...</div>;
  }

  return (
    <>
      <Grid item xs={12} md={8} sx={{
        display: 'flex',
        padding: isMobile ? '0 16px' : '0 62px 0 40px',
        flexDirection: 'column',
        marginLeft: '20px',
        position: 'relative'
      }}>
        {/* Large image */}
        <Box sx={{
          position: 'relative',
          width: '100%',
          height: isMobile ? 'auto' : '612px'
        }}>
          <img
            src={images[currentImageIndex]}
            alt="Selected"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {!isMobile && (
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: '40px',
                top: '50%',
                fontSize: '2rem',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          )}
        </Box>

        {/* Thumbnail images below the large image */}
        <Grid container spacing={2} sx={{ justifyContent: 'center', marginTop: '5px' }}>
          {images.map((image, index) => (
            <Grid item xs={4} sm={2} key={index}>
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                style={{
                  width: isMobile ? '80px' : '100px',
                  height: isMobile ? '80px' : '100px',
                  cursor: 'pointer',
                  border: currentImageIndex === index ? '2px solid blue' : '2px solid transparent'
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Extra information */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '30px',
          gap: '5px',
          width: '100%',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', gap: '5px', flexDirection: 'row' }}>
            {['Condition', 'Manufacturer', 'Model', 'PlateDivision', 'CarColor'].map((key) => (
              <Typography key={key} variant='p' sx={{
                display: 'block',
                color: '#5B1144',
                fontSize: '8px',
                backgroundColor: "#5B114433",
                padding: isMobile ? '3px 6px' : '5px 10px',
                margin: 'auto 0'
              }}>
                {itemData.Car[key]}
              </Typography>
            ))}
          </Box>
          <Box>
            <Typography variant='p' sx={{ fontSize: '10px', color: '#C30000', marginTop: isMobile ? '10px' : '40px' }}>
              {`ကြော်ငြာတင်သည့်နေ့: ${itemData.Car.CreatedDate}`}
            </Typography>
          </Box>
        </Box>

        {/* Price */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'left',
          gap: "5px",
          alignItems: 'flex-end',
          marginTop: '30px',
        }}>
          <Typography variant='p' sx={{ fontSize: '40px', fontWeight: '500' }}>
            {itemData.Car.Price}
          </Typography>
          <Typography variant='p' >သိန်း</Typography>
          <Typography variant='p' sx={{ color: '#B1630B', fontSize: '12px', marginTop: '10px' }}>
            (ညှိနှိုင်း)
          </Typography>
        </Box>

        {/* Title */}
        <Typography
variant='p'
className='UserPageTitleStyle'
sx={{
  marginTop: isMobile ? '5px' : '20px',
  textAlign: 'left',
  color: '#CC3A35',
  width: '330px',
  height: 'auto',
  fontSize: '30px',
  fontWeight: "700"
}}
dangerouslySetInnerHTML={{
  __html: _LinkifyService(itemData.Car.Title || ''),
}}
/>


        {/* Location */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '5px'
        }}>
          <img src={Location} style={{ width: '11px', height: '15px' }} />
          <Typography variant='p' sx={{ fontSize: '14px', color: '#001619B2' }}>
            {itemData.Car.Location}
          </Typography>
        </Box>

        <DividerComponent />

        {/* Car information */}
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
          <Typography variant="p" sx={{ fontWeight: "700", fontSize: "20px" }}>
            ကားအချက်အလက်များ
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-evenly",
              paddingLeft: "29px",
            }}
          >
            {/* First Grid Section */}
            <Grid
              item
              xs={12} // Full width on mobile screens
              sm={6} // Half width on small and larger screens
              md={5.5} // Specific width on medium and larger screens
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "15px 40px",
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
              }}
            >
              <Box sx={{ width: "100%" }}>
                {[
                  { label: "ကြော်ငြာနံပါတ်", value: itemData?.Car?.Code },
                  { label: "Used / New", value: itemData?.Car?.Condition },
                  { label: "ကားထုတ်လုပ်သူ", value: itemData?.Car?.Manufacturer },
                  { label: "ကားမော်ဒယ်", value: itemData?.Car?.Model },
                  { label: "ထုတ်လုပ်သည့်နှစ်", value: itemData?.Car?.Year },
                  { label: "ပြားအစုံ", value: itemData?.Car?.PlateDivision },
                  { label: "ကားပုံစံ", value: itemData?.Car?.BuildType },
                  {
                    label: "Lincense Status",
                    value: itemData?.Car?.LincenseStatus,
                  },
                  {
                    label: "ဘဏ်အရစ်ကျ",
                    value: getPaymentOptionValue(itemData?.Car?.PaymentOption ),
                  },
                ].map(({ label, value }, index) => {

                  return (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        borderBottom: index < 8 ? "1px solid #1D1B204D" : "none",
                        display: "flex",
                        justifyContent: "space-between",
                        paddingBottom: "10px",
                        paddingTop: "10px",
                      }}
                    >
                      <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                        {label}
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#5B1144",fontWeight: 700 }}>
                        {value}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Grid>

            {/* Second Grid Section */}
            <Grid
              item
              xs={12} // Full width on mobile screens
              sm={6} // Half width on small and larger screens
              md={5.5} // Specific width on medium and larger screens
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "15px 40px",
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
              }}
            >
              <Box sx={{ width: "100%" }}>
                {[
                  { label: "ဘယ်မောင်း / ညာမောင်း", value: itemData?.Car?.SteeringPosition },
                  { label: "Auto / Manual", value: itemData?.Car?.Gearbox },
                  { label: "အင်ဂျင်ပါဝါ", value: itemData?.Car?.EnginePower },
                  { label: "လောင်စာအမျိုးအစား", value: itemData?.Car?.FuelType },
                  { label: "မောင်းနှင်ပြီးကီလို", value: itemData?.Car?.Mileage },
                  { label: "အရောင်", value: itemData?.Car?.CarColor },
                  { label: "နံပါတ်ပြား", value: itemData?.Car?.PlateNo },
                  { label: "နံပါတ်ပြားအရောင်", value: itemData?.Car?.PlateColor },
                ].map(({ label, value }, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
                      borderBottom: index < 7 ? "1px solid #1D1B204D" : "none",
                      display: "flex",
                      justifyContent: "space-between",
                      paddingBottom: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                      {label}
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#5B1144", fontWeight: 700 }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Description */}
        <Box
          sx={{
            display: "flex",
            flexDirection: 'column',
            marginTop: '20px',
            position: "relative",
            height: expanded ? 'auto' : 'auto', // Auto height for both states
            maxHeight: expanded ? 'none' : '300px', // Limit height when collapsed
            overflow: expanded ? 'visible' : 'hidden', // Hide overflow when collapsed
            transition: 'max-height 0.3s ease', // Smooth transition
            '&::before': !expanded && isOverflowing && {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(transparent, white)', // Add gradient for a smooth look
            },
            padding: isMobile ? '10px' : '20px', // Adjust padding for mobile
          }}
        >
          <Typography
            variant='p'
            sx={{
              fontWeight: "700",
              fontSize: isMobile ? "16px" : "20px", // Adjust font size for mobile
              marginBottom: isMobile ? '10px' : '20px',
            }}
          >
            Description
          </Typography>
          <Typography
  variant='p'
  ref={contentRef}
  sx={{ color: '#001619B2', fontSize: "20px", whiteSpace: 'pre-line' }}
  dangerouslySetInnerHTML={{
    __html: _LinkifyService(itemData.Car.Description || ''),
  }}
/>

          {isOverflowing && ( // Only show button if content is overflowing
            <Button
              variant='contained'
              sx={{
                position: "absolute",
                left: "50%",
                bottom: expanded ? '-40px' : '10px',
                transform: 'translateX(-50%)', // Center the button
                fontSize: isMobile ? '12px' : '14px', // Adjust button font size for mobile
                padding: isMobile ? '5px 10px' : '8px 16px', // Adjust padding for mobile
              }}
              onClick={handleToggleExpand}
            >
              {expanded ? 'ပိတ်ရန်' : 'ဆက်ဖတ်ရန်'}
            </Button>
          )}
        </Box>

        <DividerComponent />

        {/* Features Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: 'column',
            marginTop: '20px',
            gap: isMobile ? '10px' : '20px', // Adjust gap for mobile
            padding: isMobile ? '10px' : '20px', // Adjust padding for mobile
          }}
        >
          <Typography
            variant='p'
            sx={{
              fontWeight: "700",
              fontSize: isMobile ? "16px" : "20px", // Adjust font size for mobile
            }}
          >
            Features
          </Typography>
          <Box
            sx={{
              width: isMobile ? '100%' : '25%', // Full width for mobile
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <img
                src={AirConForCarIcon}
                style={{
                  width: isMobile ? '20px' : '30px', // Adjust image size for mobile
                  aspectRatio: '1/1',
                  marginRight: isMobile ? '10px' : '20px', // Adjust spacing for mobile
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant='p'
                  sx={{ fontSize: isMobile ? '12px' : '14px' }} // Adjust font size for mobile
                >
                  လေအေးပေးစနစ်
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>


      </Grid>
    </>
  );
};

export default UserCarDetailCard;
