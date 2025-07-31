import React, { useState, useEffect } from "react";
import "./Slideshow.css"; // Import the CSS file
import theme from "../../theme";
import { useMediaQuery } from "@mui/material";

const UserHomepagePicturecarousel = ({ slides1 }) => {
  const [slideIndex1, setSlideIndex1] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex1((prevIndex) => (prevIndex + 1) % slides1.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides1.length]);

  return (
    <div>
      <div className="slideshow-container">
        {slides1.map((slide, index) => (
          <div
            className="mySlides1"
            style={{
              display: index === slideIndex1 ? "block" : "none",
              position: "relative",
              
            }}
            key={index}
          >
            <img
              src={`${slide.src}?t=${new Date().getTime()}`}
              style={{
                width: "100%",
                height: isMobile ? "500px" : "600px",
                objectFit: "cover",
                opacity: 0.8, // Direct image opacity (if needed)
              }}
              alt={`Slide ${index + 1}`}
            />
            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: isMobile ? "500px" : "600px",
                backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust opacity here
                zIndex: 1,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHomepagePicturecarousel;
