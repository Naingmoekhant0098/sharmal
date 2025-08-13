// import { Box, Grid, Typography } from "@mui/material";
// import React, { useState } from "react";
// import DiamondIcon from "@mui/icons-material/Diamond";
// import theme from "../../../theme";
// import PostCard from "../../../components/Card/member/PostCard";
// import SwipeableViews from "react-swipeable-views";

// function Profile() {
//   const roles = [
//     { name: "All", value: "all" },
//     { name: "Accepted", value: "accepted" },
//     { name: "Pending", value: "pending" },
//     { name: "Rejected", value: "rejected" },
//   ];

//   const [current, setCurrent] = useState("all");
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     console.log(newValue);

//     setValue(newValue);
//   };
//   return (
//     <Box sx={{}}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         <img
//           style={{
//             width: "80px",
//             height: "80px",
//             borderRadius: "50%",
//             objectFit: "cover",
//           }}
//           src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2895"
//           alt="Profile"
//         />

//         <Box>
//           <Typography fontSize={22} fontWeight={600}>
//             Jonny Smith
//           </Typography>

//           <Box sx={{ display: "flex", mt: 0.5 }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 0.5,
//                 border: "1px solid grey",
//                 borderRadius: "10px",
//                 px: 1.2,
//                 py: 0.5,
//               }}
//             >
//               <DiamondIcon sx={{ fontSize: 16, color: "goldenrod" }} />
//               <Typography sx={{ fontSize: "13px", opacity: 0.5 }}>
//                 Freemium
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       {/* Roles Tabs */}
//       <Box
//         sx={{
//           display: "flex",
//           background: "#f4f4f4",
//           p: { xs: 0.2, sm: 0.2, md: 0.5, lg: 0.5, xl: 0.5 },
//           mt: 4,
//           borderRadius: "10px",
//           width: "100%",
//           maxWidth: 500,
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: 4,
//             left: `${
//               roles.findIndex((r, index) => index === value) *
//               (100 / roles.length)
//             }%`,
//             width: `${100 / roles.length}%`,
//             height: "calc(100% - 8px)",
//             background: theme.palette.primary.main,
//             borderRadius: "10px",
//             transition: "left 0.3s ease",
//             zIndex: 0,
//           }}
//         />
//         {roles.map((role, index) => (
//           <Box
//             key={role.value}
//             onClick={() => setValue(index)}
//             sx={{
//               flex: 1,
//               textAlign: "center",
//               p: 1.5,
//               cursor: "pointer",
//               color: value === index ? "white" : "black",
//               fontWeight: 500,
//               zIndex: 1,
//               fontSize: "14px",
//               userSelect: "none",
//             }}
//           >
//             {role.name}
//           </Box>
//         ))}
//       </Box>

//       <SwipeableViews
//          style={{ width: "100%", height: "100%" }}
//          containerStyle={{ width: "100%", height: "100%" }}
//         index={value}
//         onChangeIndex={(index) => setValue(index)}
//         // disabled // disables mobile swipe
//         enableMouseEvents // allow mouse drag on desktop if needed
//       >
//         <Box
//         sx={{
//             width: "100%",
//             minHeight: "100vh", // take full mobile screen
//             boxSizing: "border-box",
//             p: 2,
//           }}
//         >
//         <Box sx={{
//             display: "grid",
//             mt :4,
//             gap: { xs: 2, sm: 1, md: 2 },
//             gridTemplateColumns: {
//                 xs: "1fr", // mobile: 1 column
//                 sm: "repeat(2, 1fr)", // tablet: 2 columns
//                 md: "repeat(3, 1fr)", // desktop: 3 columns
//               },

//         //    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//             gridAutoRows: "minmax(100px, auto)",
//       }}>

//                  <PostCard status={'accepted'} />
//                  <PostCard status={'rejected'} />
//                  <PostCard status={'pending'} />

//                  <PostCard status={'accepted'} />

//       </Box>
//         </Box>
//         <Box
//         sx={{
//             width: "100%",
//             minHeight: "100vh", // take full mobile screen
//             boxSizing: "border-box",
//             p: 2,
//           }}
//         >

//         <Box
//           sx={{
//             display: "grid",
//             mt: 4,
//             gap: { xs: 2, sm: 1, md: 2 },

//             gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//             gridAutoRows: "minmax(100px, auto)",
//           }}
//         >
//           {Array.from({ length: 10 }).map((_, i) => {
//             return <PostCard status={"accepted"} />;
//           })}
//         </Box>
//         </Box>
//         <Box
//         sx={{
//             width: "100%",
//             minHeight: "100vh", // take full mobile screen
//             boxSizing: "border-box",
//             p: 2,
//           }}
//         >

//         <Box sx={{
//               display: "grid",
//               mt :4,
//               gap: { xs: 2, sm: 1, md: 2 },

