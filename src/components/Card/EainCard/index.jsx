import * as React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Soon from "../../../assets/images/soon.jpg";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import waveSVG from '../../../assets/images/10.svg'
import { Box } from "@mui/material";
// import HotIcon from "../../../assets/icons/HotIcon.png";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HotDeal from "../../../assets/images/simpleForHotDealProperty.png";
// import PopularIcon from "../../../assets/icons/PopularIcon.png";

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
export default function EainCard({data,isPopular,Type , history}) {
 
  const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";
  const resourceEndpoint = isProduction
    ? process.env.REACT_APP_RESOURCE_ENDPOINT
    : process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;
  let content = {};
  let imageUrl = HotDeal;
  if (Type === "Property") {
    content = data.Property || {};
    imageUrl = data.Images[0]?.ImageName
      ? `${resourceEndpoint}${data.Images[0].CreatedBy}/Property/${data.Images[0].ImageName}`
      : HotDeal;
  } else if (Type === "Car") {
    content = data.Car || {};
    imageUrl = data.Images[0]?.ImageName
      ? `${resourceEndpoint}${data.Images[0].CreatedBy}/Car/${data.Images[0].ImageName}`
      : HotDeal;
  }

  const handleDetail = (item) => {
    const Property = item?.Property ? item?.Property?.PropertyId : null;
    const Car = item?.Car ? item?.Car?.CarId : null;
    Property !== null
      ? history.push(`/detail?PropertyId=${Property}`)
      : Car !==null ? history.push(`/detail?CarId=${Car}`) : history.push(`/notfound` , {type : 'comingSoon'});
    window.scrollTo(0, 0);
  };
  return (
    <Card   onClick={() => handleDetail(data)} sx={{  height : 350 , borderRadius : '10px' ,  "&:hover": {
     
      "& .wave": {
        transform: "translateY(0%)",
        opacity: 1000000,
        zIndex : 10,
      },
      "& .overlay": {
        transform: "translateY(0%)",
       opacity:1,
        zIndex : 8,
      },
    }, }}>
      <Box sx={{position : 'relative'}}>

  
     <Box sx={{overflow : 'hidden' , position :'relative'}}>
     <Box sx={{ height: 200 , width : "100%" ,  borderRadius : '0px' , objectFit : 'cover' }} component="img" src={imageUrl} title="green iguana" >
        </Box>
       <Box>
       <Box
       className="overlay"
  sx={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, #6F1D8E, rgba(23, 22, 22, 0.2))',
    opacity: 0,
    display : 'flex',
     alignItems : 'flex-end',
    // transition: 'opacity 500ms',
    transition: "transform 0.5s ease, opacity 0.5s ease",
    '&:hover': {
      opacity: 1
    }
  }}
>
  <Box  sx={{ mb : 5 , ml : 3 , color : 'white'}}>
   <Typography sx={{ fontWeight: "600", fontSize: "20px" }} component="div">   
   {content.Code || "Property Title"}
   </Typography>
   <Typography sx={{ fontWeight: "600", fontSize: "16px"  }} component="div">
  {content.Price || "N/A"}
   <Typography variant="p">သိန်း</Typography>
                        <Typography
                          variant="p"
                          sx={{
                            
                            fontSize: "12px",
                            
                          }}
                        >
                          (ညှိနှိုင်း)
                        </Typography>
   </Typography>
  </Box>
  </Box>
       <Box
                      className="wave"
                      sx={{
                        position: "absolute",
                        bottom: -5,
                        width: "100%",
                        height: "100px",
                        backgroundImage: `url(${waveSVG})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        transform: "translateY(100%)",
                        transition: "transform 0.5s ease, opacity 0.5s ease",
                        opacity: 0,
                        zIndex: 10,  
                      
                      }}
                    />
       </Box>
     </Box>
                
      
      <Box sx={{position :'absolute', zIndex : 10 ,  top : 10 , right : 10 ,borderRadius : "50%",width :40 , height : 40 , display :'flex' , alignItems :'center' , justifyContent :'center' , background : 'rgba(255,255,255,0.7)' }}>
     {
      !isPopular ? <LocalFireDepartmentIcon sx={{ color: "#6F1D8E" , fontSize : 25}} /> :
      <AutoAwesomeIcon sx={{ color: "#6F1D8E" , fontSize : 25}} />
       
     }                      
      </Box>      
      </Box>
      <CardContent sx={{ padding: 2, paddingTop: 1 }}>
        <Typography sx={{ fontWeight: "600" }} >
        {content.Title?.length > 60  ? content.Title?.slice(0,65)+"...." : content?.Title || "Property Title"}
        </Typography>
        <hr
                    style={{
                      marginTop: "12px",
                      marginBottom: "6px",
                      background: "white",
                      border: "0.5px solid #E9E3DF",
                    }}
                  />
        <Typography variant="body2" sx={{ color: "#3E0F56", marginTop : 1.5 , fontWeight : '600', fontSize:"16px" }}>
        {content.Price || "N/A"} <Typography variant="p">သိန်း</Typography>
                        <Typography
                          variant="p"
                          sx={{
                            
                            fontSize: "12px",
                            
                          }}
                        >
                          (ညှိနှိုင်း)
                        </Typography>
        </Typography>
        <Box sx={{display : "flex" , alignItems :'center' , gap : 0.3 , marginTop : 1}}>
          <FmdGoodIcon fontSize="sm"/>
          <Typography  sx={{ color: "text.secondary" , fontSize : 13 , marginTop : -0.5 }}>
           {content.Location || "Property Location"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
