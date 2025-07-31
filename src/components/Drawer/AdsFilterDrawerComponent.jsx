import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Button,
  FormControl,
  FormGroup,
  Checkbox
} from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import GradientButtonComponent from "../Button/GradientButtonComponent";
import RadioComponent from "../Radio/RadioComponent";
import { toast } from "react-toastify"; // Import toast for notifications
import "./DrawerStyle.css"; // Import the CSS file
import { GetAdsAPI, GetAdsPageAPI } from "../../api/ads/AdsController";
import LoadingButton from '@mui/lab/LoadingButton';

const AdsFilterDrawerComponent = ({
  isFilterDrawerOpen,
  handleFilterClose,
  setData,
  setIsLoading,
  setTotalCount,
  isLoading,
  setFilterPayload,
  setPage
}) => {
  // Default filter states
  const [statusFilters, setStatusFilters] = useState("All");
  const [inquiryStatus, setInquiryStatus] = useState("All");
  const [AdsPagePlacements, setAdsPagePlacements] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [selectedLayouts, setSelectedLayouts] = useState([]);


  
  useEffect(() => {
    if (isFilterDrawerOpen) {
      GetAdsPageAPI(setAdsPagePlacements);
    }
  }, [isFilterDrawerOpen]);

  const handleStatusFilterChange = (event) => {
    setStatusFilters(event.target.value);
  };

  const handlePageChange = (event) => {
    const page = event.target.value;
    setSelectedPages((prev) =>
      event.target.checked ? [...prev, page] : prev.filter((p) => p !== page)
    );
  };

  const handleLayoutChange = (event) => {
    const layout = event.target.value;
    // setSelectedLayouts((prev) =>
    //   event.target.checked ? [...prev, layout] : prev.filter((l) => l !== layout)
    // );
    // If "Any" is checked, uncheck all other layouts
  if (layout === "") {
    if (event.target.checked) {
      setSelectedLayouts([""]);
    } else {
      setSelectedLayouts([]);
    }
  } else {
    // If any other layout is checked, uncheck "Any"
    setSelectedLayouts((prev) => {
      if (event.target.checked) {
        // Remove "Any" from the selected layouts if another layout is checked
        return [...prev.filter((l) => l !== ""), layout];
      } else {
        return prev.filter((l) => l !== layout);
      }
    });
  }
  };

  const handleResetFilters = () => {
    setStatusFilters("All");
    setSelectedPages([]);
    setSelectedLayouts([]);
  };

  const handleUpdateResults = async () => {
    const payload = {
      PageNo: 1,
      PageSize: 10,
      Status: statusFilters !== "All" ? statusFilters : "",
      Pages: selectedPages.length > 0 ? selectedPages.join(',') : "",
      Layout: selectedLayouts.length > 0 ? selectedLayouts.join(',') : "",
    };
    setFilterPayload({
      Status: statusFilters !== "All" ? statusFilters : "",
      Pages: selectedPages.length > 0 ? selectedPages.join(',') : "",
      Layout: selectedLayouts.length > 0 ? selectedLayouts.join(',') : "",
    })
    handleFilterClose(); // Close drawer after updating results
    await GetAdsAPI(payload, setData, toast, setTotalCount, setIsLoading);
    setPage(0)
    
  };

  return (
    <Drawer
      anchor="right"
      open={isFilterDrawerOpen}
      // onClose={handleFilterClose}
  
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          paddingX: 5,
          paddingY: 2
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Filter your Results</Typography>
            <MuiIconButton onClick={handleFilterClose} className="icon-close">
              <CloseIcon />
            </MuiIconButton>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Status</Typography>
            <RadioGroup
              value={statusFilters}
              onChange={handleStatusFilterChange}
              name="status"
            >
              <FormControlLabel
                value="All"
                label="All"
                control={<RadioComponent />}
              />
              <FormControlLabel
                value="Active"
                control={<RadioComponent />}
                label="Active"
              />
              <FormControlLabel
                value="InActive"
                control={<RadioComponent />}
                label="Expired"
              />
            </RadioGroup>
          </Box>

          <Box sx={{ height: "auto", mb: 2 }}>
            <Typography variant="subtitle1">Pages</Typography>
            <FormControl fullWidth sx={{ display: "flex", flexDirection: "column" }}>
              {AdsPagePlacements.map((item) => (
                <FormControlLabel
                  key={item.Pages}
                  control={
                    <Checkbox
                      value={item.Pages}
                      checked={selectedPages.includes(item.Pages)}
                      onChange={handlePageChange}
                    />
                  }
                  label={item.Pages}
                />
              ))}
            </FormControl>
          </Box>

          <Box>
            <Typography variant="subtitle1">Ads Layout</Typography>
            <FormGroup sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value=""
                    checked={selectedLayouts.includes("")}
                    onChange={handleLayoutChange}
                  />
                }
                label="Any"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Carousel"
                    checked={selectedLayouts.includes("Carousel")}
                    onChange={handleLayoutChange}
                  />
                }
                label="Carousel"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Banner"
                    checked={selectedLayouts.includes("Banner")}
                    onChange={handleLayoutChange}
                  />
                }
                label="Banner"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Side Bar"
                    checked={selectedLayouts.includes("Side Bar")}
                    onChange={handleLayoutChange}
                  />
                }
                label="Side Bar"
              />
            </FormGroup>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1, margin: 0 }}>
          <Button
            sx={{ mt: 2, textTransform: "none" }}
            variant="text"
            color="text"
            onClick={handleResetFilters}
          >
            Reset Filters
          </Button>
          {isLoading ? (
            <LoadingButton loading variant="outlined">
              Submitting...
            </LoadingButton>
          ) : (
            <GradientButtonComponent onClick={handleUpdateResults}>
              Update Results
            </GradientButtonComponent>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default AdsFilterDrawerComponent;
