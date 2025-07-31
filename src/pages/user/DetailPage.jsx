import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography, ThemeProvider, useMediaQuery, Box, Slide, Fab } from '@mui/material';
import { Home, Close as CloseIcon, Mail as MailIcon, Call as CallIcon } from '@mui/icons-material';
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent";
import { useHistory, useLocation } from 'react-router-dom';
import theme from '../../theme';
import DividerComponent from '../../components/Divider/DividerComponent';
import UserPropertyDetailCard from '../../components/Card/UserPropertyDetailCard';
import UserDetailInquaryFormComponent from '../../components/Dialog/Inquiry/UserDetailInquaryFormComponent';
import UserCarDetailCard from './../../components/Card/UserCarDetailCard';
import UserRelatedProductDisplayCard from '../../components/Card/UserRelatedProductDisplayCard';
import { GetPropertyAPI, GetPropertyByid } from '../../api/Listings/property/propertyController';
import { GetCarApi, GetCarByid } from '../../api/Listings/car/carController';
import FooterComponent from './../../components/Footer/FooterComponent';
import UserHomeProductSkeleton from './../../components/Skeleton/UserHomeProductSkeleton';


export default function DetailPage() {
  const history = useHistory();
  const isMobile = useMediaQuery('(max-width:600px)'); // Detect mobile screen size
  const location = useLocation(); // Renaming params to location
  const [itemData, setitemData] = useState([]);
  const [RelatedData, setRelatedData] = useState([]);
  const [PageSize, setPageSize] = useState(4);
  const [IsLoading, setIsLoading] = useState(true);
  const [OtherData, setOtherData] = useState([]);
  const [pageNo, setpageNo] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const phoneNumber = '09752733981';

  const toggleForm = () => {
    setOpenForm((prev) => !prev);
  };


  useEffect(() => {
    const parseQueryParams = () => {
      try {
        // Step 1: Get the query parameter from the URL
        const params = new URLSearchParams(location.search);
        const propertyId = params.get('PropertyId'); // Get the Property query parameter
        const carId = params.get('CarId'); // Get the Car query parameter

        if (propertyId) {
          GetPropertyByid(propertyId, setitemData)
        }
        if (carId) {
          GetCarByid(carId, setitemData)
        }
      } catch (error) {
        console.error("Error parsing query parameter:", error); // Handle any errors
      }
    };

    parseQueryParams();
  }, [location.search]); // Corrected the dependency to 'location.search'

  useEffect(() => {
    const fetchRelatedData = async (pageNo, PageSize) => {
      try {
        if (itemData?.Property) {
          const payload = {
            PageNo: pageNo,
            PageSize: PageSize,
            Status: itemData.Property.Status,
            City: itemData.Property.City,
          };
          await GetPropertyAPI(payload, setRelatedData, setIsLoading);
        } else if (itemData?.Car) {
          const payload = {
            PageNo: pageNo,
            PageSize: PageSize,
            Model: itemData.Car.Model,
          };
          await GetCarApi(payload, setRelatedData, setIsLoading);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching related data:', error);
      }
    };

    if (itemData?.Property || itemData?.Car) {
      fetchRelatedData(pageNo, PageSize);
    }
  }, [itemData, PageSize, pageNo]);

  useEffect(() => {
    const fetchPropertyData = async (pageNo, PageSize) => {
      try {
        const payload = {
          "PageNo": pageNo,
          "PageSize": PageSize,
        };
        itemData.Property
          ? await GetPropertyAPI(payload, setRelatedData, setIsLoading)
          : await GetCarApi(payload, setRelatedData, setIsLoading);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    // Check if RelatedData is not an empty array
    if (Array.isArray(RelatedData) && RelatedData.length < 0) {
      fetchPropertyData(pageNo);
    }
  }, [RelatedData, PageSize, itemData, pageNo]);

  const handleHomeClick = () => {
    history.push('/home');
  };

  return (
    <ThemeProvider theme={theme}>
      <UserNavbarComponent history={history} />

      {/* Home Icon for navigation */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '20px', marginLeft: isMobile ? '5%' : '2%' }}>
        <IconButton onClick={handleHomeClick} style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>
          <Home />
        </IconButton>
        {itemData?.Property && (
          <Typography sx={{ fontSize: isMobile ? '10px' : '15px' }}>
            {`> အိမ်ခြံမြေ > ${itemData.Property.Location || 'N/A'} > ${itemData.Property.City || 'N/A'} > ${itemData.Property.Type || 'N/A'} > ${itemData.Property.Status || 'N/A'}`}
          </Typography>
        )}

        {itemData?.Car && (
          <Typography sx={{ fontSize: isMobile ? '10px' : '15px' }}>
            {`> ကား > ${itemData.Car.Location || 'N/A'} > ${itemData.Car.Manufacturer || 'N/A'} > ${itemData.Car.BuildType || 'N/A'} > ${itemData.Car.Model || 'N/A'}`}
          </Typography>
        )}
      </div>

      {/* Layout with image and contact form */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>

        {itemData?.Property && (
          <UserPropertyDetailCard itemData={itemData} />
        )}

        {itemData?.Car && (
          <UserCarDetailCard itemData={itemData} />
        )}

        {!isMobile && (
          <UserDetailInquaryFormComponent itemData={itemData} />
        )}
      </Grid>

      <DividerComponent />

      {itemData?.Property && (
        IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          <UserRelatedProductDisplayCard
            Title={Array.isArray(RelatedData) && RelatedData.length > 0 ? `${itemData.Property.City}ရှိအိမ်ခြံမြေအရောင်းကြော်ငြာများ` : 'အိမ်ခြံမြေအရောင်းကြော်ငြာများ'}
            Data={Array.isArray(RelatedData) && RelatedData.length > 0 ? RelatedData : OtherData}
            Type={'Property'}
            history={history}
            pageNo={pageNo}
            setpageNo={setpageNo}
            setIsLoading={setIsLoading}
          />
        )
      )}

      {itemData?.Car && (
        IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          <UserRelatedProductDisplayCard
            Title={Array.isArray(RelatedData) && RelatedData.length > 0 ? 'အလားတူ ကားအရောင်းကြော်ငြာများ' : 'ကားကြော်ငြာများ'}
            Data={Array.isArray(RelatedData) && RelatedData.length > 0 ? RelatedData : OtherData}
            Type={'Car'}
            history={history}
            pageNo={pageNo}
            setpageNo={setpageNo}
            setIsLoading={setIsLoading}
          />
        )
      )}

      <FooterComponent />

      {/* Floating Action Button for mobile */}
      {isMobile && (
        <>
        <a href={`tel://${phoneNumber}`} style={{ textDecoration: 'none' }}>
        <Fab
            color="primary"
            aria-label="contact"
            sx={{ position: 'fixed', bottom: 80, right: 16 }} // Adjusted bottom position
          // onClick={toggleOtherFunction}
          >
            <CallIcon /> {/* Replace with the desired icon */}
          </Fab>
        </a>
          
          <Fab
            color="primary"
            aria-label="contact"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={toggleForm}
          >
            <MailIcon />
          </Fab>
          <Slide direction="left" in={openForm} mountOnEnter unmountOnExit>
            <Box
              sx={{
                width: '100%',
                maxWidth: 300, // Maximum width of the sliding panel
                position: 'fixed',
                height: '100%',
                right: 0,
                top: 0,
                backgroundColor: 'white',
                boxShadow: 3,
                padding: 2,
                zIndex: 1200, // Ensure it is above other content
                overflowY: 'auto',
              }}
            >
              <IconButton
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={toggleForm}
              >
                <CloseIcon />
              </IconButton>
              <UserDetailInquaryFormComponent itemData={itemData} />
            </Box>
          </Slide>
        </>
      )}
    </ThemeProvider>
  );
}  
