import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import HotDeal from "../../assets/images/simpleForHotDealProperty.png";
import Location from "../../assets/icons/Location.png";
import BedIcon from "../../assets/icons/Bed.png";
import ShowerIcon from "../../assets/icons/Shower.png";
import widthIcon from "../../assets/icons/Width.png";
import HotIcon from "../../assets/icons/HotIcon.png";
import PopularIcon from "../../assets/icons/PopularIcon.png";
import SteeringPositionIcon from "../../assets/icons/SteeringPositionIcon.png";
import FuelTypeIcon from "../../assets/icons/FuelTypeIcon.png";
import EnginPowerIcon from "../../assets/icons/EnginPowerIcon.png";
import MileageIcon from "../../assets/icons/MileageIcon.png";
import theme from "../../theme";
import SteeringPositionDisplay from "./information/SteeringPositionDisplay";
import waveSVG from "../../assets/images/wave.svg";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
const UserPopularHotDealCard = ({
  Title,
  Data = [],
  Type,
  history,
  isPopular,
}) => {
  const [CommingData, setCommingData] = useState([]);
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery("(max-width:600px)");
  const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";
  const resourceEndpoint = isProduction
    ? process.env.REACT_APP_RESOURCE_ENDPOINT
    : process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  useEffect(() => {
    if (Array.isArray(Data)) {
      setCommingData(Data);
    }
  }, [Data]);

  if (CommingData.length === 0) {
    return <></>;
  }

  const handleDetail = (item) => {
    const Property = item.Property ? item.Property.PropertyId : null;
    const Car = item.Car ? item.Car.CarId : null;
    Property !== null
      ? history.push(`/detail?PropertyId=${Property}`)
      : history.push(`/detail?CarId=${Car}`);
    window.scrollTo(0, 0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // ✅ center the whole block when zoomed out
        width: "100%",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1420px", // ✅ limit content width
        }}
      >
        <Typography
          variant="p"
          className="UserPageTitleStyle"
          sx={{
            paddingLeft: { xs: "16px", md: "0px", xl: "0px" }, // ✅ Left-align title
            marginBottom: "30px",
            marginTop: "20px",
            fontSize: { xs: "15px", md: "20px", xl: "24px" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {Title}
        </Typography>

        {/* Scrollable Card List */}
        {isMobile ? (
          <Box sx={{ position: "relative", mt: 2 }}>
            {/* Left Arrow */}
            <IconButton
              size="large"
              onClick={scrollLeft}
              sx={{
                position: "absolute",
                top: "45%",
                left: 0,
                zIndex: 2,
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#fff", // Keep white on hover
                },
                "&:active": {
                  backgroundColor: "#fff", // Keep white when clicked
                },
                "&:focus": {
                  backgroundColor: "#fff", // Keep white on focus
                },
              }}
            >
              <ArrowBackIos />
            </IconButton>

            {/* Scrollable Card Container */}
            <Box
              ref={scrollRef}
              sx={{
                display: "flex",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                gap: 2,
                px: 5,
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {CommingData.map((item, index) => {
                let content = {};
                let imageUrl = HotDeal;

                if (Type === "Property") {
                  content = item.Property || {};
                  imageUrl = item.Images[0]?.ImageName
                    ? `${resourceEndpoint}${item.Images[0].CreatedBy}/Property/${item.Images[0].ImageName}`
                    : HotDeal;
                } else if (Type === "Car") {
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
                      scrollSnapAlign: "start",
                      flexShrink: 0,
                      position: "relative",
                      backgroundColor: '#f6eef6', 
                      height: isMobile ? "300px" : "400px",
                      width: {
                        xs: "100%",
                        sm: "250px",
                        md: "280px",
                        lg: "300px",
                      }, // Responsive widths
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "20px",
                      padding: "10px 0",
                      marginBottom: "20px",
                      overflowX: "hidden",
                      overflowY: "hidden",
                      boxShadow: "14px 15px 19px -14px rgba(194,187,192,1)",
                      transition: "transform 0.4s ease, box-shadow 0.4s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.3)",
                        "& .wave": {
                          transform: "translateY(0%)",
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={
                        item.Images[0]?.ImageName
                          ? `Image of ${Type.toLowerCase()}`
                          : "Image not available"
                      }
                      style={{
                        width: "95%",
                        height: isMobile ? "180px" : "260px",
                        marginBottom: "10px",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                      className="card-image"
                    />
                    <Box sx={{ padding: "10px", width: "80%" }}>
                      <Typography
                        variant="p"
                        sx={{
                          display: "block",
                          textAlign: "left",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "#CC3A35",
                          height: Type === "Property" ? "25px" : "25px",
                          fontSize: "14px",
                          marginBottom: "10px",
                        }}
                      >
                        <span className="CodeStyle">{content.Code}</span>
                        {content.Title || "Property Title"}
                      </Typography>

                      <Box
                        className="Location"
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                          gap: "10px",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        <img
                          src={Location}
                          style={{ width: "11px", height: "15px" }}
                        />
                        <Typography
                          variant="p"
                          sx={{ fontSize: "10px", color: "#001619B2" }}
                        >
                          {content.Location || "Property Location"}
                        </Typography>
                      </Box>
                      {/* Badge pr  */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: { xs: "38%", sm: "50%" },
                          right: { xs: "10px", sm: "-5px" },
                          zIndex: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: "100px",
                            paddingY: "5px",
                            top: "5px",
                            right: "-13px",
                            position: "absolute",
                            background: isPopular
                              ? "linear-gradient(10deg, rgba(172,37,130,1) 27%, rgba(70,15,53,1) 100%)"
                              : "#FBB96F",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "10px 10px 10px 0",
                            gap: "4px",
                          }}
                        >
                          <img
                            src={isPopular ? PopularIcon : HotIcon}
                            alt=""
                            style={{ width: "14px", height: "14px" }}
                          />
                          <Typography
                            variant="p"
                            sx={{
                              fontWeight: "bold",
                              fontSize: "14px",
                              color: isPopular ? "#FFFFFF" : "#C30000",
                            }}
                          >
                            {isPopular ? "POPULAR" : "HOT DEAL"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: -38,
                            left: 0,
                            width: 0,
                            height: 0,
                            borderStyle: "solid",
                            borderWidth: "0 10px 10px 0",
                            borderColor: isPopular
                              ? "transparent #5b1144 transparent transparent"
                              : "transparent #EA625E transparent transparent",
                            transform: "rotate(0deg)",
                          }}
                        />
                      </Box>
                      {/* wave svg */}

                    </Box>
                  </Box>
                );
              })}
            </Box>
            {/* Right Arrow */}
            <IconButton
              size='large'
              onClick={scrollRight}
              sx={{
                position: "absolute",
                top: "45%",
                right: 0,
                zIndex: 2,
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#fff",
                },
                "&:active": {
                  backgroundColor: "#fff",
                },
                "&:focus": {
                  backgroundColor: "#fff",
                },
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{ width: "100%", paddingX: { xs: 2, md: 4 } }}
          >
            {CommingData.map((item, index) => {
              let content = {};
              let imageUrl = HotDeal;

              if (Type === "Property") {
                content = item.Property || {};
                imageUrl = item.Images[0]?.ImageName
                  ? `${resourceEndpoint}${item.Images[0].CreatedBy}/Property/${item.Images[0].ImageName}`
                  : HotDeal;
              } else if (Type === "Car") {
                content = item.Car || {};
                imageUrl = item.Images[0]?.ImageName
                  ? `${resourceEndpoint}${item.Images[0].CreatedBy}/Car/${item.Images[0].ImageName}`
                  : HotDeal;
              }

              return (
                <Grid item xs={6} md={4} lg={3} key={index}>
                  {/* if it's mobile show with caurosel with left and right arrow icons */}

                  <Box
                    key={index}
                    onClick={() => handleDetail(item)}
                    sx={{
                      position: "relative",
                      backgroundColor: "#f6eef6",
                      width: {
                        xs: "100%",
                        sm: "250px",
                        md: "280px",
                        lg: "300px",
                      }, // Responsive widths
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "20px",
                      padding: "10px 0",
                      marginBottom: "20px",
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                      overflowX: "visible",
                      overflowY: "hidden",
                      boxShadow: "14px 15px 19px -14px rgba(194,187,192,1)",
                      transition: "transform 0.4s ease, box-shadow 0.4s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.3)",
                        "& .wave": {
                          transform: "translateY(0%)",
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={
                        item.Images[0]?.ImageName
                          ? `Image of ${Type.toLowerCase()}`
                          : "Image not available"
                      }
                      style={{
                        width: "85%",
                        height: isMobile ? "180px" : "260px",
                        marginBottom: "10px",
                        borderRadius: "20px",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                      className="card-image"
                    />
                    <Box sx={{ padding: "10px", width: "80%" }}>
                      <Typography
                        variant="p"
                        sx={{
                          display: "block",
                          textAlign: "left",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "#CC3A35",
                          height: Type === "Property" ? "25px" : "25px",
                          fontSize: "14px",
                          marginBottom: "10px",
                        }}
                      >
                        <span className="CodeStyle">{content.Code}</span>
                        {content.Title || "Property Title"}
                      </Typography>

                      <Box
                        className="Location"
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                          gap: "10px",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        <img
                          src={Location}
                          style={{ width: "11px", height: "15px" }}
                        />
                        <Typography
                          variant="p"
                          sx={{ fontSize: "10px", color: "#001619B2" }}
                        >
                          {content.Location || "Property Location"}
                        </Typography>
                      </Box>

                      {Type === "Property" ? (
                        <Box
                          className="Feature"
                          sx={{ display: "flex", gap: "5px" }}
                        >
                          {content.Type && (
                            <Box
                              sx={{
                                backgroundColor: "#5B114433",
                                display: "inline-flex",
                                padding: "3px 5px",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: content.Type ? 1 : 0.5,
                                pointerEvents: content.Type ? "auto" : "none",
                              }}
                            >
                              <Typography
                                variant="p"
                                sx={{
                                  color: "#5B1144",
                                  fontSize: "6px",
                                  fontWeight: "bold",
                                }}
                              >
                                {content.Type}
                              </Typography>
                            </Box>
                          )}
                          {content.Status && (
                            <Box
                              sx={{
                                backgroundColor: "#5B114433",
                                display: "inline-flex",
                                padding: "3px 5px",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: content.Status ? 1 : 0.5,
                                pointerEvents: content.Status ? "auto" : "none",
                              }}
                            >
                              <Typography
                                variant="p"
                                sx={{
                                  color: "#5B1144",
                                  fontSize: "6px",
                                  fontWeight: "bold",
                                }}
                              >
                                {content.Status}
                              </Typography>
                            </Box>
                          )}
                          {content.Location && (
                            <Box
                              sx={{
                                backgroundColor: "#5B114433",
                                display: "inline-flex",
                                padding: "3px 5px",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: content.Location ? 1 : 0.5,
                                pointerEvents: content.Location
                                  ? "auto"
                                  : "none",
                              }}
                            >
                              <Typography
                                variant="p"
                                sx={{
                                  color: "#5B1144",
                                  fontSize: "6px",
                                  fontWeight: "bold",
                                }}
                              >
                                {content.Location}
                              </Typography>
                            </Box>
                          )}
                          {content.City && (
                            <Box
                              sx={{
                                backgroundColor: "#5B114433",
                                display: "inline-flex",
                                padding: "3px 5px",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: content.City ? 1 : 0.5,
                                pointerEvents: content.City ? "auto" : "none",
                              }}
                            >
                              <Typography
                                variant="p"
                                sx={{
                                  color: "#5B1144",
                                  fontSize: "6px",
                                  fontWeight: "bold",
                                }}
                              >
                                {content.City}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      ) : (
                        <Box
                          className="Feature"
                          sx={{ display: "flex", gap: "5px" }}
                        >
                          {content.Condition && (
                            <Box
                              sx={{
                                backgroundColor: "#EA625E33",
                                display: "inline-flex",
                                padding: "3px 5px",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: content.Condition ? 1 : 0.5,
                                pointerEvents: content.Condition
                                  ? "auto"
                                  : "none",
                              }}
                            >
                              <Typography
                                variant="p"
                                sx={{
                                  color: "#EA625E",
                                  fontSize: "6px",
                                  fontWeight: "bold",
                                }}
                              >
                                {content.Condition === "Brand New"
                                  ? "Brand New"
                                  : "Used"}
                              </Typography>
                            </Box>
                          )}
                          {content.Manufacturer && (
                            <Box
                              sx={{
                                backgroundColor: "#5B114433",
                                display: "inline-flex",
                                padding: "3px 5px",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: content.Manufacturer ? 1 : 0.5,
                                pointerEvents: content.Manufacturer
                                  ? "auto"
                                  : "none",
                              }}
                            >
                              <Typography
                                variant="p"
                                sx={{
                                  color: "#5B1144",
                                  fontSize: "6px",
                                  fontWeight: "bold",
                                }}
                              >
                                {content.Manufacturer}
                              </Typography>
                            </Box>
                          )}
                          {content.PlateDivision && (
                            <Box
                              sx={{
                                backgroundColor: "#5B114433",
                                display: "inline-flex",
                                padding: "3px 5px",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: content.PlateDivision ? 1 : 0.5,
                                pointerEvents: content.PlateDivision
                                  ? "auto"
                                  : "none",
                              }}
                            >
                              <Typography
                                variant="p"
                                sx={{
                                  color: "#5B1144",
                                  fontSize: "6px",
                                  fontWeight: "bold",
                                }}
                              >
                                {content.PlateDivision}
                              </Typography>
                            </Box>
                          )}
                          {content.PlateColor && (
                            <Box
                              sx={{
                                backgroundColor: "#5B114433",
                                display: "inline-flex",
                                padding: "3px 5px",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: content.PlateColor ? 1 : 0.5,
                                pointerEvents: content.PlateColor
                                  ? "auto"
                                  : "none",
                              }}
                            >
                              <Typography
                                variant="p"
                                sx={{
                                  color: "#5B1144",
                                  fontSize: "6px",
                                  fontWeight: "bold",
                                }}
                              >
                                {content.PlateColor}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      )}

                      {Type === "Property" ? (
                        <Box
                          className="Property"
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "10px",
                            borderBottom: "1px solid #C2C2C2",
                            paddingBottom: "7px",
                          }}
                        >
                          <Box className="bed">
                            <img
                              src={BedIcon}
                              alt=""
                              style={{ width: "18px", height: "18px" }}
                            />
                            <Typography
                              variant="p"
                              sx={{ fontSize: "13px", marginLeft: "4px" }}
                            >
                              {content.Bedrooms || "N/A"}
                            </Typography>
                          </Box>

                          <Box className="shower">
                            <img
                              src={ShowerIcon}
                              alt=""
                              style={{ width: "18px", height: "18px" }}
                            />
                            <Typography
                              variant="p"
                              sx={{ fontSize: "13px", marginLeft: "4px" }}
                            >
                              {content.Bathrooms || "N/A"}
                            </Typography>
                          </Box>
                          <Box className="width">
                            <img
                              src={widthIcon}
                              alt=""
                              style={{ width: "18px", height: "18px" }}
                            />
                            <Typography
                              variant="p"
                              sx={{ fontSize: "13px", marginLeft: "4px" }}
                            >
                              {content.Area || "N/A"}
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          className="Property"
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "center",
                            borderBottom: "1px solid #C2C2C2",
                            paddingBottom: "7px",
                          }}
                        >
                          <Box
                            sx={{
                              width: "200px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <SteeringPositionDisplay
                              steeringPosition={content.SteeringPosition}
                              isMobile={isMobile}
                            />
                            <Box
                              className="FuelType"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                flexBasis: "50%",
                              }}
                            >
                              <img
                                src={FuelTypeIcon}
                                alt=""
                                style={{ width: "18px", height: "18px" }}
                              />
                              <Typography
                                variant="p"
                                sx={{ fontSize: "13px", marginLeft: "4px" }}
                              >
                                {content.FuelType || "N/A"}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              width: "200px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              className="EnginePower"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                flexBasis: "50%",
                              }}
                            >
                              <img
                                src={EnginPowerIcon}
                                alt=""
                                style={{ width: "18px", height: "18px" }}
                              />
                              <Typography
                                variant="p"
                                sx={{ fontSize: "13px", marginLeft: "4px" }}
                              >
                                {`${content.EnginePower}` || "N/A"}
                              </Typography>
                            </Box>
                            <Box
                              className="Mileage"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                flexBasis: "50%",
                              }}
                            >
                              <img
                                src={MileageIcon}
                                alt=""
                                style={{ width: "18px", height: "18px" }}
                              />
                              <Typography
                                variant="p"
                                sx={{ fontSize: "10px", marginLeft: "4px" }}
                              >
                                {`${content.Mileage}km` || "N/A"}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      )}

                      <Box
                        className="Price"
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          gap: "5px",
                          marginY: "10px",
                          zindex: 2,
                        }}
                      >
                        <Typography
                          variant="p"
                          sx={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          {content.Price || "N/A"}
                        </Typography>
                        <Typography variant="p">သိန်း</Typography>
                        <Typography
                          variant="p"
                          sx={{
                            color: "#B1630B",
                            fontSize: "12px",
                            marginTop: "10px",
                          }}
                        >
                          (ညှိနှိုင်း)
                        </Typography>
                      </Box>
                    </Box>
                    {/* Badge pr  */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: { xs: "38%", sm: "50%" },
                        left: { xs: "-2px", sm: "-5px" },
                        zIndex: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100px",
                          paddingY: "5px",
                          top: "0",
                          left: "0",
                          position: "absolute",
                          background: isPopular
                            ? "linear-gradient(10deg, rgba(172,37,130,1) 27%, rgba(70,15,53,1) 100%)"
                            : "#FBB96F",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "10px 10px 10px 0",
                          gap: "4px",
                        }}
                      >
                        <img
                          src={isPopular ? PopularIcon : HotIcon}
                          alt=""
                          style={{ width: "14px", height: "14px" }}
                        />
                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: isPopular ? "#FFFFFF" : "#C30000",
                          }}
                        >
                          {isPopular ? "POPULAR" : "HOT DEAL"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: -38,
                          left: 0,
                          width: 0,
                          height: 0,
                          borderStyle: "solid",
                          borderWidth: "0 10px 10px 0",
                          borderColor: isPopular
                            ? "transparent #5b1144 transparent transparent"
                            : "transparent #EA625E transparent transparent",
                          transform: "rotate(0deg)",
                        }}
                      />
                    </Box>
                    {/* wave svg */}
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
                        zIndex: 0, // 👈 push wave behind content
                        borderBottomLeftRadius: "20px", // 👈 add this
                        borderBottomRightRadius: "20px", // 👈 add this
                      }}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default UserPopularHotDealCard;
