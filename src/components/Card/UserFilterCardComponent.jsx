import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import sharmalLogo from "../../assets/images/SharmalLogo.png";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import {
  GetDivisionTownshipAPI,
  GetManufacturers,
  GetPropertyTypes,
} from "../../api/constant/GetConstantDataController";
import { GetAllNeededDataForProperty } from "../../api/Listings/property/propertyController";
import { GetAllNeededDataFromCarApi } from "../../api/Listings/car/carController";
import theme from "../../theme";
import { use } from "react";
import { useTranslation } from "react-i18next";

// Styled components
const CustomTextField = styled(TextField)(({ theme }) => ({
  width: "250px",
  height: "60px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
  borderRight: "1px solid #e0def7",
}));

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  width: "250px",
  height: "60px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent", // Remove the border
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Ensure border is removed on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Ensure border is removed when focused
    },
    "& .MuiSelect-select": {
      padding: "16.5px 14px", // Adjust padding as needed
    },
    borderRight: "1px solid #e0def7",
  },
}));
const UserFilterCardComponent = ({
  history,
  TotalRecordForProperty,
  TotalRecoedForCar,
}) => {
  const [selected, setSelected] = useState("Property");
  const [age, setAge] = React.useState("");
  const [DataForDivision, setDataForDivision] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [City, setCity] = useState("");
  const [Type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [TypeForProperty, setTypeForProperty] = useState([]);
  const [Status, setStatus] = useState("");
  const [MinPrice, setMinPrice] = useState("");
  const [MaxPrice, setMaxPrice] = useState("");
  const [Condition, setCondition] = useState("");
  const [AvaliableManufactuer, setAvaliableManufactuer] = useState([]);
  const [AvaliableYear, setAvaliableYear] = useState([]);
  const [AvaliableColor, setAvaliableColor] = useState([]);
  const [AvaliablePlateDivision, setAvaliablePlateDivision] = useState([]);
  const [AvaliablePlateColor, setAvaliablePlateColor] = useState([]);
  const [AvaliableCarModel, setAvaliableCarModel] = useState([]);
  const [Manufacturer, setManufacturer] = useState("");
  const [Model, setModel] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [code, setCode] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchClick = () => {
    if (Status === "ရောင်းရန်") {
      let url = "/property?State=ရောင်းရန်";

      if (City !== "") {
        url += `&City=${City}`;
      }
      if (location !== "") {
        url += `&location=${location}`;
      }
      if (Type !== "") {
        url += `&Type=${Type}`;
      }
      if (MinPrice !== "") {
        url += `&MinPrice=${MinPrice}`;
      }
      if (MaxPrice !== "") {
        url += `&MaxPrice=${MaxPrice}`;
      }

      history.push(url);
    } else if (Status === "ငှားရန်") {
      let url = "/property?State=ငှားရန်";

      if (City !== "") {
        url += `&City=${City}`;
      }
      if (location !== "") {
        url += `&location=${location}`;
      }
      if (Type !== "") {
        url += `&Type=${Type}`;
      }
      if (MinPrice !== "") {
        url += `&MinPrice=${MinPrice}`;
      }
      if (MaxPrice !== "") {
        url += `&MaxPrice=${MaxPrice}`;
      }

      history.push(url);
    } else if (selected === "Car") {
      let url = "/car?";

      if (Condition !== "") {
        url += `&Condition=${Condition}`;
      }
      if (Model !== "") {
        url += `&Model=${Model}`;
      }
      if (location !== "") {
        url += `&location=${location}`;
      }
      if (Manufacturer !== "") {
        url += `&Manufacturer=${Manufacturer}`;
      }
      if (MinPrice !== "") {
        url += `&MinPrice=${MinPrice}`;
      }
      if (MaxPrice !== "") {
        url += `&MaxPrice=${MaxPrice}`;
      }

      history.push(url);
    } else if (selected === "Code") {
      let url = "/property?Code=" + code;
      history.push(url);
    }
  };

  useEffect(() => {
    const fetchStateDivision = async () => {
      try {
        await GetDivisionTownshipAPI(setDataForDivision);
        await GetPropertyTypes(setPropertyTypes);
        await GetManufacturers(setAvaliableManufactuer);
      } catch (error) {
        console.error("Error fetching StateDivision:", error);
      }
    };

    fetchStateDivision();
  }, [TotalRecordForProperty]);

  const handleSelectChange = (value) => {
    setSelected(value);
  };

  const handleChange = (name, value) => {
    switch (name) {
      case "location":
        const index = DataForDivision.findIndex((item) => item.mm === value);
        setLocation(value);
        setSelectedIndex(index);
        setCity(""); // Reset city when location changes
        break;
      case "City":
        setCity(value);
        break;
      case "Condition":
        setCondition(value);
        break;
      case "Manufacturer":
        setManufacturer(value);
        break;
      case "Model":
        setModel(value);
        break;
      case "Type":
        setType(value);
        break;
      case "Status":
        setStatus(value);
        break;
      case "MaxPrice":
        setMaxPrice(value);
        break;
      case "MinPrice":
        setMinPrice(value);
        break;
      case "Code":
        setCode(value);
      default:
        break;
    }
  };

  const { t } = useTranslation();

  return (
    
    <Box
      className="Glassmorphism-card"
      sx={{
        position: "absolute",
        top : {xs : "260px" , sm : "260px" , md : "350px" , lg : "450px" , xl : "490px"},
        // top: isMobile ? "" : "",
        
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        maxWidth : "1600px",
        width: {xs : "90%" , sm :"90%" , md : "60%" , lg:"70%" , xl : "60%"},
        
      
      }}
    >
       <Box  sx={{fontSize : {sm : 16 , md : 16 , lg:25 , xl:28} ,position :'absolute' , top :{xs:"-120px" ,sm:"-150px" , md :"-130px" , lg : "-130px" , xl : "-120px"} ,textAlign :'center', textWrap :'wrap',fontWeight : 500  , color :'white' , mb:2 ,  width: {xs : "90%" , sm :"90%" , md : "60%" , lg:"86%" , xl : "80%"},}} >
      {t('text')}
    </Box> 
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: { xs: "center", sm: "flex-start" },
          gap: 2,
          flexWrap: "wrap",
          textAlign: { xs: "center", sm: "left" },
          px: { xs: 2, sm: 4 },
          py: 2,
          background :'red'
        }}
      > */}
        {/* <Box
          component="img"
          src={sharmalLogo}
          alt="logo"
          sx={{
            width: { xs: "50%", sm: "30%", md: "40%", xl: "16%" },
            height: "auto",
            maxWidth: 250,
            marginRight: { xs: 0, sm: "10px" },
          }}
        /> */}

        {/* <Stack spacing={0.5}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "14px", sm: "20px", md: "23px" },
              fontWeight: "bold",
            }}
            className="gradient-text"
          >
            နှင့်သင့်စိတ်ကူးထဲက
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "14px", sm: "20px", md: "23px" },
              fontWeight: "bold",
            }}
            className="gradient-text-more"
          >
            အိမ်ခြံမြေနှင့်ကားများကို
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "14px", sm: "20px", md: "23px" },
              fontWeight: "bold",
            }}
            className="gradient-text"
          >
            လွယ်ကူလျင်မြန်စွာရှာဖွေလိုက်ပါ။
          </Typography>
        </Stack> */}
      {/* </Box> */}

      <Box
        sx={{
          padding: isMobile ? "10px" : "40px",
          // marginTop: "20px",
        }}
      >
        {/* <Stack spacing={0} direction="row">           
          <Button
            variant="contained"
            onClick={() => handleSelectChange("Property")}
            sx={{
              width: isMobile ? "213px" : "250px",
              backgroundColor: selected === "Property" ? "#ffffff" : "#f5f5f5",
              color: selected === "Property" ? "#000000" : "#000000",
              borderBottom:
                selected === "Property" ? "4px solid #5B1144" : "none",
              fontWeight: "bold",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
              },
            }}
          >
            အိမ်ခြံမြေ
          </Button>

          <Button
            variant="contained"
            onClick={() => handleSelectChange("Car")}
            sx={{
              width: isMobile ? "213px" : "250px",
              backgroundColor: selected === "Car" ? "#ffffff" : "#f5f5f5",
              color: selected === "Car" ? "#000000" : "#000000",
              borderBottom: selected === "Car" ? "4px solid #5B1144" : "none",
              fontWeight: "bold",
              borderTopLeftRadius: 0,
              // borderTopRightRadius: "8px",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
              },
            }}
          >
            ကား
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSelectChange("Code")}
            sx={{
              width: isMobile ? "213px" : "250px",
              backgroundColor: selected === "Code" ? "#ffffff" : "#f5f5f5",
              color: selected === "Code" ? "#000000" : "#000000",
              borderBottom: selected === "Code" ? "4px solid #5B1144" : "none",
              fontWeight: "bold",
              // borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
              },
            }}
          >
            ကုဒ်နံပါတ်ဖြင့်ရှာဖွေပါ
          </Button>
        </Stack> */}
      

        <Stack spacing={0} direction="row">
          <Button
            variant="contained"
            onClick={() => handleSelectChange("Property")}
            sx={{
              backgroundColor: selected === "Property" ? "#ffffff" : "#f5f5f5",
              color: selected === "Property" ? "#000000" : "#000000",
              borderBottom:
                selected === "Property" ? "4px solid #5B1144" : "none",
              fontWeight: "bold",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
              },
            }}
          >
            {t("property")}
          </Button>

          <Button
            variant="contained"
            onClick={() => handleSelectChange("Car")}
            sx={{
              backgroundColor: selected === "Car" ? "#ffffff" : "#f5f5f5",
              color: selected === "Car" ? "#000000" : "#000000",
              borderBottom: selected === "Car" ? "4px solid #5B1144" : "none",
              fontWeight: "bold",
              borderTopLeftRadius: 0,
              // borderTopRightRadius: "8px",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
              },
            }}
          >
            {t("car")}
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSelectChange("Code")}
            sx={{
              backgroundColor: selected === "Code" ? "#ffffff" : "#f5f5f5",
              color: selected === "Code" ? "#000000" : "#000000",
              borderBottom: selected === "Code" ? "4px solid #5B1144" : "none",
              fontWeight: "bold",
              // borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
              },
            }}
          >
            {t("codeNo")}
          </Button>
        </Stack>

        {selected === "Code" ? (
          <Box
            sx={{
              width: "100%",
              height: "auto",
              backgroundColor: "#ffffff",
              borderTopLeftRadius: 0,
              borderTopRightRadius: "10px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              boxShadow: "37px 18px 62px -51px rgba(0,0,0,0.58);",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",

                padding: "20px",
                borderBottom: "1px solid #e0def7",
                gap: isMobile ? "0" : "40px",
              }}
            >
              <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
                <TextField
                  value={code}
                  label="အိမ်ခြံမြေ  ကား code"
                  type="text"
                  onChange={(e) => handleChange("Code", e.target.value)}
                  variant="outlined"
                  inputProps={{ maxLength: 10 }}
                  InputLabelProps={{
                    style: {
                      fontSize: isMobile ? "10px" : "16px",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      lineHeight: isMobile ? "1.5" : "1.75",
                      color: "#999", // default color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme.palette.primary.main, // focused color
                    },
                  }}
                />

                <Button
                  variant="contained"
                  sx={{
                    width: isMobile ? "90px" : "250px",
                    height: "50px",
                    backgroundColor: theme.palette.primary.main,
                    fontSize: isMobile ? "10px" : "auto",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark, // or a custom color like '#1a73e8'
                    },
                  }}
                  onClick={handleSearchClick}
                >
                  {t("search")}
                </Button>
              </Stack>
            </Box>
          </Box>
        ) : selected === "Property" ? (
          <Box
            sx={{
              width: "100%",
              height: "auto",
              backgroundColor: "#ffffff",

              borderTopLeftRadius: 0,
              borderTopRightRadius: "10px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              boxShadow: "37px 18px 62px -51px rgba(0,0,0,0.58);",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent :'space-between',
                flexDirection: "row",
                padding: "20px",
                borderBottom: "1px solid #e0def7",
                gap: isMobile ? "0" : "40px",
              }}
            >
              {/* <CustomTextField
                label="စာသား (သို့) ကြော်ငြာနံပါတ်"
                maxRows={4}
                maxWidth={8}
              /> */}

              <CustomFormControl fullWidth>
                <InputLabel
                  sx={{
                    height: "100px",
                    left: { xs: -20 },
                    fontSize: isMobile ? "10px" : "16px",
                  }}
                >
                  {t("forSaleOrRent")}
                </InputLabel>
                <Select
                  sx={{ top: { xs: -5 } }}
                  value={Status}
                  onChange={(e) => handleChange("Status", e.target.value)}
                >
                  <MenuItem value="ရောင်းရန်">{t("sale")}</MenuItem>
                  <MenuItem value="ငှားရန်">{t("rent")}</MenuItem>
                </Select>
              </CustomFormControl>

              <CustomFormControl fullWidth>
                <InputLabel
                  sx={{
                    height: "100px",
                    fontSize: isMobile ? "10px" : "16px",
                    left: { xs: -5 },
                  }}
                >
                  {t("region")}
                </InputLabel>
                <Select
                  sx={{ top: { xs: -5 }, left: { xs: 10 } }}
                  value={location}
                  label={t("region")}
                  onChange={(e) => handleChange("location", e.target.value)}
                >
                  {DataForDivision.map((Division, index) => (
                    <MenuItem key={index} value={Division.mm}>
                      {Division.mm}
                    </MenuItem>
                  ))}
                </Select>
              </CustomFormControl>

              <CustomFormControl fullWidth>
                <InputLabel
                  sx={{
                    height: "100px",
                    fontSize: isMobile ? "10px" : "16px",
                    left: { xs: 10 },
                  }}
                >
                  {t("township")}
                </InputLabel>
                <Select
                  sx={{ top: { xs: -5 }, left: { xs: 10 } }}
                  value={City}
                  label={t("township")}
                  onChange={(e) => handleChange("City", e.target.value)}
                >
                  {selectedIndex !== null &&
                  DataForDivision[selectedIndex]?.districts?.length > 0 ? (
                    DataForDivision[selectedIndex].districts.flatMap(
                      (district) =>
                        district.townships.map((township, index) => (
                          <MenuItem key={index} value={township.mm}>
                            {township.mm}
                          </MenuItem>
                        ))
                    )
                  ) : (
                    <MenuItem value="" disabled>
                      No townships available
                    </MenuItem>
                  )}
                </Select>
              </CustomFormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent : "space-between",
                flexDirection: "row",
                padding: isMobile ? "20px 3px 20px 0" : "20px",
              }}
            >
              <CustomFormControl fullWidth>
                <InputLabel
                  sx={{ height: "100px", fontSize: isMobile ? "10px" : "16px" }}
                >
                  {t("propertyType")}
                </InputLabel>
                <Select
                  sx={{ top: { xs: -5 }, left: { xs: 10 } }}
                  value={Type}
                  label="type"
                  onChange={(e) => handleChange("Type", e.target.value)}
                >
                  {propertyTypes &&
                    propertyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                </Select>
              </CustomFormControl>

              <CustomFormControl fullWidth>
                <TextField
                  value={MinPrice}
                  label={t("minimumPrice")}
                  type="number" // Makes it a numeric input
                  onChange={(e) => handleChange("MinPrice", e.target.value)}
                  variant="outlined"
                  InputLabelProps={{
                    style: {
                      height: "300px",
                      fontSize: isMobile ? "10px" : "16px", // Set the height properly as a string
                    },
                  }}
                />
              </CustomFormControl>

              <CustomFormControl fullWidth>
                <TextField
                  value={MaxPrice}
                  label={t("maximumPrice")}
                  type="number" // Makes it a numeric input
                  onChange={(e) => handleChange("MaxPrice", e.target.value)}
                  variant="outlined"
                  inputProps={{ min: 0 }}
                  InputLabelProps={{
                    style: {
                      height: "300px",
                      fontSize: isMobile ? "10px" : "16px", // Set the height properly as a string
                    },
                  }}
                />
              </CustomFormControl>

              <Button
                variant="contained"
                sx={{
                  width: isMobile ? "90px" : "250px",
                  height: "60px",
                  backgroundColor: "#6F1D8E",
                  fontSize: isMobile ? "10px" : "auto",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark, // or a custom color like '#1a73e8'
                  },
                }}
                onClick={handleSearchClick}
              >
                {t("search")}
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "auto",
              backgroundColor: "#ffffff",
              borderTopLeftRadius: 0,
              borderTopRightRadius: "10px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              boxShadow: "37px 18px 62px -51px rgba(0,0,0,0.58);",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: "20px",
                borderBottom: "1px solid #e0def7",
                gap: isMobile ? "0" : "40px",
              }}
            >
              {/* <CustomTextField
                label="စာသား (သို့) ကြော်ငြာနံပါတ်"
                maxRows={4}
                maxWidth={8}
              /> */}

              <CustomFormControl fullWidth>
                <InputLabel
                  sx={{ height: "100px", fontSize: isMobile ? "10px" : "16px" }}
                >
                  Condition အားလုံး
                </InputLabel>
                <Select
                  value={Condition}
                  label="Condition အားလုံး"
                  onChange={(e) => handleChange("Condition", e.target.value)}
                >
                  <MenuItem value="Used">Used</MenuItem>
                  <MenuItem value="Brand New">Brand New</MenuItem>
                </Select>
              </CustomFormControl>

              <CustomFormControl fullWidth>
                <InputLabel
                  sx={{ height: "100px", fontSize: isMobile ? "10px" : "16px" }}
                >
                  ကားထုတ်လုပ်သူ
                </InputLabel>
                <Select
                  value={Manufacturer}
                  label="ကားထုတ်လုပ်သူ"
                  onChange={(e) => handleChange("Manufacturer", e.target.value)}
                >
                  {AvaliableManufactuer.map((manufacturer, index) => (
                    <MenuItem key={index} value={manufacturer}>
                      {manufacturer}
                    </MenuItem>
                  ))}
                </Select>
              </CustomFormControl>
              <CustomFormControl fullWidth>
                <InputLabel
                  sx={{ height: "100px", fontSize: isMobile ? "10px" : "16px" }}
                >
                  တိုင်းဒေသကြီး
                </InputLabel>
                <Select
                  value={location}
                  label="တိုင်းဒေသကြီး"
                  onChange={(e) => handleChange("location", e.target.value)}
                >
                  {DataForDivision.map((Division, index) => (
                    <MenuItem key={index} value={Division.mm}>
                      {Division.mm}
                    </MenuItem>
                  ))}
                </Select>
              </CustomFormControl>
              {/* <CustomFormControl fullWidth>
                <InputLabel sx={{ height: '100px', fontSize: isMobile ? '10px' : '16px' }}>ကားမော်ဒယ််</InputLabel>
                <Select
                  value={Model}
                  label="ကားမော်ဒယ််"
                  onChange={(e) => handleChange('Model', e.target.value)}
                >
                  {AvaliableCarModel.map((CarModel, index) => (
                    <MenuItem key={index} value={CarModel}>
                      {CarModel}
                    </MenuItem>
                  ))}
                </Select>
              </CustomFormControl> */}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: isMobile ? "20px 3px 20px 0" : "20px",
              }}
            >
              {/* <CustomFormControl fullWidth>
                <InputLabel sx={{ height: '100px', fontSize: isMobile ? '10px' : '16px' }}>တိုင်းဒေသကြီး</InputLabel>
                <Select
                  value={location}
                  label="တိုင်းဒေသကြီး"
                  onChange={(e) => handleChange('location', e.target.value)}

                >
                  {DataForDivision.map((Division, index) => (
                    <MenuItem key={index} value={Division.mm}>{Division.mm}</MenuItem>
                  ))}
                </Select>
              </CustomFormControl> */}

              <CustomFormControl fullWidth>
                <TextField
                  value={MinPrice}
                  label="အနည်းဆုံးဈေးနှုန်း"
                  type="number" // Makes it a numeric input
                  onChange={(e) => handleChange("MinPrice", e.target.value)}
                  variant="outlined"
                  inputProps={{ min: 0 }}
                  InputLabelProps={{
                    style: {
                      height: "300px", // Set the height properly as a string
                      fontSize: isMobile ? "10px" : "16px",
                    },
                  }}
                />
              </CustomFormControl>

              <CustomFormControl fullWidth>
                <TextField
                  value={MaxPrice}
                  label="အများဆုံးဈေးနှုန်း"
                  type="number" // Makes it a numeric input
                  onChange={(e) => handleChange("MaxPrice", e.target.value)}
                  variant="outlined"
                  inputProps={{ min: 0 }}
                  InputLabelProps={{
                    style: {
                      height: "300px", // Set the height properly as a string
                      fontSize: isMobile ? "10px" : "16px",
                    },
                  }}
                />
              </CustomFormControl>

              <Button
                variant="contained"
                sx={{
                  width: isMobile ? "90px" : "250px",
                  height: "60px",
                  backgroundColor: theme.palette.primary.main,
                  fontSize: isMobile ? "10px" : "auto",
                  
                }}
                onClick={handleSearchClick}
              >
                ရှာဖွေရန်
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserFilterCardComponent;
