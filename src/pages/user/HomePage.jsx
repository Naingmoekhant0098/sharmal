import React, { useState, useEffect } from "react";
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent";
import UserHomepagePicturecarousel from "../../components/Card/UserHomepagePicturecarousel";
import UserInquiryFormComponent from "../../components/Dialog/Inquiry/UserInquiryFormComponent";
import UserFilterCardComponent from "../../components/Card/UserFilterCardComponent";
import UserCategoryCard from "../../components/Card/UserCatagoryCard";
import FooterComponent from "../../components/Footer/FooterComponent";
import UserpropertyByTownshipCard from "./../../components/Card/UserpropertyByTownshipCard";
import { PropertyCatagory, CarCatagory } from "../../data/homePageData";
import { GetPropertyAPI } from "../../api/Listings/property/propertyController";
import { GetCarApi } from "../../api/Listings/car/carController";
import CategoryBanner from "../../components/Category";
import DownloadAppBanner from "../../components/DownloadAppBanner";
import HomeCategory from '../../components/Card/HomeCategory/index'
import {
  Box,
  
  ThemeProvider,
  Typography,
} from "@mui/material";
import UserHomeProductSkeleton from "../../components/Skeleton/UserHomeProductSkeleton";
// import UserPopularHotDealCard from "../../components/Card/UserPopularHotDealCard";
import SplashPage from "./SplashPage";
// import ads1Image from "../../assets/images/ads1.png";

import { GetBlogAPI } from "../../api/blog/BlogController";
import BlogComponent from "../../components/Card/blog/BlogComponent";
// import ads1 from "../../assets/images/ads/ads1.png";
import AdsShowcaseComponent from "../../components/Ads/AdsShowcaseComponent";
import theme from "../../theme";
import MapComponent from "../../components/Map/MapComponent";
// import { propertiesData } from "../../data/propertiesData";
// import GetLatLongMapAPI from "../../api/map/GetLatLongController";
import CardLists from "../../components/CardsList";
import CardSlider from "../../components/CardsList/Slider";
import { useTranslation } from "react-i18next";
const url = "http://nksoftware-001-site17.dtempurl.com/upload/image/";

const slides = [
  { src: url + "caurosel/1.png" },
  // { src: url + '2.png' },
  // { src: url + '3.png' },
];

