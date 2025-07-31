import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "../../assets/icons/DashboardIcon.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ListingIcon from "../../assets/icons/ListingIcon.png";
import LogoutIcon from "../../assets/icons/LogoutIcon.png";
import Logo from "../../assets/icons/Logo.png";
import theme from "../../theme";
import { ThemeProvider } from "@emotion/react";
import MemberDashboardPage from "../../pages/member/MemberDashboardPage";
import MemberProfilePage from "../../pages/member/MemberProfilePage";
import MembershipPage from "../../pages/member/MembershipPage";
import _LogoutService from "../../service/LogoutService";
import ListingsPage from "../../pages/admin/Listings/ListingsPage";
import UserNavbarComponent from "../Navbar/UserNavbarComponent";
import comingSoonImage from "../../assets/images/ComingSoon.png"; // Adjust the path as needed
import { Fragment } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage";

const drawerWidth = 240;

function MemberDrawerComponent(props,{history}) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [listingOpen, setListingOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const drawer = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
          <img alt="Sharmal Logo" src={Logo} width={150} height={70} />
        </div>
        <List>
          <ListItem
            disablePadding
            onClick={() => handleMenuClick("Dashboard", 0)}
          >
            <ListItemButton selected={selectedItem === "Dashboard"}>
              <img src={DashboardIcon} className="icon" />
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          {/* Listings Submenu */}
          <ListItemButton onClick={() => setListingOpen(!listingOpen)}>
            <img src={ListingIcon} className="icon" />
            <ListItemText primary="Listings" />
            {listingOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listingOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => handleMenuClick("Property", 1)}
              >
                <ListItemText primary="Property" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => handleMenuClick("Car", 2)}
              >
                <ListItemText primary="Car" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItem
            disablePadding
            onClick={() => handleMenuClick("Membership", 4)}
          >
            <ListItemButton selected={selectedItem === "Membership"}>
              <WorkspacePremiumIcon
                className="icon"
                style={{ marginRight: 12 }}
              />
              <ListItemText primary="Membership" />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() => handleMenuClick("Profile", 3)}
          >
            <ListItemButton selected={selectedItem === "Profile"}>
              <AccountCircleIcon className="icon" style={{ marginRight: 12 }} />
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>

      <Box sx={{ mt: "auto" }}>
        <Divider />
        <List>
          <ListItem disablePadding onClick={_LogoutService}>
            <ListItemButton>
              <img src={LogoutIcon} className="icon" />
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
    // <ThemeProvider theme={theme}>
    //   <Box sx={{ display: "flex" }}>
    //     <CssBaseline />
    //     <AppBar
    //       position="fixed"
    //       sx={{
    //         width: { sm: `calc(100% - ${drawerWidth}px)` },
    //         ml: { sm: `${drawerWidth}px` },
    //       }}
    //     >
    //       <Toolbar>
    //         <IconButton
    //           color="inherit"
    //           aria-label="open drawer"
    //           edge="start"
    //           onClick={handleDrawerToggle}
    //           sx={{ mr: 2, display: { sm: "none" } }}
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Typography variant="h6" noWrap component="div">
    //           {selectedItem}
    //         </Typography>
    //       </Toolbar>
    //     </AppBar>
    //     <Box
    //       component="nav"
    //       sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    //       aria-label="menu"
    //     >
    //       <Drawer
    //         container={container}
    //         variant="temporary"
    //         open={mobileOpen}
    //         onClose={handleDrawerToggle}
    //         ModalProps={{ keepMounted: true }}
    //         sx={{
    //           display: { xs: "block", sm: "none" },
    //           "& .MuiDrawer-paper": {
    //             boxSizing: "border-box",
    //             width: drawerWidth,
    //           },
    //         }}
    //       >
    //         {drawer}
    //       </Drawer>
    //       <Drawer
    //         variant="permanent"
    //         sx={{
    //           display: { xs: "none", sm: "block" },
    //           "& .MuiDrawer-paper": {
    //             boxSizing: "border-box",
    //             width: drawerWidth,
    //           },
    //         }}
    //         open
    //       >
    //         {drawer}
    //       </Drawer>
    //     </Box>

    //     {/* Page Content */}
    //     <Box
    //       component="main"
    //       sx={{
    //         flexGrow: 1,
    //         p: 3,
    //         width: { sm: `calc(100% - ${drawerWidth}px)` },
    //       }}
    //     >
    //       <Toolbar />
    //       {selectedIndex === 0 && <MemberDashboardPage />}
    //       {selectedIndex === 1 && (
    //         <ListingsPage selectedCategory="ListingsProperty" />
    //       )}
    //       {selectedIndex === 2 && (
    //         <ListingsPage selectedCategory={"ListingsCar"} />
    //       )}
    //       {selectedIndex === 3 && <MemberProfilePage />}
    //       {selectedIndex === 4 && <MembershipPage />}
    //     </Box>
    //   </Box>
    // </ThemeProvider>
    <NotFoundPage type={'comingSoon'} />
  );
}

MemberDrawerComponent.propTypes = {
  window: PropTypes.func,
};

export default MemberDrawerComponent;
