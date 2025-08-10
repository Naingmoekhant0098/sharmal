import { Box, Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
// import { fontSize, height, maxWidth } from "@mui/system"
// import theme from "../../theme"
import bgCars from "../../assets/images/cars.png";
import { useTranslation } from "react-i18next";
import theme from "../../theme";
// import { maxWidth } from "@mui/system"

// Styled components for better organization
export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "0 auto",

  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    padding: `0 ${theme.spacing(2)}`,
    marginTop: theme.spacing(3),
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "100%",
    padding: `0 ${theme.spacing(1.5)}`,
    marginTop: theme.spacing(3),
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "90%",
    padding: `0 ${theme.spacing(1.5)}`,
    marginTop: theme.spacing(5),
  },
  flexDirection: "column",

  // [theme.breakpoints.down("md")]: {
  //   marginTop: theme.spacing(8),
  // },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  // paddingLeft: theme.spacing(3),

  // fontSize: "1rem",
  fontWeight: 700,
  color: "#1a1a1a",
  marginTop: theme.spacing(2),
  letterSpacing: "-0.02em",
  marginBottom: "20px",
  [theme.breakpoints.up("sm")]: {
    // paddingLeft: theme.spacing(8),
    // fontSize: "5rem",

    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.up("md")]: {
    // paddingLeft: theme.spacing(8),
    marginBottom: theme.spacing(4),
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("xl")]: {
    // paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(4),
    fontSize: "1.5rem",
  },
}));

export const ScrollContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "full",
  flexWrap: "nowrap",
  // background :'red',
  overflowX: "auto",
  marginBottom :50,
  paddingBottom: theme.spacing(1),
  scrollSnapType: "x mandatory",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  // "&::-webkit-scrollbar": {
  //   display: "none",
  // },
  // [theme.breakpoints.down("sm")]: {
  //   // paddingLeft: theme.spacing(8),
  //   // paddingRight: theme.spacing(8),
  //   gap: theme.spacing(0),
  //   paddingTop: 0,
  // },
  // [theme.breakpoints.up("md")]: {
  //   // paddingLeft: theme.spacing(8),
  //   // paddingRight: theme.spacing(8),
  //   gap: theme.spacing(2),
  //   paddingTop: 0,
  // },
  // [theme.breakpoints.up("xl")]: {
  //   // paddingLeft: theme.spacing(3),
  //   // paddingRight: theme.spacing(3),
  //   justifyContent: "center",
  //   paddingTop: 5,
  // },
}));

const CategoryCard = styled(Card)(({ theme, type }) => ({
  width: 150,
  minWidth: 150,
  
  padding: 0,
  margin: 0,
  height: 170,
  minHeight: 170,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 16,
  background: "transparent",
  marginRight : 10,
  cursor: "pointer",
  transition: "all 0.2s ease-out",
  scrollSnapAlign: "start",
  position: "relative",
  overflow: "hidden",

  "&:hover": {
    transform: "translateY(-2px)",
   
    // boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    // background: "#fafbfc",
    // borderColor: "#e2e8f0",
  },

  "&:active": {
    transform: "translateY(-1px)",
  },

  [theme.breakpoints.down("md")]: {
    width: 130,
    minWidth: 130,
    height: 150,
    borderRadius: 12,
  },
}));

//

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
  const { t } = useTranslation();
  const handleDetail = (label) => {
    Type === "Property"
      ? history.push(`/property?State=All&Type=${label}`)
      : history.push(`/car?Type=${label}`);
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundImage: `url(${bgCars})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        height: 350,
        maxWidth: "1600px",
        width: "100%",
        display: "flex",
        // background :'red',
       
      }}
    >
      <Box
        sx={{
          display: "flex",
          margin: { xs: "0 auto", sm: "0 auto", md: "0 auto" , xl: "0" },
          flexDirection: "column",
          maxWidth :'1600px',
          width: { xs: "100%", sm: "100%", md: "90%", lg: "90%",xl : '100%' },
          // background :'red'
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              color: theme.palette.secondary.main,
            },
            // background :'red',

            fontWeight: 700,
            color: "#1a1a1a",
            textAlign: { xs: "center", sm: "center", md: "left", lg: "left" },
            fontSize: { xs: "1.3rem", sm: "1.3rem", md: "1.5rem" },

            marginBottom: "50px",
          }}
          variant="h4"
        >
          {Title}
        </Typography>
        <ScrollContainer>
          {PropertyCatagoryData.map((icon, index) => (
            <CategoryCard
              key={index}
              type={Type}
              onClick={() => handleDetail(icon.label)}
              elevation={0}
            >
              <Box
                sx={{
                  bgcolor: "white",
                  width: { xs: 80, sm: 80, md: 100, lg: 100 },
                  height: { xs: 80, sm: 80, md: 100, lg: 100 },
                  padding: { xs: 0.5, sm: 0.6, md: 0.6, lg: 0.6 },
                  borderRadius: 100,
                  border : "1px solid white",
                  transition : "all .5s ease",
                  "&:hover" : {
                    transform : "rotate(360deg)",
                  border : "1px solid #6F1D8E",
                  bgcolor : "rgba(112, 29, 142, 0.74)!important"
                  }
                }}
                type={Type}
              >
                <img
                  src={icon.src || "/placeholder.svg"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  alt={icon.label}
                  loading="lazy"
                />
              </Box>

              <Typography
                sx={{ fontSize: 17, color: "white", mt: 1, fontWeight: 600, "&:hover" : {
                 
                  color : "#6F1D8E!important"
                  } }}
                variant="body2"
              >
                {t(icon.label)}
              </Typography>
            </CategoryCard>
          ))}
        </ScrollContainer>
      </Box>
    </Box>
  );
};

export default UserCategoryCard;