function HomePage({ history }) {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState();
  const [PropertyHotDealForSaleData, setPropertyHotDealForSaleData] = useState(
    []
  );
  const {t} =useTranslation();
  const [PeopertypropertyforSaleData, setPeopertypropertyforSaleData] =
    useState([]);
  const [PropertyHotDealforRentData, setPropertyHotDealforRentData] = useState(
    []
  );
  const [PropertyPopularforRentData, setPropertyPopularforRentData] = useState(
    []
  );
  const [CarHotDealForsaleData, setCarHotDealForsaleData] = useState([]);
  const [CarPopularForsaleData, setCarPopularForsaleData] = useState([]);
  const [TotalRecordForProperty, setTotalRecordForProperty] = useState(0);
  const [TotalRecoedForCar, setTotalRecoedForCar] = useState(0);
  const [Data, setData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setLoading((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // 2 seconds total

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const isInquiryPopup = sessionStorage.getItem("isInquiryPopup");

    if (isInquiryPopup !== "false") {
      setOpenDialog(true);
    }
  }, []);

  useEffect(() => {
    const fetchAllPropertyData = async () => {
      try {
        const payload = {
          PageNo: 1,
          PageSize: 1,
        };
        await GetPropertyAPI(payload, setData, setTotalRecordForProperty);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    const fetchPropertyForMapData = async () => {
      try {
        const payload = {
          PageNo: 1,
          PageSize: 25,
          Status: "ရောင်းရန်",
        };
        await GetPropertyAPI(payload, setMapData, setTotalRecordForProperty);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching map data for property", error);
      }
      // try{
      //   GetLatLongMapAPI("မရမ်းကုန်း")
      // }
      // catch(error){
      //   console.error("ERror getting lat long",error)
      // }
    };

    const fetchAllCarData = async () => {
      try {
        const payload = {
          PageNo: 1,
          PageSize: 1,
        };
        await GetCarApi(payload, setData, setTotalRecoedForCar);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    const fetchPropertyHotDealForSaleData = async () => {
      try {
        const payload = {
          PageNo: 1,
          PageSize: 4,
          IsHotDeal: "true",
          Status: "ရောင်းရန်",
        };
        await GetPropertyAPI(payload, setPropertyHotDealForSaleData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    const fetchPropertyPopularForSaleData = async () => {
      try {
        const payload = {
          PageNo: 1,
          PageSize: 4,
          IsPopular: "true",
          Status: "ရောင်းရန်",
        };
        await GetPropertyAPI(
          payload,
          setPeopertypropertyforSaleData,
          setIsLoading
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    const fetchPropertyHotDealForRentData = async () => {
      try {
        const payload = {
          PageNo: 1,
          PageSize: 4,
          IsHotDeal: "true",
          Status: "ငှားရန်",
        };
        await GetPropertyAPI(
          payload,
          setPropertyHotDealforRentData,
          setIsLoading
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    const fetchPropertyPropularForRentData = async () => {
      try {
        const payload = {
          PageNo: 1,
          PageSize: 4,
          IsPopular: "true",
          Status: "ငှားရန်",
        };
        await GetPropertyAPI(
          payload,
          setPropertyPopularforRentData,
          setIsLoading
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    const fetchCarHotDealForSaleData = async () => {
      try {
        const payload = {
          PageNo: 1,
          PageSize: 4,
          IsHotDeal: "true",
          Status: "ရောင်းရန်",
        };
        await GetCarApi(payload, setCarHotDealForsaleData, setIsLoading);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    const fetchCarPopularForSaleData = async () => {
      try {
        const payload = {
          PageNo: 1,
          PageSize: 4,
          IsPopular: "true",
          Status: "ရောင်းရန်",
        };
        await GetCarApi(payload, setCarPopularForsaleData, setIsLoading);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchAllPropertyData();
    fetchPropertyForMapData();
    fetchAllCarData();
    fetchPropertyHotDealForSaleData();
    fetchPropertyPopularForSaleData();
    fetchPropertyHotDealForRentData();
    fetchPropertyPropularForRentData();
    fetchCarHotDealForSaleData();
    fetchCarPopularForSaleData();
  }, []);

  //Blog useEffect
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await GetBlogAPI();
        setBlogs(response);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
    sessionStorage.setItem("isInquiryPopup", "false");
  };

  if (loading < 100 || IsLoading) {
    return <SplashPage loading={loading} />;
  }

  return (
    <>
      <UserNavbarComponent history={history} />

      <UserHomepagePicturecarousel slides1={slides} />

      <UserInquiryFormComponent open={openDialog} onClose={handleClose} />
      <UserFilterCardComponent
        history={history}
        TotalRecordForProperty={TotalRecordForProperty}
        TotalRecoedForCar={TotalRecoedForCar}
      /> 

      <Box
        sx={{
          display: {
            xl: "flex",
          },
          flexDirection: {
            xl: "column",
          },
          justifyContent: {
            xl: "center",
          },
          width: {
            xl: "100%",
          },
          height: {
            xl: "auto",
          },
          alignItems: {
            xl: "center",
          },
        }}
      >
          <AdsShowcaseComponent />
          <CardLists PropertyCatagoryData={PropertyCatagory}  Type="home_ads"  history={history}   Title={ t('saleProptertyevent')}/>
        <Box sx={{ my: { xs: 2.5, lg: 6 } }} id="map">
           <Typography
                  sx={{
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                    },
                    paddingLeft: { xs: theme.spacing(2), sm: theme.spacing(2), md: 0 },
                    textAlign: { xs: "center", sm: "center", md: "center", lg: "center" },
                    fontWeight: 700,
                    color: "#1a1a1a",
                    fontSize: { xs: "1.3rem", sm: "1.3rem", md: "1.5rem" },
          
                    marginBottom: "20px",
                  }}
                  variant="h4"
                >
                  {t("propertySaleYgn")}
                </Typography>
          
          <MapComponent properties={mapData} />
        </Box>

        
        
        <HomeCategory
          Title={t('property_types')}
          PropertyCatagoryData={PropertyCatagory}
          Type={"Property"}
          history={history}
        
        />
      

        {/* <UserpropertyByTownshipCard
          history={history}
          Title={t('property_by_region')}
        /> */}
        {IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          <>
            <ThemeProvider theme={theme}>
             
              <CardSlider
                Title={t('featured_property_rentals')}
                data={PropertyHotDealforRentData}
                Type={"Property"}
                history={history}
                isPopular={false}
                link={'ငှားရန်'}
                buttonText={t('seeAllRentalPropertyAds')}
              />
            </ThemeProvider>
          </>
        )}

        {/* {IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          // popular
          <UserPopularHotDealCard
            Title={"အိမ်ခြံမြေအရောင်း အထူးကြော်ငြာများ"}
            Data={PeopertypropertyforSaleData}
            Type={"Property"}
            history={history}
            isPopular={true}
          />
        )} */}

         
          <AdsShowcaseComponent />
        

        {IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          <>
            <ThemeProvider theme={theme}>
             
              <CardSlider
                Title={t('most_viewed_property_sales')}
                data={PropertyHotDealForSaleData}
                Type={"Property"}
                link={'ရောင်းရန်'}
                history={history}
                isPopular={false}
                buttonText={t('seeAllSalePropertyAds')}
              />
            </ThemeProvider>
          </>
        )}

        
          <CategoryBanner />
     

        {/* {IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          <>
            <ThemeProvider theme={theme}>
              
              <CardSlider
                Title={t('most_viewed_property_rentals')}
                data={PropertyHotDealForSaleData}
                link={'ငှားရန်'}
                Type={"Property"}
                history={history}
                isPopular={false}
                buttonText={t('seeAllRentalPropertyAds')}
              />
            </ThemeProvider>
          </>
        )} */}

        
          <AdsShowcaseComponent />
        
        {IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          <>
            <ThemeProvider theme={theme}>
              
              <CardSlider
              Title={t('most_viewed_property_rentals')}
                data={PropertyHotDealForSaleData}
                Type={"Property"}
                link={'ငှားရန်'}
                history={history}
                isPopular={true}
                buttonText={t('seeAllRentalPropertyAds')}
              />
            </ThemeProvider>
          </>
        )}

       
          <DownloadAppBanner />
      

          <UserCategoryCard
            Title={t('vehicle_types')}
            PropertyCatagoryData={CarCatagory}
            Type={"Car"}
            history={history}
          />
        {IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          <>
            <ThemeProvider theme={theme}>
              {/* <UserPopularHotDealCard
                Title={"လူကြည့်အများဆုံး အိမ်ခြံမြေအရောင်းကြော်ငြာများ"}
                Data={PropertyHotDealForSaleData}
                Type={"Property"}
                history={history}
                isPopular={false}
              /> */}
              <CardSlider
                Title={t('most_viewed_vehicle_sales')}
                data={CarHotDealForsaleData}
                Type={"Car"}
                history={history}
                isPopular={true}
                link={'ရောင်းရန်'}
                buttonText={t('seeAllCarSaleAds')}
              />
            </ThemeProvider>
          </>
        )}

        
          <AdsShowcaseComponent />
       

        {/* {IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          // popular
          <UserPopularHotDealCard
            Title={"အိမ်ခြံမြေအရောင်း အထူးကြော်ငြာများ"}
            Data={PeopertypropertyforSaleData}
            Type={"Property"}
            history={history}
            isPopular={true}
          />
        )} */}

        {/* {IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          // hot deal
          <ThemeProvider theme={theme}>
            <UserPopularHotDealCard
              Title={"အိမ်ခြံမြေအငှား အထူးကြော်ငြာများ"}
              Data={PropertyHotDealforRentData}
              Type={"Property"}
              history={history}
              isPopular={false}
            />
            <Button
              size="large"
              variant="contained"
              color="primary"
              sx={{ marginBottom: "20px", marginLeft: "20px" }}
              onClick={() => history.push("/property?State=ငှားရန်")}
            >
              အိမ်ခြံမြေအငှားကြော်ငြာများအားလုံး
            </Button>
          </ThemeProvider>
        )}

        {IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          // popular
          <UserPopularHotDealCard
          
            Data={PropertyPopularforRentData}
            Type={"Property"}
            history={history}
            isPopular={true}
          />
        )}   */}
        {/* <UserCategoryCard
          Title={"ကားအမျိုးအစားများ"}
          PropertyCatagoryData={CarCatagory}
          Type={"Car"}
          history={history}
        /> */}
        {/* 
        {IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          <div
            style={{
              marginTop: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemeProvider theme={theme}>
              <UserPopularHotDealCard
                Title={"ကားအရောင်း အထူးကြော်ငြာများ"}
                Data={CarHotDealForsaleData}
                Type={"Car"}
                history={history}
                isPopular={false}
              />
              <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/car?Type=All")}
                >
                  ကားအရောင်းကြော်ငြာများအားလုံး
                </Button>
              </Box>
            </ThemeProvider>
          </div>
        )} */}

        {/* {IsLoading ? (
          <UserHomeProductSkeleton />
        ) : (
          <ThemeProvider theme={theme}>
            <UserPopularHotDealCard
              Title={"လူကြည့်အများဆုံး ကားအရောင်းကြော်ငြာများ"}
              Data={CarPopularForsaleData}
              Type={"Car"}
              history={history}
              isPopular={true}
            />
            <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => history.push("/car?Type=All")}
              >
                ကားအရောင်းကြော်ငြာများအားလုံး
              </Button>
            </Box>
          </ThemeProvider>
        )} */}
      </Box>
      {/* Ads */}
      {/* <Box sx={{ maxWidth: 1040, margin: "0 auto" }}>
        <Grid
          container
          spacing={2}
          sx={{ mt: 4, mb: 4 }}
          justifyContent="center" // ✅ horizontally center the grid items
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a href="tel:09752733981" style={{ textDecoration: "none" }}>
              <Box
                component="img"
                src={url + "ads/ads1.png"}
                alt="ads1"
                sx={{
                  maxWidth: 500,
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              />
            </a>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a href="tel:09752733981" style={{ textDecoration: "none" }}>
              <Box
                component="img"
                src={url + "ads/ads2.png"}
                alt="ads2"
                sx={{
                  maxWidth: 500,
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              />
            </a>
          </Grid>
        </Grid>
      </Box> */}
      {/* Blogs */}
      {/* <Container>
        <Typography
          variant="p"
          className="UserPageTitleStyle"
          sx={{
            marginBottom: "20px",
            marginLeft: { xs: "0", md: "-120px" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          သတင်းများ
        </Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : blogs?.length > 0 ? (
          <Grid container spacing={2} sx={{ mt: 2,ml: { xs: 0, md: -20 } }}>
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push({
                      pathname: `/blog/detail/${blog?.Id}`,
                      state: { data: blog }, // pass the blog data as state
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
                      borderRadius: 8,
                    }}
                  />

                  <Typography variant="h6" gutterBottom>
                    {blog.Title}
                  </Typography>
                  <Typography variant="body2">
                    {blog.Description.substring(0, 80)}
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push({
                        pathname: `/blog/detail/${blog?.Id}`,
                        state: { data: blog }, // pass the blog data as state
                      });
                    }}
                  >
                    See More
                  </Button>
                </div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>Loading blogs...</Typography>
        )}
      </Container> */}
      <Box sx={{ mt: { xs: 3, lg: 3 }, mb: { xs: 25, lg: 3 } }}>
        <BlogComponent blogs={blogs} history={history} error={error} />
      </Box>

      <FooterComponent />
    </>
  );
}

export default HomePage;
