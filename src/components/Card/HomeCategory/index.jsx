import { Box, Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
// import { fontSize, height, maxWidth } from "@mui/system"
import { useTranslation } from "react-i18next";
import theme from "../../../theme";

const CategoryCard = styled(Card)(({ theme, type }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  cursor: "pointer",
  transition: "all 0.2s ease-out",
  scrollSnapAlign: "start",
  position: "relative",
  overflow: "hidden",
  paddingTop: 2,
  background: "transparent",

  padding: 4,

  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: "#e2e8f0",
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
  [theme.breakpoints.down("md")]: {
    width: 150,
    minWidth: 150,
    height: 160,
  },
}));

// const IconContainer = styled(Box)(({ theme, type }) => ({

//   marginBottom: theme.spacing(1.5),
//   border: "1px solid rgba(0, 0, 0, 0.3)",
//   padding: theme.spacing(3),
//   paddingBottom :t
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   borderRadius: '50%',
//   // background: "rgba(255, 255, 255, 0.25)",
//   boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.10)",
//   backdropFilter: "blur(3px)",

//   WebkitBackdropFilter: "blur(3px)",
//   transition: "all 0.2s ease-out",

//   // "& img": {
//   //   width: type === "Car" ? '100%' : '100%',
//   //   height: type === "Car" ? '100%' : '100%',
//   //   objectFit: type === "Car" ? 'contain' : 'cover',
//   //   filter: "grayscale(0.1)",
//   // },

//   [theme.breakpoints.up("md")]: {
//     width: type === "Car" ? 70 : 70,
//     height: 70,
//     marginTop : "5px"
//   },

//   [theme.breakpoints.down("md")]: {
//     width: type === "Car" ? 50 : 50,
//     height: 50,
//     marginTop : "5px",
//     borderRadius: 6,
//   },
// }))

export const StyledCardContent = styled(CardContent)(({ theme, type }) => ({
  padding: `0 ${theme.spacing(2)} ${theme.spacing(2)}`,
  paddingBottom: `${theme.spacing(2)} !important`,
  textAlign: "center",

  "& .MuiTypography-root": {
    fontWeight: 600,
    color: type === "Car" ? "white" : "#1a1a1a",
    fontSize: 20,

    lineHeight: 1.3,
    letterSpacing: "-0.01em",
  },

  [theme.breakpoints.down("md")]: {
    padding: `0 ${theme.spacing(1.5)} ${theme.spacing(1.5)}`,
    paddingBottom: `${theme.spacing(1.5)} !important`,

    "& .MuiTypography-root": {
      fontSize: "0.8125rem",
    },
  },
}));

const UserCategoryCard = ({ Title, PropertyCatagoryData, Type, history }) => {
  const handleDetail = (label) => {
    Type === "Property"
      ? history.push(`/property?State=All&Type=${label}`)
      : history.push(`/car?Type=${label}`);
    window.scrollTo(0, 0);
  };

  const { t } = useTranslation();

  return (
    // <Box
    //   sx={{
    //     maxWidth: "1600px",
    //     width: "100%",
    //    background :'red'
       
    //   }}
    // >
    //   <Box
    //     sx={{
    //    maxWidth : '100%',
    //       width: { xs: "95%", sm: "95%", md: "90%", lg: "90%" , xl : "100%" },
    //      margin : "0 auto"
    //     }}
    //   >
    //     <Typography
    //       sx={{
    //         cursor: "pointer",
    //         transition: "0.3s",
    //         "&:hover": {
    //           color: theme.palette.secondary.main,
    //         },
    //         fontWeight: 700,
    //         color: "#1a1a1a",
    //         textAlign: { xs: "center", sm: "center", md: "left", lg: "left" },
    //         fontSize: { xs: "1.3rem", sm: "1.3rem", md: "1.5rem" },
    //         marginBottom: "20px",
    //       }}
    //       variant="h4"
    //     >
    //       {Title}
    //     </Typography>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         overflowX: "auto",
    //         width: "100%",
    //         gap: { xs: 3, sm: 3, md: 3, lg: 4 },
    //         paddingBottom: 1,
    //         scrollSnapType: "x mandatory",
    //         scrollbarWidth: "none",
    //       }}
    //     >
    //       {PropertyCatagoryData.map((icon, index) => (
    //         <Box
    //           key={index}
    //           type={Type}
    //           onClick={() => handleDetail(icon.value)}
    //           elevation={0}
    //         >
    //           <Box
    //             sx={{
    //               textAlign: "center",
    //               border: "1px solid gray",
    //               width: { xs: 70, sm: 70, md: 100, lg: 100 },
    //               height: { xs: 70, sm: 70, md: 100, lg: 100 },

    //               borderRadius: 50,
    //             }}
    //             type={Type}
    //           >
    //             <img
    //               src={icon.src || "/placeholder.svg"}
    //               style={{ width: "100%", height: "100%", objectFit: "cover" }}
    //               alt={icon.label}
    //               loading="lazy"
    //             />
    //           </Box>

    //           <Typography
    //             sx={{ fontSize: 17, mt: 1, fontWeight: 600 , textAlign: "center" }}
    //             variant="body2"
    //           >
    //             {t(icon.label)}
    //           </Typography>
    //         </Box>
    //       ))}
    //     </Box>
    //   </Box>
    // </Box>
    <Box sx={{ maxWidth: "1600px", width: "100%" , my: 5, display : 'flex' , alignItems: "center" , justifyContent :{lg : 'center'  , xl : "flex-start"}}}>
    <Box
      sx={{
        maxWidth: "100%",
        
        width: { xs: "95%", sm: "95%", md: "90%", lg: "90%" },
      
      }}
    >
      <Typography
        sx={{
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": {
            color: "grey.700", // Using a generic grey for hover effect
          },
          fontWeight: 700,
          color: "#1a1a1a",
          textAlign: { xs: "center", sm: "center", md: "left", lg: "left" },
          fontSize: { xs: "1.3rem", sm: "1.3rem", md: "1.5rem" },
          marginBottom: "20px",
        }}
        variant="h4"
      >
        {Title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          width: "100%",
          gap: { xs: 3, sm: 3, md: 3, lg: 4 },
          paddingBottom: 1,
          scrollSnapType: "x mandatory",
          // Hide scrollbar for various browsers
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none", // IE and Edge
          scrollbarWidth: "none", // Firefox
        }}
      >
        {PropertyCatagoryData.map((icon, index) => (
          <Box
            key={index}
            onClick={() => handleDetail(icon.value)}
            sx={{
              flexShrink: 0, // Prevent items from shrinking
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                border: "1px solid #6F1D8E",
                width: { xs: 70, sm: 70, md: 100, lg: 100 },
                height: { xs: 70, sm: 70, md: 100, lg: 100 },
                borderRadius: "50%",
                overflow: "hidden", // Ensure image respects border-radius
                display: "flex",
                alignItems: "center",
                transition : "all .3s ease",
                "&:hover" : {
                  // border : "1px solid rgba(112, 29, 142, 0.17)",
                 bgcolor : "rgba(112, 29, 142, 0.17)"

                },
                justifyContent: "center",
              }}
            >
              <img
                src={icon.src || "/placeholder.svg?height=100&width=100&query=category icon"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt={icon.label}
                loading="lazy"
              />
            </Box>
            <Typography sx={{ fontSize: 17, mt: 1, fontWeight: 600, textAlign: "center" }} variant="body2">
              {t(icon.label)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
    
  );
};

export default UserCategoryCard;
