import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent";
import theme from "../../theme";
import { ThemeProvider } from "@emotion/react";
import FooterComponent from "../../components/Footer/FooterComponent";
 
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import { useRef } from 'react';
import {
  Box,
  TablePagination,
  Fab,
  useMediaQuery,
  Slide,
  Backdrop,
  IconButton,
  Typography,
} from "@mui/material";
import UserProductDisplayCard from "../../components/Card/UserProductDisplayCard";
import UserPropertyFilterComponent from "../../components/Drawer/UserPropertyFilterComponent";
import {
  GetPropertyAPI,
  GetPropertyByid,
} from "../../api/Listings/property/propertyController";
import UserProductSkeletonLoader from "./../../components/Skeleton/UserProductSkeletonLoader";
import FilterListIcon from "@mui/icons-material/FilterList";  
import CloseIcon from "@mui/icons-material/Close";   
import { GetCarByid } from "../../api/Listings/car/carController";
import map from "../../assets/images/mapView.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { hover } from "framer-motion";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import MapComponent from "../../components/Map/MapComponent";
import { height } from "@mui/system";
import HoverableMarkerComponent from "../../components/Map/HoverableMarkerComponent";
import { cityCoordinates } from "../../data/cityCoordinates";

const PropertyPage = ({ history }) => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0); // 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [State, setState] = useState("");
  const [AddiitonFilter, setAddiitonFilter] = useState({});
  const [IsLoading, setIsLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState(false); // State to control FAB menu
  const [FormFromHomePage, setFormFromHomePage] = useState({});
  const [propertyType, setpropertyType] = useState("");

  const Type = "Property";
  let allTotalCount;
  const paramLocation = useLocation(); // Use useLocation hook
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [propertyId, setpropertyId] = useState();
  const queryParams = new URLSearchParams(paramLocation.search);
  useEffect(() => {
   
    const Code = queryParams.get("Code") || "";

    console.log(Code);
    const State = queryParams.get("State") || "All";
    const propertyIdParam = queryParams.get("PropertyId") || ""; // Get the Property query parameter
    const propertyType = queryParams.get("PropertyType") || "";

    if (propertyType) {
      setpropertyType(propertyType);
    }
    if (State) {
      setState(State);
    }
    if (propertyIdParam) {
      setpropertyId(propertyIdParam);
    }

    const City = queryParams.get("City") || "";
    const location = queryParams.get("location") || "";
    const Type = queryParams.get("Type") || "";
    const MinPrice = queryParams.get("MinPrice") || "";
    const MaxPrice = queryParams.get("MaxPrice") || "";

    // Update the state with the values from query parameters
    setFormFromHomePage((prevState) => ({
      ...prevState,
      ...(State === "All" ? {} : { Status: State }), // Only add Status if it's not 'All'
      City: City,
      location: location,
      Code: Code,
      Type: Type,
      MinPrice: MinPrice,
      MaxPrice: MaxPrice,
    }));
  }, [paramLocation.search]);

  useEffect(() => {
    if (!propertyId && State) {
      fetchData(page + 1, rowsPerPage, AddiitonFilter, State);
    } else {
      if (propertyId) {
        GetPropertyByid(propertyId, setData);
        setIsLoading(false);
      }
    }
  }, [page, rowsPerPage, AddiitonFilter, State, propertyId, propertyType]);
console.log(data);
  const fetchDataWrapper = (filter) => {
    fetchData(page + 1, rowsPerPage, filter, filter.Status);
  };

  const filterNonEmptyValues = (filter) => {
    return Object.fromEntries(
      Object.entries(filter).filter(
        ([key, value]) => value !== null && value !== ""
      )
    );
  };

  const fetchData = async (
    pageNo,
    pageSize,
    AddiitonFilter,
    Status,
    propertyType
  ) => {
    const addStatus = !AddiitonFilter?.Status;

    const payload = {
      pageNo,
      pageSize,
      ...(addStatus && Status && Status !== "All" && { Status }),
      ...filterNonEmptyValues(FormFromHomePage),
      ...filterNonEmptyValues(AddiitonFilter), // this should overwrite FormFromHomePage
    };

    await GetPropertyAPI(payload, setData, setTotalCount, setIsLoading);
    setIsLoading(false);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleBackdropClick = () => {
    setOpenFilter(false);
  };

  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <Modal
        center
        styles={{
          modal: {
            borderRadius: "20px",
            width: "90%",
            maxWidth: "none",
            height: "90%",
          },
        }}
        open={isMapOpen}
        onClose={() => setIsMapOpen(!isMapOpen)}
        position="center"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "40%", height: "100%", overflowY: "auto" }}>
            {!isSmallScreen && (
             <Box sx={{width : "90%"}}>
               <UserPropertyFilterComponent
                totalRecord={totalCount}
                setAddiitonFilter={setAddiitonFilter}
                setIsLoading={setIsLoading}
                fetchDataWrapper={fetchDataWrapper}
              />
              </Box>
            )}
          </Box>

          <Box sx={{ width: "100%" , padding:1 }}>
            <MapContainer
              center={[16.8, 96.15]}
              zoom={11}
              
              scrollWheelZoom={true}
              
              style={{ height: "80vh", width: "100%" ,  borderRadius : "30px" }}
              // style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <AutoFitBounds data={data} />

              {data?.map((item) => {
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
        </Box>
      </Modal>
      <ThemeProvider theme={theme}>
        <UserNavbarComponent history={history} setState={setState} />

        <Box sx={{ backgroundColor: theme.homePage.backgroundColor }}>
          <Box
            sx={{
              pl: 2,
              pr: 2,
              pt: 2,
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Box sx={{ width: 250, height: 120, position: "relative" }}>
              <Box
                component="img"
                src={map}
                alt="Map"
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />

              <Box
                onClick={() => setIsMapOpen(!isMapOpen)}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  color: "white", // make text/icon visible
                  zIndex: 1,
                }}
              >
                <LocationOnIcon fontSize="large" sx={{ color: "black" }} />
                <Typography
                  sx={{
                    color: "black",
                    mt: 1,
                    textTransform: "uppercase",
                    fontWeight: 600,
                    transition: "all",
                    animationDuration: 300,
                  }}
                >
                  Search on Map
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              height: "auto",
              position: "relative",
              // Ensure the sliding panel is positioned relative to this container
            }}
          >
            {/* Left part (100% on small screens, 70% on large screens) */}
            <Box
              sx={{
                flex: isSmallScreen ? 1 : 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "auto",
                width: "100%",
                maxWidth: "100%", // Prevents extra width
                margin: "0",
                padding: isSmallScreen ? 0 : 0,
              }}
            >
              {IsLoading ? (
                <UserProductSkeletonLoader count={queryParams.get("Code") ? 1 : 3}/>
              ) : (

                <UserProductDisplayCard
                  Data={data}
                  Type={Type}
                  history={history}
                />
              )}

              <TablePagination
                component="div"
                height={"100px"}
                count={totalCount}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                sx={{
                  height: "auto", // Let it adjust to the content height
                  overflow: "hidden", // Prevent overflow issues
                }}
              />
            </Box>

            
            {!isSmallScreen && (
              <Box
                sx={{
                  flex: 3, 
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  height: "auto",
                  padding: "20px",
                }}
              >
                <UserPropertyFilterComponent
                  totalRecord={totalCount}
                  setAddiitonFilter={setAddiitonFilter}
                  setIsLoading={setIsLoading}
                  fetchDataWrapper={fetchDataWrapper}
                />
              </Box>
            )}

            {/* Floating Action Button for Filter on small screens */}
            {isSmallScreen && (
              <Fab
                color="primary"
                aria-label="filter"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                onClick={toggleFilter}
              >
                <FilterListIcon />
              </Fab>
            )}

            {/* Sliding Panel for Filter on small screens */}
            <Slide direction="left" in={openFilter} mountOnEnter unmountOnExit>
              <Box
                sx={{
                  flex: "none",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  height: "100%",
                  width: 300, // Fixed width for small screens
                  position: "fixed",
                  right: 0,
                  top: 0,
                  backgroundColor: "white",
                  boxShadow: 3,
                  padding: 2,
                  zIndex: 1200, // Ensure it is above other content
                  overflowY: "auto",
                }}
              >
                <IconButton
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={toggleFilter}
                >
                  <CloseIcon />
                </IconButton>
                <UserPropertyFilterComponent
                  totalRecord={totalCount}
                  setAddiitonFilter={setAddiitonFilter}
                  setIsLoading={setIsLoading}
                  fetchDataWrapper={fetchDataWrapper}
                />
              </Box>
            </Slide>

            {/* Backdrop for closing filter panel */}
            {isSmallScreen && openFilter && (
              <Backdrop
                open={openFilter}
                onClick={handleBackdropClick}
                sx={{ zIndex: 1100 }} // Ensure it is below the sliding panel
              />
            )}
          </Box>
        </Box>

        <FooterComponent />
      </ThemeProvider>
    </>
  );
};


function AutoFitBounds({ data }) {
  const map = useMap();
  const prevDataRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;
    
    
    if (JSON.stringify(data) === JSON.stringify(prevDataRef.current)) return;
    
    prevDataRef.current = data;

   
    const validCoords = data
      .map(item => {
        const property = item?.Property;
        if (!property) return null;
        return cityCoordinates[property.City];
      })
      .filter(coord => coord !== null && coord !== undefined);

    if (validCoords.length === 0) return;

     
    if (validCoords.length === 1) {
      map.flyTo(validCoords[0], 13);  
      return;
    }

     
    const bounds = new LatLngBounds(validCoords);
    map.flyToBounds(bounds, {
      padding: [50, 50], 
      duration: 1,  
    });

  }, [data, map]);

  return null;
}
export default PropertyPage;
