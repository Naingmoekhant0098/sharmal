import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Button,
} from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import GradientButtonComponent from "../Button/GradientButtonComponent";
import RadioComponent from "../Radio/RadioComponent";
import { toast } from "react-toastify";
import { GetInquiryAPI } from "../../api/inquiry/InquiryController";
import "./DrawerStyle.css";
import LoadingButton from '@mui/lab/LoadingButton';

const InquiryFilterDrawerComponent = ({
  selectedCategory,
  isFilterDrawerOpen,
  handleFilterClose,
  setData,
  setIsLoading,
  isLoading
}) => {
  // Default filter states
  const [statusFilters, setStatusFilters] = useState("All");
  const [inquiryStatus, setInquiryStatus] = useState("All");

  const handleStatusFilterChange = (event) => {
    setStatusFilters(event.target.value);
  };

  const handleInquiryStatusChange = (event) => {
    setInquiryStatus(event.target.value);
  };

  const handleResetFilters = () => {
    setStatusFilters("All");
    setInquiryStatus("All");
  };

  const handleUpdateResults = async () => {
    const payload = {
      PageNo: 1,
      PageSize: 10,
      Status: selectedCategory !== "Property"
        ? ""
        : statusFilters === "All"
          ? ""
          : statusFilters === "sale"
            ? "ရောင်းရန်"
            : "ငှားရန်",
      InquiryStatus: inquiryStatus === "All" ? "" : inquiryStatus,
      FilterType: selectedCategory
    };

    handleFilterClose();
    setIsLoading(true);

    try {
      await GetInquiryAPI(payload, setData);
    } catch (error) {

      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isFilterDrawerOpen}
      onClose={handleFilterClose}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 2,
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
          {
            selectedCategory === "Property" && (
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
                    componentsProps={{
                      typography: {
                        sx: {
                          fontSize: 16,
                        },
                      },
                    }}
                  />
                  <FormControlLabel
                    value="sale"
                    control={<RadioComponent />}
                    label="ရောင်းရန်"
                    componentsProps={{
                      typography: {
                        sx: {
                          backgroundColor: "#FF98DF80",
                          borderRadius: "21.46px",
                          padding: "5px 10px",
                          fontSize: 9,
                          border: "0.72px solid #FF98DF",
                          color: "#C40087",
                        },
                      },
                    }}
                  />
                  <FormControlLabel
                    value="rent"
                    control={<RadioComponent />}
                    label="ငှားရန်"
                    componentsProps={{
                      typography: {
                        sx: {
                          backgroundColor: "#FBB96F80",
                          borderRadius: "21.46px",
                          padding: "5px 10px",
                          fontSize: 9,
                          border: "0.72px solid #FBB96F",
                          color: "#AB5B00",
                        },
                      },
                    }}
                  />
                </RadioGroup>
              </Box>
            )
          }


          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Inquiry Status</Typography>
            <RadioGroup
              value={inquiryStatus}
              onChange={handleInquiryStatusChange}
            >
              <FormControlLabel
                value="All"
                control={<RadioComponent />}
                label="All"
              />
              <FormControlLabel
                value="Done"
                control={<RadioComponent />}
                label="Done"
                componentsProps={{
                  typography: {
                    sx: {
                      backgroundColor: '#28B31C33',
                      borderRadius: '21.46px',
                      padding: '5px 10px',
                      fontSize: 9,
                      border: '0.72px solid #28B31CF',
                      color: '#096D00'
                    },
                  },
                }}
              />
              <FormControlLabel
                value="Unread"
                control={<RadioComponent />}
                label="Unread"
                componentsProps={{
                  typography: {
                    sx: {
                      backgroundColor: '#C3000033',
                      borderRadius: '21.46px',
                      padding: '5px 10px',
                      fontSize: 9,
                      border: '0.72px solid #C30000',
                      color: '#C30000'
                    },
                  },
                }}
              />
            </RadioGroup>
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-start", gap: 1, mt: 2 }}
        >
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

export default InquiryFilterDrawerComponent;