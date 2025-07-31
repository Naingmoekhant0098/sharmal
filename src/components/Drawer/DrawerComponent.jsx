import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../../assets/icons/Logo.png";
import InquiriesIcon from "../../assets/icons/InquiriesIcon.png";
import ListingIcon from "../../assets/icons/ListingIcon.png";
import CurrencyIcon from "../../assets/icons/CurrencyIcon.png";
import DashboardIcon from "../../assets/icons/DashboardIcon.png";
import LogoutIcon from "../../assets/icons/LogoutIcon.png";
import AdsIcon from "../../assets/icons/AdsIcon.png";
import UserIcon from "../../assets/icons/UserIcon.png";
import "./DrawerStyle.css";
import DashboardPage from "../../pages/admin/dashboard/DashboardPage";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
import ExchangeRatePage from "../../pages/admin/exchangerate/ExchangeRatePage";
import _LogoutService from "../../service/LogoutService";
import InquiryPage from "../../pages/admin/inquiry/InquiryPage";
import { _AdminAuthorizeService } from "../../service/AuthorizeService";
import AdsPage from "../../pages/admin/ads/AdsPage";
import ListingsPage from "../../pages/admin/Listings/ListingsPage";
import UserPage from "../../pages/admin/user/UserPage";
import _JWTDecodeService from "./../../service/JWTDecodeService";
import { _DecryptService } from "../../service/EncryptDecryptService";
import BlogIcon from "../../assets/icons/BlogIcon.png";
import BlogPageAdmin from "../../pages/admin/blog/BlogPageAdmin";

const drawerWidth = 240;

function DrawerComponent(props) {
  useEffect(() => {
    _AdminAuthorizeService();
  });

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [UserRole, setUserRole] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    const decryptedToken = _DecryptService(sessionStorage.getItem("token"));
    const decodedToken = _JWTDecodeService(decryptedToken);
    const userRole = _DecryptService(decodedToken?.UserRole);

    setUserRole(userRole);
  }, []);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const imageMapping = {
    Dashboard: DashboardIcon,
    Listings: ListingIcon,
    "Ads Management": AdsIcon,
    Inquiries: InquiriesIcon,
    "Exchange Rate": CurrencyIcon,
    Users: UserIcon,
    Blog: BlogIcon, // ✅ new blog icon added
    Logout: LogoutIcon,
  };

  const handleMenuClick = (item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const drawer = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
          <img alt="Sharmal Official Logo" src={Logo} width={150} height={70} />
        </div>
        <List>
          {[
            "Dashboard",
            "Listings",
            "Ads Management",
            "Inquiries",
            "Exchange Rate",
            ...(UserRole === "Admin" ? ["Users"] : []),
            "Blog", // ✅ include blog
          ].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => handleMenuClick(text, index)}
              sx={{
                background:
                  selectedItem === text
                    ? "var(--Gradient-1, linear-gradient(93deg, #AC2582 -18.36%, #460F35 183.89%))"
                    : "transparent",
                color: selectedItem === text ? "white" : "inherit",
              }}
            >
              <ListItemButton>
                <img
                  src={imageMapping[text]}
                  className={selectedItem === text ? "icon-invert" : "icon"}
                />
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <Box sx={{ mt: "auto" }}>
        <Divider />
        <List>
          <ListItem
            key="Logout"
            disablePadding
            onClick={() => _LogoutService()}
          >
            <ListItemButton>
              <img src={imageMapping["Logout"]} className="icon" />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {selectedIndex !== 0 && (
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                key={selectedIndex}
              >
                {selectedItem}
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {/* render pages */}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {/* render pages */}
          {selectedIndex === 0 ? (
            <DashboardPage
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              setSelectedItem={setSelectedItem}
              setSelectedCategory={setSelectedCategory}
            />
          ) : selectedIndex === 1 ? (
            <ListingsPage selectedCategory={selectedCategory} />
          ) : selectedIndex == 2 ? (
            <AdsPage />
          ) : selectedIndex === 3 ? (
            <InquiryPage />
          ) : selectedIndex == 4 ? (
            <ExchangeRatePage />
          ) : selectedIndex == 5 ? (
            <UserPage />
          ): selectedIndex == 6 ? (
            <BlogPageAdmin />
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

DrawerComponent.propTypes = {
  window: PropTypes.func,
};

export default DrawerComponent;
