// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import { PropertyByTownship } from '../../data/homePageData';

// const UserpropertyByTownshipCard = ({history}) => {
//   const handleDetail =(data) => {    
//     history.push(`/property?State=All&location=${data}`)
//   }

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', marginY: '30px' }}>
//       <Typography
//         variant='p'
//         className='UserPageTitleStyle'
//         sx={{
//           paddingLeft: { xs: '20px', md: '55px' },
//           marginBottom: '20px',
//           textAlign: { xs: 'left', md: 'left' },
//           mt: { xs: '10px', md: '0' },
//           fontSize: { xs: '15px', md: '20px', xl: '24px' },
          
//         }}
//       >
//         ပြည်နယ်/တိုင်းဒေသအလိုက် အိမ်ခြံမြေ
//       </Typography>

//       <Box
//   sx={{
//     display: 'flex',
//     flexDirection: 'row',
//     gap: { xs: '10px', sm: '20px', md: '60px', lg: '80px' }, // Adjust gap responsively
//     justifyContent: 'flex-start',
//     overflowX: 'auto',
//     padding: { xs: '0 16px', sm: '0 24px', md: '10px 60px', xl: '10px 95px' },
//     scrollSnapType: 'x mandatory',
//     scrollBehavior: 'smooth',
//     WebkitOverflowScrolling: 'touch',
//   }}
// >
//   {PropertyByTownship.map((township, index) => (
//     <Box
//       key={index}
//       onClick={() => handleDetail(township.data)}
//       sx={{
//         minWidth: { xs: '160px', sm: '180px', md: '200px' },
//         height: { xs: '200px', sm: '220px', md: '250px' },
//         backgroundImage: `url(${township.image})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: '10px',
//         scrollSnapAlign: 'center',
//         flexShrink: 0,
//         cursor: 'pointer',
//         transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//         '&:hover': {
//           transform: 'scale(1.03)',
//           boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
//         },
//       }}
//     >
//       <Typography
//         variant="body1"
//         sx={{
//           color: 'white',
//           textShadow: '4px 2px 3px #474747',
//           fontWeight: 600,
//           fontSize: { xs: '14px', sm: '16px' },
//           textAlign: 'center',
//           px: 1,
//         }}
//       >
//         {township.name}
//       </Typography>
//     </Box>
//   ))}
// </Box>

//     </Box>
//   );
// };

// export default UserpropertyByTownshipCard;


import React from "react"
import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { PropertyByTownship } from "../../data/homePageData"
import { StyledTitle } from "./UserCatagoryCard"
import theme from "../../theme"
import { useTranslation } from "react-i18next"

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  margin : "0 auto",
  background:"green",
  marginTop :0,
 
  [theme.breakpoints.up("sm")]: {
    maxWidth: "100%",
    // padding: `0 ${theme.spacing(2)}`,
    marginTop:  "-100px",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "100%",
    padding: `0 ${theme.spacing(1.5)}`,
    marginTop: theme.spacing(2),
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "90%",
    padding: `0 ${theme.spacing(1.5)}`,
    marginTop: theme.spacing(5),
  },
  flexDirection: "column",
  marginTop: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(8),
  },
}))

// const StyledTitle = styled(Typography)(({ theme }) => ({
//   // paddingLeft: theme.spacing(3),
//   marginBottom: theme.spacing(3),
//   fontSize: "1.5rem",
//   fontWeight: 700,
//   color: "#1a1a1a",
//   letterSpacing: "-0.02em",
//   lineHeight: 1.3,
//   // [theme.breakpoints.up("md")]: {
//   //   paddingLeft: theme.spacing(8),
//   //   fontSize: "1.75rem",
//   // },
//   // [theme.breakpoints.up("xl")]: {
//   //   paddingLeft: theme.spacing(12),
//   //   fontSize: "2rem",
//   // },
//   // [theme.breakpoints.down("sm")]: {
//   //   fontSize: "1.25rem",
//   //   paddingLeft: theme.spacing(2.5),
//   // },
// }))

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  overflowX: "auto",
  // paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(1),
  scrollSnapType: "x mandatory",
  marginTop: theme.spacing(1),
  scrollBehavior: "smooth",
  WebkitOverflowScrolling: "touch",
  // Hide scrollbar completely
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    // paddingLeft: theme.spacing(3),
    // paddingRight: theme.spacing(3),
    // gap: theme.spacing(3),
  },
  [theme.breakpoints.up("lg")]: {
     
  },
  [theme.breakpoints.up("xl")]: {
   
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    gap: theme.spacing(1.5),
  },
}))

