import React from "react";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
import { StyledTitle } from "../UserCatagoryCard";
import theme from "../../../theme";
import { useTranslation } from "react-i18next";

export default function BlogComponent({ blogs, history, error }) {
  const {t} =useTranslation();
  return (
    <Box
      sx={{
       
      
        py: 4,
        margin : '0 auto' ,
        maxWidth : '1600px',
        width: { xs: "95%", sm: "95%", md: "90%", lg: "90%", xl: "90%" },
      }}
    >
      <Typography sx={{
        cursor : 'pointer',
        transition: "0.3s",
        "&:hover": {
          color: theme.palette.secondary.main,
        },
paddingLeft : {xs : theme.spacing(1),sm :theme.spacing(1) , md:0},
textAlign: { xs: 'center', sm: 'center' , md :'left' , lg:'left' },
fontWeight: 700,
color: "#1a1a1a",
fontSize : {xs : "1.3rem" ,sm :"1.3rem"  , md : "1.5rem"},
// marginTop: theme.spacing(2),

marginBottom : "20px",
      }} variant="h4">
      
     {t('property_and_vehicle_news')}
        
          </Typography>
     

      
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : blogs?.length > 0 ? (
        <Grid
          container
         spacing={{xs : 1, sm: 1, md: 1, lg: 2, xl: 2}}
          sx={{ mt: 2 }}
          justifyContent="center"
          alignItems="flex-start"
        >
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id} display="flex">
              <Box
                sx={{
                  width: "100%",
                  border: "1px solid #ddd",
                  cursor : 'pointer',
                  borderRadius: 2,
                  overflow: "hidden",

                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  history.push({
                    pathname: `/blog/detail/${blog?.Id}`,
                    state: { data: blog },
                  });
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${blog.Image}`}
                  alt={blog?.Title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    // borderRadius: 8,
                  }}
                />
                <Box sx={{ padding: 2, paddingTop: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: 16, fontWeight: 600 }}
                    gutterBottom
                  >
                    {blog.Title}
                  </Typography>
                  <Typography variant="body2">
                    {blog.Description.substring(0, 80)}
                  </Typography>
                  <hr
                    style={{
                      marginTop: "12px",
                      marginBottom: "6px",
                      background: "white",
                      border: "0.5px solid #E9E3DF",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">Jun 20 , 2025</Typography>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push({
                          pathname: `/blog/detail/${blog?.Id}`,
                          state: { data: blog },
                        });
                      }}
                    >
                   {   t('seeMore')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Loading blogs...</Typography>
      )}
    </Box>
  );
}
