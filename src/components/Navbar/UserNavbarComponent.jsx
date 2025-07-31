import React, { useState } from "react";
import { Button, useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import TranslateIcon from "@mui/icons-material/Translate";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SharmalLogo from "../../assets/icons/Logo.png";
import ads1 from "../../assets/images/ads/ads1.png"; // Adjust the path as needed
import postAdsBtnImage from "../../assets/images/postAdsBtnImage.png";
import postAdsBtnMMImage from "../../assets/images/postAdsBtnImageMM.png";
import UserExchangeRateCardComponent from "../Card/UserExchangeRateCardComponent";
import theme from "../../theme";
import { useTranslation } from "react-i18next";
import { red } from "@mui/material/colors";

function UserNavbarComponent({ history, showMenus }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [langAnchorEl, setLangAnchorEl] = useState(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen((prevOpen) => !prevOpen);
  };

  const renderMenuItems = () => (
    <Box sx={{ width: 250, paddingY: 2 }} role="presentation">
      <List>
        <ListItem button onClick={() => history.push("/home")}>
          <ListItemText primary={t("ပင်မစာမျက်နှာ")} />
        </ListItem>
        <ListItem button onClick={() =>   history.push("/property?State=အရောင်း")}>
          <ListItemText primary={t("အရောင်း")} />
        </ListItem>
        <ListItem button onClick={() =>   history.push("/property?State=အငှား")}>
          <ListItemText primary={t("အငှား")} />
        </ListItem>

        {/* <ListItem button onClick={handleSubMenuToggle}>
          <ListItemText primary={t("အိမ်ခြံမြေ")} />
          {isSubMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => history.push("/property?State=ရောင်းရန်")}
            >
              <ListItemText primary={t("အိမ်ခြံမြေ အရောင်း")} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => history.push(`/property?State=ငှားရန်`)}
            >
              <ListItemText primary={t("အိမ်ခြံမြေ အငှား")} />
            </ListItem>
          </List>
        </Collapse> */}

        <ListItem button onClick={() => history.push("/car")}>
          <ListItemText primary={t("ကား")} />
        </ListItem>
        <ListItem button onClick={() => history.push("/blog")}>
          <ListItemText primary={t("news")} />
        </ListItem>
        <ListItem button onClick={() => history.push("/contact")}>
          <ListItemText primary={t("ဆက်သွယ်ရန်")} />
        </ListItem>

        <Divider sx={{ my: 1 }} />

        {/* ✅ Login with icon */}
        <ListItem button onClick={() => history.push("/member/login")}>
          <LoginIcon sx={{ mr: 1 }} />
          <ListItemText primary={t("Login")} />
        </ListItem>

        {/* ✅ Register with icon */}
        <ListItem button onClick={() => history.push("/member/register")}>
          <AppRegistrationIcon sx={{ mr: 1 }} />
          <ListItemText primary={t("Register")} />
        </ListItem>

        <Divider sx={{ my: 1 }} />

        {/* 🌐 Language Selector */}
        <ListItem>
          <TranslateIcon sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {t("ဘာသာစကား") || "Language"}
          </Typography>
        </ListItem>
        <ListItem button onClick={() => changeLanguage("my")}>
          <ListItemText primary="မြန်မာ" />
        </ListItem>
        <ListItem button onClick={() => changeLanguage("en")}>
          <ListItemText primary="English" />
        </ListItem>
        <ListItem button onClick={() => changeLanguage("ja")}>
          <ListItemText primary="日本語" />
        </ListItem>
        {/* add post an ads button */}
        <Divider sx={{ my: 1 }} />
        <ListItem button onClick={() => history.push("/member/manage")}>
          <ListItemText primary={t("Ads")} />
        </ListItem>
        <Divider sx={{ my: 1 }} />
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        //sx={{ backgroundColor: theme.homePage.navbar, paddingX: "20px" }}
        sx={{ backgroundColor: theme.homePage.navbar, px: { xs: 1, md: 1 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {isMobile ? (
            <>
              <img
                src={SharmalLogo}
                alt="logo"
                style={{ height: "40px", cursor: "pointer" , borderRadius : "50%"}}
                onClick={() => history.push("/home")}
              />
              <IconButton edge="end" onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: "#000000" }} />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {renderMenuItems()}
              </Drawer>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* Left: Logo */}
              {/* <Box
                onClick={() => history.push("/home")}
                sx={{ cursor: "pointer" }}
              >
                <img src={SharmalLogo} alt="logo" style={{ height: "40px" }} />
              </Box> */}

              {/* Center: Menu */}
              {/* <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  onClick={() => history.push("/home")}
                  sx={{ cursor: "pointer", color: "#000000", fontWeight: 500 }}
                >
                  {t("ပင်မစာမျက်နှာ")}
                </Typography>

                <Box
                  onClick={handleMenuOpen}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "#000000",
                    fontWeight: 500,
                  }}
                >
                  {t("အိမ်ခြံမြေ")} <KeyboardArrowDownIcon />
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => history.push(`/property?State=ရောင်းရန်`)}
                  >
                    {t("အိမ်ခြံမြေ အရောင်း")}
                  </MenuItem>
                  <MenuItem
                    onClick={() => history.push(`/property?State=ငှားရန်`)}
                  >
                    {t("အိမ်ခြံမြေ အငှား")}
                  </MenuItem>
                </Menu>

                <Typography
                  onClick={() => history.push("/car")}
                  sx={{ cursor: "pointer", color: "#000000", fontWeight: 500 }}
                >
                  {t("ကား")}
                </Typography>
                <Typography
                  onClick={() => history.push("/blog")}
                  sx={{ cursor: "pointer", color: "#000000", fontWeight: 500 }}
                >
                  {t("သိကောင်းစရာ")}
                </Typography>
                <Typography
                  onClick={() => history.push("/contact")}
                  sx={{ cursor: "pointer", color: "#000000", fontWeight: 500 }}
                >
                  {t("ဆက်သွယ်ရန်")}
                </Typography>
              </Box> */}

              {/* Right: Auth + Post Ad + Language */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end", // push all to the right
                  gap: 2,
                  ml: "auto",
                  height: "32px",

                  // backgroundColor: "#F8F9FB",
                  // px: 2,
                }}
              >
                {/* Language Switch */}
                <Typography
                  onClick={() => changeLanguage("en")}
                  sx={{
                    cursor: "pointer",
                    fontWeight: i18n.language === "en" ? "bold" : "normal",
                    color:
                      i18n.language === "en"
                        ? theme.palette.primary.main
                        : "#000",
                    textDecoration:
                      i18n.language === "en" ? "underline" : "none",
                  }}
                >
                  English
                </Typography>
                <Typography sx={{ color: "#000", fontWeight: 500 }}>
                  |
                </Typography>
                <Typography
                  onClick={() => changeLanguage("my")}
                  sx={{
                    cursor: "pointer",
                    fontWeight: i18n.language === "my" ? "bold" : "normal",
                    color:
                      i18n.language === "my"
                        ? theme.palette.primary.main
                        : "#000",
                    textDecoration:
                      i18n.language === "my" ? "underline" : "none",
                  }}
                >
                  Myanmar
                </Typography>

                {/* Login / Register */}
                <Typography
                  onClick={() => history.push("/member/login")}
                  sx={{ cursor: "pointer", color: "#000", fontWeight: 500 }}
                >
                  {t("login")}
                </Typography>
                <Typography
                  onClick={() => history.push("/member/register")}
                  sx={{ cursor: "pointer", color: "#000", fontWeight: 500 }}
                >
                  {t("register")}
                </Typography>

                {/* Post An Ads Button */}
                {i18n.language === "my" ? (

                  // <Box sx={{width : 200 ,  height : "auto" , background  : "red"}}>

                  <Box   onClick={() => history.push("/member/manage")} sx={{background : "#6F1D8E",cursor :'pointer' , "&:hover" : {
                    background : "rgb(162, 36, 208)"
                  } , padding : "10px 60px" , borderTopLeftRadius : 30}}>
                  ကြော်ညာတင်ရန်
                  </Box>
                  // <Box
                  //   component="img"
                  //   src={postAdsBtnMMImage}
                  //   alt="Post An Ads"
                  //   onClick={() => history.push("/member/manage")}
                  //   sx={{
                  //     width: "auto",
                  //     height: "auto", // ✅ Keep within normal navbar height
                  //     cursor: "pointer",
                  //     objectFit: "contain",

                  //     mr: -8,
                  //     overflowX: "none",
                  //   }}
                  // />
                ) : (
                  <Box   onClick={() => history.push("/member/manage")} sx={{background : "#6F1D8E",cursor :'pointer' , "&:hover" : {
                    background : "rgb(162, 36, 208)"
                  } , padding : "10px 60px" , borderTopLeftRadius : 30}}>
                 Post An Ads
                  </Box>
                  // <Box
                  //   component="img"
                  //   src={postAdsBtnImage}
                  //   alt="Post An Ads"
                  //   onClick={() => history.push("/member/manage")}
                  //   sx={{
                  //     width: "auto",
                  //     height: "auto",
                  //     cursor: "pointer",
                  //     objectFit: "contain",
                  //     ml: 2,
                  //     mr: -8,
                  //     overflowX: "none",
                  //   }}
                  // />
                )}
              </Box>
            </Box>
          )}
        </Box>
      </AppBar>
      {/* show an ads image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="tel:09752733981" style={{ textDecoration: "none" }}>
          <Box
            component="img"
            src={ads1}
            alt="ads1"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              boxShadow: 1,
            }}
          />
        </a>
      </Box>
      {/* Center Menus */}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
            height: 64,

            backgroundColor: theme.palette.text.primary,
          }}
        >
          {/* Logo */}
          {/* <Box>
                      <img src={SharmalLogo} alt="logo" height={50} />
                    </Box> */}

          {/* Second Menu */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              flex: 1,
              color: "#fff",
              flexWrap: "wrap",
            }}
          >
            <Typography
              onClick={() => history.push("/home")}
              className="nav"
              sx={{
                cursor: "pointer",
                fontWeight: 500,
               
                display :"flex",
                alignItems :'center',
                textAlign: "center",
              }}
            >
           <div className="nav" style={{display  :  "inline"}}>      {t("home")}</div>
            </Typography>

            <Typography
             className="nav"
              onClick={() => {
                const el = document.getElementById("map");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
               
                display :"flex",
                alignItems :'center',
                textAlign: "center",
              }}
            >
              <div className="nav" style={{display  :  "inline"}}>      {t("map")}</div>
            </Typography>

            <Typography
             className="nav"
              onClick={() => history.push("/property?State=ရောင်းရန်")}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
               
                display :"flex",
                alignItems :'center',
                textAlign: "center",
              }}
            >
             <div className="nav" style={{display  :  "inline"}}>      {t("sale")}</div>
            </Typography>

            <Typography
             className="nav"
              onClick={() => history.push("/property?State=ငှားရန်")}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
               
                display :"flex",
                alignItems :'center',
                textAlign: "center",
              }}
            >
             <div className="nav" style={{display  :  "inline"}}>      {t("rent")}</div>
            </Typography>

            {/* Optional submenu logic - currently commented out
  <Box
    onClick={handleMenuOpen}
    sx={{
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      fontWeight: 500,
    }}
  >
    {t("အိမ်ခြံမြေ")} <KeyboardArrowDownIcon />
  </Box>
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={() => setAnchorEl(null)}
  >
    <MenuItem onClick={() => history.push(`/property?State=ရောင်းရန်`)}>
      {t("အိမ်ခြံမြေ အရောင်း")}
    </MenuItem>
    <MenuItem onClick={() => history.push(`/property?State=ငှားရန်`)}>
      {t("အိမ်ခြံမြေ အငှား")}
    </MenuItem>
  </Menu>
  */}

            <Typography
             className="nav"
              onClick={() => history.push("/car")}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
               
                display :"flex",
                alignItems :'center',
                textAlign: "center",
              }}
            >
             <div className="nav" style={{display  :  "inline"}}>      {t("car")}</div>
            </Typography>
            <Typography
           
              onClick={() => history.push("/blog")}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
               
                display :"flex",
                alignItems :'center',
                textAlign: "center",
              }}
            >
              <div className="nav" style={{display  :  "inline"}}>      {t("news")}</div>
            
            </Typography>

           

            <Typography
           
              onClick={() => history.push("/contact")}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                minWidth: 100,
                px: 1.5,
                display :"flex",
                alignItems :'center',
                textAlign: "center",
              }}
            >
              <div className="nav" style={{display  :  "inline"}}>  {t("contact")}</div>
            
            </Typography>
          </Box>

          {/* Right side (login, register, etc.) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* your right-side items here */}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default UserNavbarComponent;
