import React, { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
// import { Box, Button, Grid, Typography } from "@mui/material";
// import ads1Image from "../../assets/images/ads/ads2.png";
// import ads2Image from "../../assets/images/ads/ads2.png";
import EainCard from "../Card/EainCard";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
import "swiper/css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import { fontFamily } from "@mui/system";
// import { StyledTitle } from "../Card/UserCatagoryCard";
import theme from "../../theme";
import { useTranslation } from "react-i18next";
// import import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; from "@mui/icons-material/ArrowBackIos";
// Replace with dynamic props if needed
// const adImages = [ads1Image, ads2Image, ads1Image];

export default function CardLists({ data, Type, history, Title }) {
  const { t } = useTranslation();
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.slidePrev) {
      swiperRef.current.slidePrev();
    } else if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      swiperRef.current.swiper.slidePrev
    ) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.slideNext) {
      swiperRef.current.slideNext();
    } else if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      swiperRef.current.swiper.slideNext
    ) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <Box
      sx={{
      
       
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: "1600px",
        width: { xs: "95%", sm: "95%", md: "90%", lg: "91%", xl: "92%" },
        fontFamily: "Roboto!important",
        margin: "0 auto",
        my: 5,
      }}
    >
      <Typography
        sx={{
          cursor : 'pointer',
                    transition: "0.3s",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                    },
          paddingLeft: { xs: theme.spacing(1), sm: theme.spacing(1), md: 0 },
          textAlign: { xs: "center", sm: "center", md: "center", lg: "center" },
          fontWeight: 700,
          color: "#1a1a1a",
          fontSize: { xs: "1.3rem", sm: "1.3rem", md: "1.5rem" },
          // marginTop: theme.spacing(2),

          marginBottom: "20px",
        }}
      >
        {Title}
      </Typography>

      <Box
        sx={{
        
          width: "100%",
          margin: "0 auto",
          position: "relative",
          py: 1,
        }}
      >
        <Swiper
          slidesPerView={1.2}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[]}
          spaceBetween={10}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            320: { slidesPerView: 1. },
            344: { slidesPerView: 1 },
            360: { slidesPerView: 1 },
            375: { slidesPerView: 1 },
            390: { slidesPerView: 1 },
            412: { slidesPerView: 1 },
            414: { slidesPerView: 1 },
            480: { slidesPerView: 1 },
            540: { slidesPerView: 1.9 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.3 },
            912: { slidesPerView: 2.7 },
            1024: { slidesPerView: 2.8 },
            1280: { slidesPerView: 4 },
            1440: { slidesPerView: 4 },
            1920: { slidesPerView: 4 },
            2560: { slidesPerView: 4 },
          }}
          className="py-6"
        >
          {[...Array(8)].map((_, idx) => (
            <SwiperSlide key={idx}>
              <EainCard
                data={data}
                isPopular={false}
                history={history}
                Type={Type}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Box
          onClick={handlePrev}
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.2)",
            bgcolor: "rgba(151, 151, 151, 0.77)",
            backdropFilter: "blur(0.6px)",
            position: "absolute",
            top: "40%",
            left: -12,
            zIndex: 50,
            transform: "translateY(-40%)",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "rgba(102, 102, 102, 0.18)",
            },
            cursor: "pointer",
            color: "white",
            p: 1,
            borderRadius: "50%",
            display :  "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
          }}
        >
          <ArrowBackIosNewIcon fontSize="medium" />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            size="large"
            variant="contained"
            sx={{
              marginTop: "30px",
              borderRadius: 50,
              background: "#6F1D8E",
              border: "1px solid #6F1D8E",
              "&:hover": { 
                background: "white",
                color : 'black'
               

              },
            }}
            onClick={() => {
              history.push("/notfount", { type: "comingSoon" });
              window.scrollTo(0, 0);
            }}
          >
            {t("allProptertyevent")}
          </Button>
        </Box>

        <Box
          onClick={handleNext}
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.2)",
            bgcolor: "rgba(151, 151, 151, 0.77)",
            backdropFilter: "blur(0.6px)",
            position: "absolute",
            top: "40%",
            right: -12,
            zIndex: 40,
            transform: "translateY(-40%)",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "rgba(102, 102, 102, 0.18)",
            },
            display :  "flex",
            cursor: "pointer",
            color: "white",
            p: 1,
            borderRadius: "50%",
          
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: { sm: 20, md: 22, lg: 22 } }} />
        </Box>
      </Box>
    </Box>
  );
}
