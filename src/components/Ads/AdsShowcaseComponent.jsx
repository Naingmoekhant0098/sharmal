// import React from "react";
// import { Box, Grid } from "@mui/material";
// import ads1Image from "../../assets/images/ads/ads2.png";
// import ads2Image from "../../assets/images/ads/ads2.png";

// // Replace with dynamic props if needed
// const adImages = [ads1Image, ads2Image,ads2Image,ads2Image,ads2Image];

// export default function AdsShowcaseComponent() {
//   return (
//     <Box sx={{py: {xs : 2 , lg : 2 ,md : 4, lg:4,} , background :'#E9E3DF' , display : 'flex' , justifyContent:'center'}}>
//      <Box
//   sx={{
//     display: 'grid',
//     placeContent: 'center',
//     gap: { xs: 1, sm: 2, md: 4, lg: 3 },
//     width: '92%',
//     gridTemplateColumns: {
//       // xs: '1fr',
//       sm: 'repeat(2, 1fr)',
//       md: 'repeat(3, 1fr)',
//       lg: 'repeat(3, 1fr)',
//       xl: 'repeat(3, minmax(300px, 1fr))'
//     },
//   }}
// >
//             <Box
//               component="img"
//               src={ads2Image}

//               sx={{
//                 width: "100%",
//                height :{xs: 130, sm: 130, md: 150, lg: 150},
//                 objectFit: "cover",
//                 borderRadius: {xs: 1, sm: 1, md: 2, lg: 3},

//               }}
//             />
//              <Box
//               component="img"
//               src={ads2Image}

//               sx={{
//                 width: "100%",
//                height :{xs: 130, sm: 130, md: 150, lg: 150},
//                 objectFit: "cover",
//                 borderRadius: {xs: 1, sm: 1, md: 2, lg: 3},

//               }}
//             />
//              <Box
//               component="img"
//               src={ads2Image}

//               sx={{
//                 width: "100%",
//                height :{xs: 130, sm: 130, md: 150, lg: 150},
//                 objectFit: "cover",
//                 borderRadius: {xs: 1, sm: 1, md: 2, lg: 3},

//               }}
//             />
//              <Box
//               component="img"
//               src={ads2Image}

//               sx={{
//                 gridColumn: 'span 2',
//                 objectFit:'contain',
//                 width: "100%",
//                height :{xs: 130, sm: 130, md: 150, lg: 150},
//                 objectFit: "cover",
//                 borderRadius: {xs: 1, sm: 1, md: 2, lg: 3},

//               }}
//             />
//              <Box
//               component="img"
//               src={ads2Image}

//               sx={{
//                 width: "100%",
//                height :{xs: 130, sm: 130, md: 150, lg: 150},
//                 objectFit: "cover",
//                 borderRadius: {xs: 1, sm: 1, md: 2, lg: 3},

//               }}
//             />

//       </Box>
//     </Box>
//   );
// }

import React from "react";
import { Box } from "@mui/material";
import ads1Image from "../../assets/images/ads/ads2.png";
import ads2Image from "../../assets/images/ads/ads2.png";

const adImages = [ads1Image, ads2Image, ads2Image, ads2Image, ads2Image];

export default function AdsShowcaseComponent() {
  return (
    <Box
      sx={{
        py: { xs: 2, md: 4 },
        background: "#E9E3DF",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          gap: { xs: 2, sm: 3, md: 4 },
          width: { xs: "95%", sm: "95%", md: "90%", lg: "88%" },
          maxWidth: "1600px",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gridAutoRows: "minmax(100px, auto)",
        }}
      >
        {adImages.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            sx={{
              // gridColumn: index === 3 ? "span 2" : "auto",
              width: "100%",
              height: { xs: 120, sm: 140, md: 160, lg: 180 },
              objectFit: "cover",
              borderRadius: { xs: 1, sm: 1.5, md: 2, lg: 3 },
              gridColumn: index === 3 ? { sm: "span 1", md: "span 2" } : "auto",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
            alt={`Advertisement ${index + 1}`}
          />
        ))}
      </Box>
    </Box>
  );
}
