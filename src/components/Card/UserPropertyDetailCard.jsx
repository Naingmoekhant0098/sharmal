import React, { useState, useEffect, useRef } from 'react';
import { Grid, IconButton, useMediaQuery, Box, Button, Typography } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import Location from '../../assets/icons/Location.png';
import Announcement from '../../assets/icons/Announcement.png';
import PropertyType from '../../assets/icons/PropertyType.png';
import Floor from '../../assets/icons/Floor.png';
import payment from '../../assets/icons/Payment.png';
import BedIcon from '../../assets/icons/Bed.png';
import ShowerIcon from '../../assets/icons/Shower.png';
import widthIcon from '../../assets/icons/Width.png';
import PropertyCondition from '../../assets/icons/PropertyCondition.png';
import DividerComponent from './../Divider/DividerComponent';
import FurnishIcon from '../../assets/icons/FurnishedIcon.png'
import BalconyIcon from '../../assets/icons/BalconyIcon.png'
import SwimmingPoolIcon from '../../assets/icons/SwimmingPoolIcon.png'
import CarParkingIcon from '../../assets/icons/CarParkingIcon.png'
import GymIcon from '../../assets/icons/GymIcon.png'
import _LinkifyService from '../../service/LinkifyService';

const UserPropertyDetailCard = ({ itemData }) => {
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
        (image) => `${resourceEndpoint}${image.CreatedBy}/Property/${image.ImageName}`
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
  }, [itemData.Property.Description]);

  const getPaymentOptionValue = (paymentOption) =>
    paymentOption === "Bank Installment" ? 'Yes' : 'No';

  const propertyDetails = [
    { icon: Announcement, label: 'ကြော်ငြာနံပါတ်', value: itemData.Property.Code },
    { icon: PropertyType, label: 'အမျိုးအစား', value: itemData?.Property?.Type || 'N/A' },
    { icon: Floor, label: 'အလွှာ', value: itemData?.Property?.Floor || 'N/A' },
    { icon: payment, label: 'ဘဏ်အရစ်ကျ', value: getPaymentOptionValue(itemData?.Property?.PaymentOption) },
    { icon: BedIcon, label: 'အိပ်ခန်း', value: itemData?.Property?.Bedrooms || 'N/A' },
    { icon: ShowerIcon, label: 'ရေချိုးခန်း', value: itemData?.Property?.Bathrooms || 'N/A' },
    { icon: widthIcon, label: 'ဧရိယာ', value: itemData?.Property?.Area || 'N/A' },
    { icon: PropertyCondition, label: 'အခြေအနေ', value: itemData?.Property?.Condition || 'N/A' }
  ];

  const featureMapping = {
    Balcony: {
      icon: BalconyIcon,
      text: 'ဝရန်တာ',
    },
    'Swimming Pool': {
      icon: SwimmingPoolIcon,
      text: 'ရေကူးကန်',
    },
    'Car Parking': {
      icon: CarParkingIcon,
      text: 'ကားပါကင်',
    },
    Gym: {
      icon: GymIcon,
      text: 'Gym',
    },
  };

  const featuresToDisplay = itemData.PropertyFeatures.filter(feature => featureMapping[feature.FeatureName]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (images.length === 0) {
    return <div>Loading images...</div>;
  }

  return (
    <>
      <Grid
        item
        xs={12}
        md={8}
        style={{
          display: 'flex',
          padding: isMobile ? '0 16px' : '0 62px',
          flexDirection: 'column',
          marginLeft: isMobile ? '10px' : '20px',
          position: 'relative'
        }}
      >
        {/* Large image */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: isMobile ? 'auto' : '612px',
            overflow: 'hidden'
          }}
        >
          <img
            src={images[currentImageIndex]}
            alt="Selected"
            style={{
              width: '100%',
              height: isMobile ? 'auto' : '100%',
              objectFit: 'cover'
            }}
          />
          {!isMobile && (
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                fontSize: '2rem',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%'
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          )}
        </Box>

        {/* Thumbnail images below the large image */}
        <Grid container spacing={2} style={{ justifyContent: 'center', marginTop: '5px' }}>
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

        {/* Extra info */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '30px',
            gap: '5px',
            width: '100%',
            justifyContent: 'space-between',
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '5px',
              flexDirection: 'row',
              flexWrap: isMobile ? 'wrap' : 'nowrap'
            }}
          >
            <Typography
              variant='p'
              sx={{
                display: 'block',
                color: '#EA625E',
                fontSize: '8px',
                backgroundColor: "#EA625E33",
                padding: isMobile ? '3px 6px' : '5px 10px',
                margin: 'auto 0'
              }}
            >
              {itemData.Property.Status}
            </Typography>
            <Typography
              variant='p'
              sx={{
                display: 'block',
                color: '#5B1144',
                fontSize: '8px',
                backgroundColor: "#5B114433",
                padding: isMobile ? '3px 6px' : '5px 10px',
                margin: 'auto 0'
              }}
            >
              {itemData.Property.Type}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant='p'
              sx={{
                fontSize: '10px',
                color: '#C30000',
                marginTop: isMobile ? '10px' : '40px'
              }}
            >
              {`ကြော်ငြာတင်သည့်နေ့: ${itemData.Property.CreatedDate}`}
            </Typography>
          </Box>
        </Box>

        {/* Price */}
        <Box
          className="Price"
          sx={{
            display: 'flex',
            justifyContent: 'left',
            gap: "5px",
            alignItems: 'flex-end',
            marginTop: '30px'
          }}
        >
          <Typography
            variant='p'
            sx={{ fontSize: '40px', fontWeight: '500' }}
          >
            {itemData.Property.Price}
          </Typography>
          <Typography variant='p'>
            သိန်း
          </Typography>
          <Typography
            variant='p'
            sx={{ color: '#B1630B', fontSize: '12px', marginTop: '10px' }}
          >
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
    width: 'auto',
    height: 'auto',
    fontSize: '30px',
    fontWeight: "700",
    marginBottom: '10px'
  }}
  dangerouslySetInnerHTML={{
    __html: _LinkifyService(itemData.Property.Title || ''),
  }}
