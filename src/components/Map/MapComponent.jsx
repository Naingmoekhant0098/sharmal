import React from "react";
import { MapContainer, TileLayer,ZoomControl } from "react-leaflet";
import HoverableMarkerComponent from "./HoverableMarkerComponent";
import { cityCoordinates } from "../../data/cityCoordinates";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Typography } from "@mui/material";
import { StyledTitle } from "../Card/UserCatagoryCard";
import theme from "../../theme";
import { useTranslation } from "react-i18next";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapComponent = ({ properties }) => {
  const { t } = useTranslation();
  return (
    
     
      <Box
        sx={{
          // width: '100%',
          maxWidth: "1600px",
          width: {
            xs: "95%",
            sm: "95%",
            md: "90%",
            lg: "90%",
            xl: "100%",
            
          
          },
         
          margin: "0 auto",
          borderRadius: "12px",
          overflow: "hidden",
          maxHeight : {sm : "300px" , md : "300px" , lg : "600px" , xl : "800px"},

          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginTop: 4,
        }}
      >
        <MapContainer
          center={[16.8, 96.15]}
          zoom={11}
          scrollWheelZoom={false} 
           zoomControl={true}
          style={{ height: "70vh", width: "100vw" }}
        >
        
          <TileLayer
            attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
             <ZoomControl position="topright" />
          {properties?.map((item) => {
            const property = item?.Property;
            const images = item?.Images;
            if (!property) return null;

            const coords = cityCoordinates[property.City];
            if (!coords) return null;

            return (
              <HoverableMarkerComponent
                key={property.PropertyId}
                position={coords}
                property={property}
                images={images}
              />
            );
          })}
        </MapContainer>
      </Box>
 
  );
};

export default MapComponent;
