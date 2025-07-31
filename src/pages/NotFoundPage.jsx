import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import notFoundImage from "../assets/images/404.png";
import comingsoonImage from "../assets/images/ComingSoon.png"; // Adjust the path as needed
import UserNavbarComponent from "../components/Navbar/UserNavbarComponent";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const NotFoundPage = () => {
  const history = useHistory();
  const location = useLocation();
  const type = location.state?.type;
  // console.log(type)

  const handleGoBack = () => {
    history.push("/"); // Redirect to the home or any other page
  };

  return (
    <Fragment>
      <UserNavbarComponent history={history} />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
          background: "linear-gradient(180deg, #E0DEF7 0%, rgba(224, 222, 247, 0) 100%)",
        }}
      >
        <Box
          component="img"
          src={type === "comingSoon" ? comingsoonImage : notFoundImage}
          alt="404"
          sx={{
            width: "100%",
            maxWidth: "400px", // Adjust width as needed
            marginBottom: "20px",
          }}
        />
      </Box>
    </Fragment>
  );
};

export default NotFoundPage;
