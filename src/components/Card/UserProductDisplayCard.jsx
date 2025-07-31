import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import theme from "../../theme";
import BedIcon from "../../assets/icons/Bed.png";
import ShowerIcon from "../../assets/icons/Shower.png";
import widthIcon from "../../assets/icons/Width.png";
import LocationIcon from "../../assets/icons/Location.png";
import CallIcon from "../../assets/icons/InquaryCallIcon.png";
import EmailIcon from "../../assets/icons/EmailIconForProduct.png";
import waveSVG from "../../assets/images/wave.svg";
import PopularIcon from "../../assets/icons/PopularIcon.png";
import HotIcon from "../../assets/icons/HotIcon.png";
import { useTranslation } from "react-i18next";
import _LinkifyService from "../../service/LinkifyService";
import EainCard from "./EainCard";

const UserProductDisplayCard = ({ Data, Type, history }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { t } = useTranslation();


  console.log(Type)
  const safeData = Array.isArray(Data) ? Data : [Data];

  const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";
  const resourceEndpoint = isProduction
    ? process.env.REACT_APP_RESOURCE_ENDPOINT
    : process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;

  const handleDetail = (item) => {
    const propertyId = item.Property?.PropertyId;
    const carId = item.Car?.CarId;
    history.push(
      `/detail?${propertyId ? `PropertyId=${propertyId}` : `CarId=${carId}`}`
    );
    window.scrollTo(0, 0);
  };

  const renderPropertyCard = (item, index) => {
    const { Property = {}, Images = [] } = item;
    const {
      Code,
      Price,
      Title,
      Location,
      Description,
      Bedrooms,
      Bathrooms,
      Status,
      Area,
      Type,
      IsPopular,
      IsHotDeal,
      CreatedDate,
    } = Property;

    const imageUrl = Images[0]?.ImageName
      ? `${resourceEndpoint}${Images[0].CreatedBy}/Property/${Images[0].ImageName}`
      : null;

    return (
      <Box
        key={index}
        onClick={() => handleDetail(item)}
        sx={{
          position: "relative",
          backgroundColor: theme.palette.card.main,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: 3,
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.01)",
            boxShadow: 6,
            "& .wave": {
              transform: "translateY(0%)",
              opacity: 1,
            },
          },
        }}
      >
        <img
          src={imageUrl}
          alt="Property"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <Box p={2}>
          <Typography variant="h6" color="primary">
            {Price} သိန်း <small>(ညှိနှိုင်း)</small>
          </Typography>
          <Box display="flex" gap={1} mt={1}>
            <img src={BedIcon} alt="bed" width={20} />
            <span>{Bedrooms || 0}</span>
            <img src={ShowerIcon} alt="bath" width={20} />
            <span>{Bathrooms || 0}</span>
            <img src={widthIcon} alt="area" width={20} />
            <span>{Area}</span>
          </Box>
          <Box display="flex" gap={1} mt={1}>
            <Typography
              variant="caption"
              sx={{ background: "#EA625E33", p: "2px 6px", borderRadius: 1 }}
            >
              {Status}
            </Typography>
            <Typography
              variant="caption"
              sx={{ background: "#5B114433", p: "2px 6px", borderRadius: 1 }}
            >
              {Type}
            </Typography>
          </Box>
          <Box mt={1} display="flex" alignItems="center" gap={1}>
            <img src={LocationIcon} width={14} />
            <Typography variant="caption">{Location}</Typography>
          </Box>
          <Typography variant="subtitle2" sx={{ mt: 1, color: "#CC3A35" }}>
            <span className="CodeStyle">{Code}</span> {Title}
          </Typography>
          {/* <Typography variant="body2" sx={{ color: "#666", mt: 1 }}>
            <span
              dangerouslySetInnerHTML={{
                __html: _LinkifyService(
                  showFullDescription
                    ? Description
                    : Description?.slice(0, 100) + "..."
                ),
              }}
            />
          </Typography> */}
          <Button
            onClick={() => handleDetail(item)}
            sx={{ mt: 1, ml: -1, textTransform: "none", fontSize: "12px" }}
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </Button>
          <Typography
            variant="caption"
            display="block"
            sx={{ mt: 2, color: "#999" }}
          >
            ကြော်ငြာတင်သည့်နေ့: {CreatedDate}
          </Typography>
        </Box>
        {(IsPopular || IsHotDeal) && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              background: IsPopular
                ? "linear-gradient(10deg, rgba(172,37,130,1) 27%, rgba(70,15,53,1) 100%)"
                : "#FBB96F",
              padding: "4px 8px",
              color: "#fff",
              borderBottomRightRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <img
              src={IsPopular ? PopularIcon : HotIcon}
              width={14}
              height={14}
              alt="badge"
            />
            <span>{IsPopular ? "Popular" : "Hot Deal"}</span>
          </Box>
        )}
        <Box
          className="wave"
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100px",
            backgroundImage: `url(${waveSVG})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            transform: "translateY(100%)",
            transition: "transform 0.5s ease, opacity 0.5s ease",
            opacity: 0,
            zIndex: 0,
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        />
      </Box>
    );
  };

  const renderCarCard = (item, index) => {
  const { Car = {}, Images = [] } = item;
  const {
    Code,
    Price,
    Title,
    Location,
    EnginePower,
    FuelType,
    Mileage,
    SteeringPosition,
    IsPopular,
    IsHotDeal,
    CreatedDate,
  } = Car;

  const imageUrl = Images[0]?.ImageName
    ? `${resourceEndpoint}${Images[0].CreatedBy}/Car/${Images[0].ImageName}`
    : null;

  return (
    <Box
      key={index}
      onClick={() => handleDetail(item)}
      sx={{
        position: "relative",
        backgroundColor: theme.palette.card.main,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: 3,
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: 6,
          "& .wave": {
            transform: "translateY(0%)",
            opacity: 1,
          },
        },
      }}
    >
      <img
        src={imageUrl}
        alt="Car"
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <Box p={2}>
        <Typography variant="h6" color="primary">
          {Price} သိန်း <small>(ညှိနှိုင်း)</small>
        </Typography>
        <Box display="flex" gap={1} mt={1}>
          <Typography variant="body2">{EnginePower} cc</Typography>
          <Typography variant="body2">{FuelType}</Typography>
          <Typography variant="body2">{Mileage} km</Typography>
        </Box>
        <Box display="flex" gap={1} mt={1}>
          <Typography
            variant="caption"
            sx={{ background: "#5B114433", p: "2px 6px", borderRadius: 1 }}
          >
            {SteeringPosition}
          </Typography>
        </Box>
        <Box mt={1} display="flex" alignItems="center" gap={1}>
          <img src={LocationIcon} width={14} />
          <Typography variant="caption">{Location}</Typography>
        </Box>
        <Typography variant="subtitle2" sx={{ mt: 1, color: "#CC3A35" }}>
          <span className="CodeStyle">{Code}</span> {Title}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 2, color: "#999" }}
        >
          ကြော်ငြာတင်သည့်နေ့: {CreatedDate}
        </Typography>
      </Box>
      {(IsPopular || IsHotDeal) && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            background: IsPopular
              ? "linear-gradient(10deg, rgba(172,37,130,1) 27%, rgba(70,15,53,1) 100%)"
              : "#FBB96F",
            padding: "4px 8px",
            color: "#fff",
            borderBottomRightRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <img
            src={IsPopular ? PopularIcon : HotIcon}
            width={14}
            height={14}
            alt="badge"
          />
          <span>{IsPopular ? "Popular" : "Hot Deal"}</span>
        </Box>
      )}
      <Box
        className="wave"
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100px",
          backgroundImage: `url(${waveSVG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transform: "translateY(100%)",
          transition: "transform 0.5s ease, opacity 0.5s ease",
          opacity: 0,
          zIndex: 0,
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      />
    </Box>
  );
};


  return (
    <Grid
      container
      spacing={3}
      justifyContent={safeData.length === 1 ? "center" : "flex-start"}
      alignItems="flex-start"
      sx={{
        mt:
          safeData.length === 1
            ? {
                xs: 0,
                sm: 0,
                md: -2,
                lg: -50,
              }
            : 0, // Normal margin for multi-card layout
        px: 2,
        mb: 2,
      }}
    >
      {safeData.length === 0 ? ( 
        <Typography>No data available</Typography>
      ) : (
        safeData.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={safeData.length === 1 ? 12 : 6}
            md={safeData.length === 1 ? 12 : 4}
            key={index}
            sx={{
              display: "flex",
              justifyContent: safeData.length === 1 ? "center" : "flex-start",
            }}
          >
            <Box
              sx={{
                width: safeData.length === 1 ? "100%" : "100%",
                maxWidth: 400,
              }}
            >
               <EainCard  data={item} isPopular={item.IsPopular} history={history} Type={Type}/>
           
            </Box>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default UserProductDisplayCard;
