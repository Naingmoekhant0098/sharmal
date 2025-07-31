import React from "react";
import { Box, Grid, Typography,Stack ,Button } from "@mui/material";
import playstore from "../../assets/images/playstore.png";
import ads2Image from "../../assets/images/ads/ads2.png";
import ads1Image from "../../assets/images/ads/ads1.png";
import { styled } from "@mui/material/styles"
import { Apple } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
// Replace with dynamic props if needed
const adImages = [ads1Image, ads2Image];
const StyledButton = styled(Button)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1.5),
    // border: "2px solid rgba(255, 255, 255, 0.3)",
   background :'#3E0F50',
    backdropFilter: "blur(8px)",
    padding: theme.spacing(1.5, 2),
    borderRadius: theme.spacing(1.5),
    color: "white",
    fontSize: "0.875rem",
    fontWeight: 500,
    textTransform: "none",
    transition: "all 0.3s ease",
    boxShadow: theme.shadows[4],
    "&:hover": {
     background :'#3E0F50'
     
      
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2, 3),
      fontSize: "1rem",
      gap: theme.spacing(2),
    },
  }))
  
  const IconWrapper = styled("img")(({ theme }) => ({
    width: 24,
    height: 24,
    [theme.breakpoints.up("md")]: {
      width: 32,
      height: 32,
    },
  }))
  
//   const StyledDownloadIcon = styled(DownloadIcon)(({ theme }) => ({
//     width: 16,
//     height: 16,
//     [theme.breakpoints.up("md")]: {
//       width: 20,
//       height: 20,
//     },
//   }))

export default function AdsShowcaseComponent() {
  const {t} = useTranslation();
  return (
    <Box sx={{ py: {xs : 4 , lg : 4 ,md : 4, lg:4} , my:6 , background :'#E9E3DF' , display : 'flex' , justifyContent:'center' , height : "auto" , width : '100%' , maxWidth : '100vw'}}>
      <Box   sx={{placeContent :'center' , gap: {xs : 2 ,  sm : 3, md : 4 , lg : 6} ,  display :'flex' ,  alignItems :'center' , justifyContent:'center' ,  flexDirection : {xs  : 'column' , sm :'column' , md:'row' , lg:'row'}}} >
        <Typography sx={{fontSize : 26 , fontFamily : 'roboto' , fontWeight : 800, color : '#6F1D8E'  , letterSpacing : 1.1, textAlign :'center'}}>
      {t('download')}
        </Typography>
        <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1.5, md: 2 }}
      sx={{
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      <StyledButton component="a"  target="_blank" rel="noopener noreferrer" sx={{border : "1px solid #6F1D8E" ,"&:hover":{background :'#E9E3DF'  , color :'#6F1D8E'}}}>
        {/* {  <IconWrapper src={playStore} alt="Google Play" />} */}
        <Box component="img" src={playstore} sx={{ width : 40 , height : 40}}  />
        <Box sx={{ textAlign: "left" }}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              opacity: 0.9,
              fontSize: "0.75rem",
              lineHeight: 1,
            }}
          >
            Get it on
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.875rem", md: "1rem" },
              lineHeight: 1.2,
              mt:0.5
            }}
          >
            Google Play
          </Typography>
        </Box>
      </StyledButton>

      <StyledButton component="a"  target="_blank" rel="noopener noreferrer" sx={{border : "1px solid #6F1D8E" ,"&:hover":{background :'#E9E3DF'  , color :'#6F1D8E'}}}>
        {/* <StyledDownloadIcon /> */}
         <Apple sx={{fontSize : 40}}/>
        <Box sx={{ textAlign: "left" }}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              opacity: 0.9,
              fontSize: "0.75rem",
              lineHeight: 1,
              
            }}
          >
               Get it on
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.875rem", md: "1rem" },
              lineHeight: 1.2,
            mt:0.5
            }}
          >
          App Store
          </Typography>
        </Box>
      </StyledButton>
    </Stack>
         
      
      </Box>
    </Box>
  );
}
