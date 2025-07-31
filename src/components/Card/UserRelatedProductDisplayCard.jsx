import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import HotDeal from '../../assets/images/simpleForHotDealProperty.png';
import Location from '../../assets/icons/Location.png';
import BedIcon from '../../assets/icons/Bed.png';
import ShowerIcon from '../../assets/icons/Shower.png';
import widthIcon from '../../assets/icons/Width.png';
import PopularIcon from '../../assets/icons/PopularIcon.png'
import StreeringPositionIcon from '../../assets/icons/SteeringPositionIcon.png'
import FuelTypeIcon from '../../assets/icons/FuelTypeIcon.png'
import EnginPowerIcon from '../../assets/icons/EnginPowerIcon.png'
import MileageIcon from '../../assets/icons/MileageIcon.png'
import HotIcon from '../../assets/icons/HotIcon.png';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const UserRelatedProductDisplayCard = ({ Title, Data = [], Type, history, pageNo, setpageNo, setIsLoading }) => {
  const [CommingData, setCommingData] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
  const resourceEndpoint = isProduction
  ? process.env.REACT_APP_RESOURCE_ENDPOINT
  : process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;

  const handleNext = () => {
    setpageNo(pageNo + 1);
    setIsLoading(true)
  };

  const handleBack = () => {
    setpageNo(pageNo - 1);
    setIsLoading(true)

  };

  useEffect(() => {
    // If Data is available and is an array, set it to state
    if (Array.isArray(Data)) {
      setCommingData(Data);
    }
  }, [Data]);

  if (CommingData.length === 0) {
    return (
      <></>
    );
  }

  const handleDetail = (item) => {
    history.push(`/`)    
    const delay = 10;
    const Property = item.Property ? item.Property.PropertyId : null;
    const Car = item.Car ? item.Car.CarId : null;
    setTimeout(() => {
      Property !== null ? 
    history.push(`/detail?PropertyId=${Property}`) :
    history.push(`/detail?CarId=${Car}`)
    }, delay);
    window.scrollTo(0, 0);
  }
  return (
    <Box sx={{ display: 'flex', position: "relative", flexDirection: 'column', margin: 0, width: { xl: '100%' } }}>
      <Typography
        variant='p'
        className='UserPageTitleStyle'
        sx={{
          paddingLeft: { xs: '20px', md: '95px' }, // Adjust padding for mobile
          marginBottom: '20px',
          marginTop: '20px',
          textAlign: { xs: 'center', md: 'left' } // Center title on mobile
        }}
      >
        {Title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: { xs: '20px', md: '5%' }, // Reduce gap on mobile
          justifyContent: { sm: 'flex-start', md: 'flex-start' }, // Left-align on mobile
          overflowX: 'auto', // Allow horizontal scrolling
          scrollSnapType: 'x mandatory', // Enable snap scrolling
          width: "100%",
          justifyContent: isMobile ? 'flex-start' : 'center',
          alignItems: isMobile ? 'flex-start' : 'center',
        }}
      >
        {CommingData.map((item, index) => {
          let content = {};
          let imageUrl = HotDeal;

          if (Type === 'Property') {
            content = item.Property || {};
            imageUrl = item.Images[0]?.ImageName
              ? `${resourceEndpoint}${item.Images[0].CreatedBy}/Property/${item.Images[0].ImageName}`
              : HotDeal;
          } else if (Type === 'Car') {
            content = item.Car || {};
            imageUrl = item.Images[0]?.ImageName
              ? `${resourceEndpoint}${item.Images[0].CreatedBy}/Car/${item.Images[0].ImageName}`
              : HotDeal;
          }
          return (
            <Box
              key={index}
              onClick={() => handleDetail(item)}
              sx={{
                position: "relative",
                backgroundColor: '#FFFFFF',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '20px',
                padding: '10px 0',
                marginBottom: '20px',
                flexShrink: 0,
                scrollSnapAlign: 'start',
                boxShadow: '14px 15px 19px -14px rgba(194,187,192,1)',
                '&:hover': {
                  transform: 'scale(1.01)', // Scale the Box on hover to create a pop effect
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Add a shadow to enhance the effect
                }
              }}
            >
              <img
                src={imageUrl}
                alt={item.Images[0]?.ImageName ? `Image of ${Type.toLowerCase()}` : 'Image not available'}
                style={{ width: '260px', height: '260px', marginBottom: '10px' }}
              />

              <Box sx={{ padding: '10px', width: '80%' }}>
                <Typography
                  variant='p'
                  sx={{
                    display: 'block',
                    textAlign: 'left',
                    whiteSpace: 'wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: '#CC3A35',
                    height: Type === 'Property' ? '53px' : '25px',
                    fontSize: '14px'
                  }}
                >
                  <span className='CodeStyle'>{content.Code}</span>
                  {content.Title || 'Property Title'}
                </Typography>

                <Box
                  className="Location"
                  sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '5px',
                    marginBottom: '5px'
                  }}
                >
                  <img src={Location} style={{ width: '11px', height: '15px' }} />
                  <Typography variant='p' sx={{ fontSize: '10px', color: '#001619B2' }}>
                    {content.Location || 'Property Location'}
                  </Typography>
                </Box>

                {Type === 'Property' ?
                  <Box className="Feature" sx={{ display: 'flex', gap: '5px' }}>
                    {content.Type && (
                      <Box
                        sx={{
                          backgroundColor: "#5B114433",
                          display: 'inline-flex',
                          padding: '3px 5px',
                          textAlign: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: content.Type ? 1 : 0.5, // Adjust opacity based on data presence
                          pointerEvents: content.Type ? 'auto' : 'none' // Disable interactions if no data
                        }}
                      >
                        <Typography variant='p' sx={{ color: '#5B1144', fontSize: '6px', fontWeight: 'bold' }}>
                          {content.Type}
                        </Typography>
                      </Box>
                    )}
                    {content.Status && (
                      <Box
                        sx={{
                          backgroundColor: "#5B114433",
                          display: 'inline-flex',
                          padding: '3px 5px',
                          textAlign: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: content.Status ? 1 : 0.5, // Adjust opacity based on data presence
                          pointerEvents: content.Status ? 'auto' : 'none' // Disable interactions if no data
                        }}
                      >
                        <Typography variant='p' sx={{ color: '#5B1144', fontSize: '6px', fontWeight: 'bold' }}>
                          {content.Status}
                        </Typography>
                      </Box>
                    )}
                    {content.Location && (
                      <Box
                        sx={{
                          backgroundColor: "#5B114433",
                          display: 'inline-flex',
                          padding: '3px 5px',
                          textAlign: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: content.Location ? 1 : 0.5, // Adjust opacity based on data presence
                          pointerEvents: content.Location ? 'auto' : 'none' // Disable interactions if no data
                        }}
                      >
                        <Typography variant='p' sx={{ color: '#5B1144', fontSize: '6px', fontWeight: 'bold' }}>
                          {content.Location}
                        </Typography>
                      </Box>
                    )}
                    {content.City && (
                      <Box
                        sx={{
                          backgroundColor: "#5B114433",
                          display: 'inline-flex',
                          padding: '3px 5px',
                          textAlign: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: content.City ? 1 : 0.5, // Adjust opacity based on data presence
                          pointerEvents: content.City ? 'auto' : 'none' // Disable interactions if no data
                        }}
                      >
                        <Typography variant='p' sx={{ color: '#5B1144', fontSize: '6px', fontWeight: 'bold' }}>
                          {content.City}
                        </Typography>
                      </Box>
                    )}
                  </Box> :
                  <Box className="Feature" sx={{ display: 'flex', gap: '5px' }}>
                    {content.Condition && (
                      <Box
                        sx={{
                          backgroundColor: "#EA625E33",
                          display: 'inline-flex',
                          padding: '3px 5px',
                          textAlign: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: content.Condition ? 1 : 0.5, // Adjust opacity based on data presence
                          pointerEvents: content.Condition ? 'auto' : 'none' // Disable interactions if no data
                        }}
                      >
                        <Typography variant='p' sx={{ color: '#EA625E', fontSize: '6px', fontWeight: 'bold' }}>
                          {content.Condition === "Brand New" ? "Brand New" : "Used"}
                        </Typography>
                      </Box>
                    )}
                    {content.Manufacturer && (
                      <Box
                        sx={{
                          backgroundColor: "#5B114433",
                          display: 'inline-flex',
                          padding: '3px 5px',
                          textAlign: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: content.Manufacturer ? 1 : 0.5, // Adjust opacity based on data presence
                          pointerEvents: content.Manufacturer ? 'auto' : 'none' // Disable interactions if no data
                        }}
                      >
                        <Typography variant='p' sx={{ color: '#5B1144', fontSize: '6px', fontWeight: 'bold' }}>
                          {content.Manufacturer}
                        </Typography>
                      </Box>
                    )}
                    {content.PlateDivision && (
                      <Box
                        sx={{
                          backgroundColor: "#5B114433",
                          display: 'inline-flex',
                          padding: '3px 5px',
                          textAlign: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: content.PlateDivision ? 1 : 0.5, // Adjust opacity based on data presence
                          pointerEvents: content.PlateDivision ? 'auto' : 'none' // Disable interactions if no data
                        }}
                      >
                        <Typography variant='p' sx={{ color: '#5B1144', fontSize: '6px', fontWeight: 'bold' }}>
                          {content.PlateDivision}
                        </Typography>
                      </Box>
                    )}
                    {content.PlateColor && (
                      <Box
                        sx={{
                          backgroundColor: "#5B114433",
                          display: 'inline-flex',
                          padding: '3px 5px',
                          textAlign: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: content.PlateColor ? 1 : 0.5, // Adjust opacity based on data presence
                          pointerEvents: content.PlateColor ? 'auto' : 'none' // Disable interactions if no data
                        }}
                      >
                        <Typography variant='p' sx={{ color: '#5B1144', fontSize: '6px', fontWeight: 'bold' }}>
                          {content.PlateColor}
                        </Typography>
                      </Box>
                    )}


                  </Box>
                }


                {Type === 'Property' ?
                  <Box
                    className="Property"
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: 'start',
                      alignItems: "center",
                      gap: '10px',
                      borderBottom: '1px solid #C2C2C2',
                      paddingBottom: '7px'
                    }}
                  >

                    <Box className="bed">
                      <img src={BedIcon} alt="" style={{ width: '18px', height: '18px' }} />
                      <Typography variant='p' sx={{ fontSize: '13px', marginLeft: '4px' }}>
                        {content.Bedrooms || 'N/A'}
                      </Typography>
                    </Box>


                    <Box className="shower">
                      <img src={ShowerIcon} alt="" style={{ width: '18px', height: '18px' }} />
                      <Typography variant='p' sx={{ fontSize: '13px', marginLeft: '4px' }}>
                        {content.Bathrooms || 'N/A'}
                      </Typography>
                    </Box>
                    <Box className="width">
                      <img src={widthIcon} alt="" style={{ width: '18px', height: '18px' }} />
                      <Typography variant='p' sx={{ fontSize: '13px', marginLeft: '4px' }}>
                        {content.Area || 'N/A'}
                      </Typography>
                    </Box>
                  </Box> :
                  <Box
                    className="Property"
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: 'column',
                      justifyContent: 'start',
                      alignItems: "center",
                      borderBottom: '1px solid #C2C2C2',
                      paddingBottom: '7px',
                    }}
                  >
                    {/* First Row */}
                    <Box
                      sx={{
                        width: '200px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box className="SteeringPosition" sx={{ display: 'flex', alignItems: 'center', flexBasis: '50%' }}>
                        <img src={StreeringPositionIcon} alt="" style={{ width: '18px', height: '18px' }} />
                        <Typography variant='p' sx={{ fontSize: '13px', marginLeft: '4px' }}>
                          {content.SteeringPosition === "LeftHandDrive" ? "ဘယ်မောင်း"  : "ညာမောင်း" || 'N/A'}
                        </Typography>
                      </Box>
                      <Box className="FuelType" sx={{ display: 'flex', alignItems: 'center', flexBasis: '50%' }}>
                        <img src={FuelTypeIcon} alt="" style={{ width: '18px', height: '18px' }} />
                        <Typography variant='p' sx={{ fontSize: '13px', marginLeft: '4px' }}>
                          {content.FuelType || 'N/A'}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Second Row */}
                    <Box
                      sx={{
                        width: '200px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box className="EnginePower" sx={{ display: 'flex', alignItems: 'center', flexBasis: '50%' }}>
                        <img src={EnginPowerIcon} alt="" style={{ width: '18px', height: '18px' }} />
                        <Typography variant='p' sx={{ fontSize: '13px', marginLeft: '4px' }}>
                          {`${content.EnginePower}` || 'N/A'}
                        </Typography>
                      </Box>
                      <Box className="Mileage" sx={{ display: 'flex', alignItems: 'center', flexBasis: '50%' }}>
                        <img src={MileageIcon} alt="" style={{ width: '18px', height: '18px' }} />
                        <Typography variant='p' sx={{ fontSize: '10px', marginLeft: '4px' }}>
                          {`${content.Mileage}km` || 'N/A'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                }


                <Box
                  className="Price"
                  sx={{ display: 'flex', justifyContent: 'left', gap: "5px", marginY: '10px' }}
                >
                  <Typography variant='p' sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {content.Price || 'N/A'}
                  </Typography>
                  <Typography variant='p'>သိန်း</Typography>
                  <Typography variant='p' sx={{ color: '#B1630B', fontSize: '12px', marginTop: '10px' }}>
                    (ညှိနှိုင်း)
                  </Typography>
                </Box>
              </Box>

              {content.IsHotDeal !== false || content.IsPopular !== false ? (
                <Box sx={{ position: 'absolute', top: '50%', left: '-10px' }}>
                  <Box
                    sx={{
                      width: '100px',
                      paddingY: '5px',
                      top: '0',
                      left: '0',
                      position: 'absolute',
                      backgroundColor: content.IsPopular === true ? 'rgba(172,37,130,1)' : '#FBB96F',
                      background: content.IsPopular === true
                        ? 'linear-gradient(10deg, rgba(172,37,130,1) 27%, rgba(70,15,53,1) 100%)'
                        : '#FBB96F',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '10px 10px 10px 0',
                      gap: "4px"
                    }}
                  >
                    <img src={content.IsPopular === true ? PopularIcon : HotIcon} alt="" style={{ width: '14px', height: '14px' }} />
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: "14px", color: "#FFFFFF" }}>
                      {content.IsPopular === true ? 'Popular' : 'Hot Deal'}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -38,
                      left: 0,
                      width: 0,
                      height: 0,
                      borderStyle: 'solid',
                      borderWidth: '0 10px 10px 0',
                      borderColor: content.IsPopular === true
                        ? 'transparent #5b1144 transparent transparent'
                        : 'transparent #EA625E transparent transparent',
                      transform: 'rotate(0deg)',
                    }}
                  />
                </Box>
              ) : null}
            </Box>
          );
        })}
      </Box>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: '1px',
          top: '50%',
          fontSize: '2rem',
          color: 'white', // Adjust color if needed
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: add background for better visibility
          borderRadius: '50%', // Optional: make button round
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Same as normal background
            color: 'white', // Keep the same color on hover
          },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
      {pageNo > 1 && (
        <IconButton
          onClick={handleBack}
          sx={{
            position: 'absolute',
            left: '1px',
            top: '50%',
            fontSize: '2rem',
            color: 'white', // Adjust color if needed
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: add background for better visibility
            borderRadius: '50%', // Optional: make button round
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Same as normal background
              color: 'white', // Keep the same color on hover
            },
          }}
        >
          <ArrowBackIos />
        </IconButton>
      )}
    </Box>
  );
};

export default UserRelatedProductDisplayCard;
