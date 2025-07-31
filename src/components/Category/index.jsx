import React from "react";
import { Box, Typography } from "@mui/material";
import ads1Image from "../../assets/icons/Logo.png";
import ads2Image from "../../assets/icons/Logo.png";
import { useTranslation } from "react-i18next";

// Replace with dynamic props if needed
// const adImages = [ads1Image, ads2Image];

export default function AdsShowcaseComponent() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        background: "#E9E3DF",
        display: "flex",
        justifyContent: "center",
        height: { sm: 160, md: 180, lg: 200, xl: 300 },
        width: "100%",
        my: 5,
      }}
    >
      <Box
        sx={{
          placeContent: "center",
          gap: { xs: 1, sm: 1, md: 4, lg: 6 },
          py:2,
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
          justifyContent: "center",
        }}
      >
        {/* <Box sx={{
                cursor : 'pointer',
                display : 'flex',
                width : {xs : '100%' , sm : '100%' , md :'100%' , lg :'300px' ,  xl : "500px" },
                height : {xs : '200px' , sm : '100%' , md :'100%' , lg :"50px" , xl : "90px" },
                alignItems :'center',
                gap : 2,
                background : 'black',
                padding :{ xs :  "15px 20px" , sm : "15px 20px" ,md :  "15px " , lg: "20px" ,xl : "30px 40px"  },
                
                borderRadius : 50

            }}>
            <Box
              component="img"
              src={ads1Image}
             
              sx={{
                width: {sm : "50px" , md : "50px" , lg : "60px" , xl : "90px"},
                width: {sm : "50px" , md : "50px" , lg : "60px" , xl : "90px"},
                objectFit: "cover",   // Can change to 'contain' if you want full image
                borderRadius: '100%',  
                backgroundColor: "#f5f5f5", // optional fallback background
              }}
            />
            <Typography sx={{fontSize : {xs : 15 , sm : 16 , md : 18 , lg:20 , xl : 30} , fontFamily : 'roboto', color : 'white' , fontWeight :500 , letterSpacing : 1}}>
            {t('sharmal_car')}
            </Typography>
            </Box> */}
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            maxWidth: "100%",
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "300px",
              xl: "500px",
            },
            height: {
              xs: "50px",
              sm: "50px",
              md: "100%",
              lg: "50px",
              xl: "90px",
            },
            alignItems: "center",
            gap: 2,
            background: "black",
            padding: {
              xs: "15px",
              sm: "15px 20px",
              md: "15px ",
              lg: "20px 30px",
              xl: "30px 40px",
            },
            borderRadius: 50,
          }}
        >
          <Box
            component="img"
            src={ads2Image}
            sx={{
              width: {
                xs: "50px",
                sm: "50px",
                md: "50px",
                lg: "60px",
                xl: "90px",
              },
              height: {
                xs: "50px",
                sm: "50px",
                md: "50px",
                lg: "60px",
                xl: "90px",
              },
              objectFit: "cover", // Can change to 'contain' if you want full image
              borderRadius: "100%",
              backgroundColor: "#f5f5f5", // optional fallback background
            }}
          />
          <Typography
            sx={{
              width: "100%",
              textWrap: "nowrap",
              fontSize: { xs: 15, sm: 16, md: 17, lg: 20, xl: 30 },
              fontFamily: "roboto",
              color: "white",
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            {t("sharmal_car")}
          </Typography>
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            maxWidth: "100%",
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "300px",
              xl: "500px",
            },
            height: {
              xs: "50px",
              sm: "50px",
              md: "100%",
              lg: "50px",
              xl: "90px",
            },
            alignItems: "center",
            gap: 2,
            background: "black",
            padding: {
              xs: "15px",
              sm: "15px 20px",
              md: "15px ",
              lg: "20px 30px",
              xl: "30px 40px",
            },
            borderRadius: 50,
          }}
        >
          <Box
            component="img"
            src={ads2Image}
            sx={{
              width: {
                xs: "50px",
                sm: "50px",
                md: "50px",
                lg: "60px",
                xl: "90px",
              },
              height: {
                xs: "50px",
                sm: "50px",
                md: "50px",
                lg: "60px",
                xl: "90px",
              },
              objectFit: "cover", // Can change to 'contain' if you want full image
              borderRadius: "100%",
              backgroundColor: "#f5f5f5", // optional fallback background
            }}
          />
          <Typography
            sx={{
              width: "100%",
              textWrap: "nowrap",
              fontSize: { xs: 15, sm: 16, md: 17, lg: 20, xl: 30 },
              fontFamily: "roboto",
              color: "white",
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            {t("sharmal_market")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