/>


        {/* Location */}
        <Box
          className="Location"
          sx={{
            display: 'flex',
            justifyContent:
              'left',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '5px'
          }}
        >
          <img src={Location} style={{ width: '11px', height: '15px' }} />
          <Typography variant='p' sx={{ fontSize: '14px', color: '#001619B2' }}>
            {itemData.Property.Location}
          </Typography>
        </Box>

        {/* Overview */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: '20px',
            border: "1px solid #5B113233",
            borderRadius: "20px",
            boxShadow: !isMobile ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none'
          }}
        >
          <Typography variant='p' sx={{ fontWeight: "700", fontSize: "20px" }}>
            Overview
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ marginTop: '20px' }}
          >
            {propertyDetails.map((detail, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <img
                    src={detail.icon}
                    alt={detail.label}
                    style={{ width: isMobile ? '15px' : '60px', aspectRatio: '1/1', marginRight: '20px' }}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='p' sx={{ fontSize: '10px' }}>{detail.label}</Typography>
                    <Typography variant='p' sx={{ color: "#5B1144", fontWeight: "500" }}>{detail.value}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>


        {/* Description */}
        <Box
          sx={{
            display: "flex",
            flexDirection: 'column',
            marginTop: '20px',
            position: "relative",
            maxHeight: expanded ? 'none' : '300px',
            overflow: expanded ? 'visible' : 'hidden',
            transition: 'max-height 0.3s ease',
            '&::before': !expanded && isOverflowing && {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50px',
              background: 'linear-gradient(transparent, white)',
            },
          }}
        >
          <Typography variant='p' sx={{ fontWeight: "700", fontSize: "20px" }}>
            Description
          </Typography>
          <Typography
  variant='p'
  ref={contentRef}
  sx={{ color: '#001619B2', fontSize: "20px", whiteSpace: 'pre-line' }}
  dangerouslySetInnerHTML={{
    __html: _LinkifyService(itemData.Property.Description || ''),
  }}
/>


          {isOverflowing && (
            <Button
              variant='contained'
              sx={{ position: "absolute", left: "45%", bottom: expanded ? '-40px' : '20px' }}
              onClick={handleToggleExpand}
            >
              {expanded ? 'ပိတ်ရန်' : 'ဆက်ဖတ်ရန်'}
            </Button>
          )}
        </Box>

        <DividerComponent />

        {/* Feature */}
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
          <Typography variant='p' sx={{ fontWeight: "700", fontSize: "20px" }}>Features</Typography>
          <Grid container spacing={2} sx={{ marginTop: '20px' }}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img
                  src={FurnishIcon}
                  style={{ width: isMobile ? '15px' : '60px', aspectRatio: '1/1', marginRight: '20px' }}
                  alt="Furnished"
                />
                <Typography variant='p' sx={{ color: "#5B1144", fontWeight: "500" }}>{itemData.Property.Furnished}</Typography>
              </Box>
            </Grid>

            {/* Render Features */}
            {featuresToDisplay.map(feature => {
              const { icon, text } = featureMapping[feature.FeatureName];
              return (
                <Grid item xs={6} sm={3} key={feature.FeatureId}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img
                      src={icon}
                      style={{ width: isMobile ? '15px' : '60px', aspectRatio: '1/1', marginRight: '10px' }}
                      alt={feature.FeatureName}
                    />
                    <Typography variant='p' sx={{ color: "#5B1144", fontWeight: "500" }}>
                      {text}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>


        {/* Map */}
        {itemData.Property.MapUrl && (
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
            <Typography variant='p' sx={{ fontWeight: "700", fontSize: "20px" }}>Map</Typography>
            <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
              <iframe
                src={itemData.Property.MapUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
                tabIndex="0"
                title="Google Map"
              />
            </div>
          </Box>
        )}
      </Grid>
    </>

  );
};

export default UserPropertyDetailCard;