const TownshipCard = styled(Box)(({ theme }) => ({
  minWidth: 180,
  height: 240,
  borderRadius: 16,
  overflow: "hidden",
  cursor: "pointer",
  scrollSnapAlign: "center",
  flexShrink: 0,
  position: "relative",
  transition: "all 0.2s ease-out", // Faster transition
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", // Reduced initial shadow

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
    zIndex: 1,
    transition: "opacity 0.2s ease",
  },

  "&:hover": {
    transform: "translateY(-3px)", // Reduced from -8px
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)", // Reduced shadow

    "&::before": {
      opacity: 0.75, // Slightly reduced overlay
    },
  },

  "&:active": {
    transform: "translateY(-1px)", // Reduced from -4px
  },

  [theme.breakpoints.down("md")]: {
    minWidth: 160,
    height: 200,
    borderRadius: 12,
  },

  [theme.breakpoints.down("sm")]: {
    minWidth: 140,
    height: 180,
    borderRadius: 10,
  },
}))

 


 

const UserpropertyByTownshipCard = ({ history ,Title}) => {

  const {t} =useTranslation();
  const handleDetail = (data) => {
    history.push(`/property?State=All&location=${data}`)
  }

  // Drag-to-scroll logic
  const scrollRef = React.useRef(null)
  const isDragging = React.useRef(false)
  const startX = React.useRef(0)
  const scrollLeft = React.useRef(0)

  const handleMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    scrollRef.current.style.cursor = "grabbing"
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    scrollRef.current.style.cursor = "grab"
  }

  const handleMouseUp = () => {
    isDragging.current = false
    scrollRef.current.style.cursor = "grab"
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.2 // scroll speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab"
    }
  }, [])

  return (
    <Box sx={{display :"flex" , margin : "0 auto", flexDirection : 'column' , maxWidth : {xs : '100%' , sm : '100%' , md :'100%' , lg :"90%" , margin :"0 auto" , marginTop : 40}}}>
      <Typography sx={{
paddingLeft : {xs : theme.spacing(2),sm :theme.spacing(2) , md:0},
fontWeight: 700,
color: "#1a1a1a",
textAlign: { xs: 'center', sm: 'center' , md :'left' , lg:'left' },
fontSize : {xs : "1.3rem" ,sm :"1.3rem"  , md : "1.5rem"},
marginBottom : "20px",
      }} variant="h4">
      {Title}
      </Typography>
      <ScrollContainer
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {PropertyByTownship.map((township, index) => (
          <TownshipCard
            key={index}
            onClick={() => handleDetail(township.data)}
            sx={{
              backgroundImage: `url(${township.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              overflow: "hidden",
              userSelect: "none",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.75) 100%)",
                zIndex: 1,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                position: "relative",
                zIndex: 2,
                color: "#fff",
                fontWeight: 700,
                marginBottom: 2,
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.15rem" },
                textAlign: "center",
                width: "100%",
                pb: 1,
                px: 1,
                textShadow: "0 2px 8px rgba(0,0,0,0.45)",
                letterSpacing: "0.01em",
                userSelect: "none",
              }}
            >
              {t(township.name)}
            </Typography>
          </TownshipCard>
        ))}
           
      </ScrollContainer>
    </Box>
  )
}

export default UserpropertyByTownshipCard