//              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//               gridAutoRows: "minmax(100px, auto)",
//         }}>
//            {
//             Array.from({length:10}).map((_,i)=>{
//                 return  <PostCard status={'pending'} />
//             })
//            }
//         </Box>
//         </Box>

//         <Box
//         sx={{
//             width: "100%",
//             minHeight: "100vh", // take full mobile screen
//             boxSizing: "border-box",
//             p: 2,
//           }}
//         >
//         <Box sx={{
//             display: "grid",
//             mt :4,
//             gap: { xs: 2, sm: 1, md: 2 },

//            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//             gridAutoRows: "minmax(100px, auto)",
//       }}>
//          {
//           Array.from({length:10}).map((_,i)=>{
//               return  <PostCard status={'accerejectedpted'} />
//           })
//          }
//       </Box>
//         </Box>
//       </SwipeableViews>

//       {/* <Box>
//        {
//         current =='accepted' ? ( ) : current=="pending" ? ( ):
//         current=="rejected" ?( ):(

//       )
//        }

//       </Box> */}
//     </Box>
//   );
// }
// export default Profile;

import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import DiamondIcon from "@mui/icons-material/Diamond";
import theme from "../../../theme";
import PostCard from "../../../components/Card/member/PostCard";
import SwipeableViews from "react-swipeable-views";

function Profile() {
  const roles = [
    { name: "All", value: "all" },
    { name: "Accepted", value: "accepted" },
    { name: "Pending", value: "pending" },
    { name: "Rejected", value: "rejected" },
  ];

  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <img
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2895"
          alt="Profile"
        />
        <Box>
          <Typography fontSize={22} fontWeight={600}>
            Jonny Smith
          </Typography>
          <Box sx={{ display: "flex", mt: 0.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                border: "1px solid grey",
                borderRadius: "10px",
                px: 1.2,
                py: 0.5,
              }}
            >
              <DiamondIcon sx={{ fontSize: 16, color: "goldenrod" }} />
              <Typography sx={{ fontSize: "13px", opacity: 0.5 }}>
                Freemium
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

     <Box
     sx={{
        position :{xs :"sticky", sm : 'sticky' , md :"relative" , lg :"relative" , xl :"relative"},
        top :0,
        zIndex :"100",
        width :'100%',
        background:'white'
     }}
     >
     <Box
        sx={{
         
          display: "flex",
          background: "#f4f4f4",
          p: 0.5,
          mt: 4,
          borderRadius: "10px",
          width: "100%",
          maxWidth: 500,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 4,
            left: `${value * (100 / roles.length)}%`,
            width: `${100 / roles.length}%`,
            height: "calc(100% - 8px)",
            background: theme.palette.primary.main,
            borderRadius: "10px",
            transition: "left 0.3s ease",
            zIndex: 0,
          }}
        />
        {roles.map((role, index) => (
          <Box
            key={role.value}
            onClick={() => setValue(index)}
            sx={{
              flex: 1,
              textAlign: "center",
              p: 1.5,
              cursor: "pointer",
              color: value === index ? "white" : "black",
              fontWeight: 500,
              zIndex: 1,
              fontSize: "14px",
              userSelect: "none",
            }}
          >
            {role.name}
          </Box>
        ))}
      </Box>
     </Box>

      <SwipeableViews
        index={value}
        onChangeIndex={(index) => setValue(index)}
        enableMouseEvents
        style={{ width: "100%" }}
        containerStyle={{ width: "100%" }}
        animateHeight
      >
        <Box sx={{ width: "100%", minHeight: "calc(100vh - 250px)", mt: 2 }}>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, sm: 2, md: 3 },
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
            }}
          >
            <PostCard status={"accepted"} />
            <PostCard status={"rejected"} />
            <PostCard status={"pending"} />
            <PostCard status={"accepted"} />
          </Box>
        </Box>

        {/* Accepted */}
        <Box sx={{ width: "100%", minHeight: "calc(100vh - 250px)", mt: 2 }}>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, sm: 2, md: 3 },
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
            }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <PostCard key={i} status={"accepted"} />
            ))}
          </Box>
        </Box>

        {/* Pending */}
        <Box sx={{ width: "100%", minHeight: "calc(100vh - 250px)", mt: 2 }}>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, sm: 2, md: 3 },
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
            }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <PostCard key={i} status={"pending"} />
            ))}
          </Box>
        </Box>

        {/* Rejected */}
        <Box sx={{ width: "100%", minHeight: "calc(100vh - 250px)", mt: 2 }}>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, sm: 2, md: 3 },
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
            }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <PostCard key={i} status={"rejected"} />
            ))}
          </Box>
        </Box>
      </SwipeableViews>
    </Box>
  );
}

export default Profile;
