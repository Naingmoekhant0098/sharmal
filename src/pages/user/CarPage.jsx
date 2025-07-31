import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent";
import theme from "../../theme";
import { ThemeProvider } from "@emotion/react";
import FooterComponent from "../../components/Footer/FooterComponent";
import {
  Box,
  TablePagination,
  Fab,
  useMediaQuery,
  Slide,
  Backdrop,
  IconButton,
  Typography
} from "@mui/material";
import UserProductDisplayCard from "../../components/Card/UserProductDisplayCard";
import UserPropertyFilterComponent from "../../components/Drawer/UserPropertyFilterComponent";
import { GetPropertyAPI } from "../../api/Listings/property/propertyController";
import UserProductSkeletonLoader from "./../../components/Skeleton/UserProductSkeletonLoader";
import FilterListIcon from "@mui/icons-material/FilterList"; // Use MUI icon for FAB
import CloseIcon from "@mui/icons-material/Close"; // Import close icon for the filter panel
import { GetCarApi, GetCarByid } from "../../api/Listings/car/carController";
import UserCarFilterComponent from "../../components/Drawer/UserCarFilterComponent";
import FetchData from "../../components/Drawer/UserCarFilterComponent";
import GradientButtonComponent from "../../components/Button/GradientButtonComponent";

const CarPage = ({ history }) => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0); // 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [State, setState] = useState("");
  const [AddiitonFilter, setAddiitonFilter] = useState({});
  const [IsLoading, setIsLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState(false); // State to control FAB menu
  const [FormFromHomePage, setFormFromHomePage] = useState({});
  const Type = "Car";
  let allTotalCount;
  const paramLocation = useLocation(); // Use useLocation hook
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [carId, setcarId] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(paramLocation.search);
    const carIdParam = queryParams.get("CarId");

    // Extract query parameters with defaults
    const Condition = queryParams.get("Condition") || "";
    const location = queryParams.get("location") || "";
    const Model = queryParams.get("Model") || "";
    const Manufacturer =
      queryParams.get("Manufacturer") || queryParams.get("Type") || "";
    const MinPrice = queryParams.get("MinPrice") || "";
    const MaxPrice = queryParams.get("MaxPrice") || "";

    const filterFromQuery = {
      Condition,
      Model,
      Location: location,
      Manufacturer,
      MinPrice,
      MaxPrice,
    };

    // Set filters from query
    setFormFromHomePage(filterFromQuery);

    if (carIdParam) {
      setcarId(carIdParam);
      // Fetch by CarId
      GetCarByid(carIdParam, setData).finally(() => setIsLoading(false));
    } else {
      // Fetch by filters
      const payload = {
        pageNo: page + 1,
        pageSize: rowsPerPage,
        ...filterNonEmptyValues(filterFromQuery),
        ...filterNonEmptyValues(AddiitonFilter),
      };

      setIsLoading(true);
      GetCarApi(payload, setData, setTotalCount)
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setIsLoading(false));
    }
  }, [paramLocation.search, page, rowsPerPage, AddiitonFilter]);

  // Helper function to filter non-empty values
  const filterNonEmptyValues = (filter) => {
    return Object.fromEntries(
      Object.entries(filter).filter(
        ([key, value]) => value !== null && value !== ""
      )
    );
  };

  // Function to fetch data
  const fetchData = async (pageNo, pageSize, additionalFilter) => {
    setIsLoading(true);
    const payload = {
      pageNo,
      pageSize,
      ...filterNonEmptyValues(FormFromHomePage),
      ...filterNonEmptyValues(AddiitonFilter),
    };

    try {
      await GetCarApi(payload, setData, setTotalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredValues = filterNonEmptyValues(AddiitonFilter);
  const isEmptyFilter = Object.keys(filteredValues).length === 0;

  if (isEmptyFilter) {
    allTotalCount = totalCount;
  }

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
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserNavbarComponent history={history} setState={setState} />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            height: "auto",
            position: "relative",
            backgroundColor: theme.homePage.backgroundColor, // Ensure the sliding panel is positioned relative to this container
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
              maxWidth: "100%",
              padding: isSmallScreen ? 0 : 0, // Add padding for small screens
            }}
          >
            {IsLoading ? (
              <UserProductSkeletonLoader />
            ) : data && data.length > 0 ? (
              <>
              <UserProductDisplayCard
                Data={data}
                Type={Type}
                history={history}
              />
               <TablePagination
              component="div"
              height={"50px"}
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
            </>
            ) : (
              <>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{ position: "absolute", top: "10%", left: "3s0%",textAlign:'center' }}
              >
                😕 No Data Available for the selected filter.
              </Typography>
              <div style={{position:'absolute',top:'15%',left:'30%',margin:30}}>
              <GradientButtonComponent onClick={() => history.push("/home")}>
                Go Back
              </GradientButtonComponent>
              </div>
              </>
            )}

           
          </Box>

          {/* Filter Panel (always visible on larger screens, toggle on small screens) */}
          {!isSmallScreen && (
            <Box
              sx={{
                flex: 3, // 30% width
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                height: "auto",
              }}
            >
              <UserCarFilterComponent
                totalCount={allTotalCount}
                setAddiitonFilter={setAddiitonFilter}
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
              <UserCarFilterComponent
                totalCount={allTotalCount}
                setAddiitonFilter={setAddiitonFilter}
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
        <FooterComponent />         
      </ThemeProvider>
    </>
  );
};

export default CarPage;
