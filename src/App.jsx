import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from "./pages/admin/auth/LoginPage";
import MaintenancePage from "./pages/maintenance/MaintenancePage";
import DrawerComponent from './components/Drawer/DrawerComponent';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TableHeadersProvider } from "./context/TableHeaderContext";
import './assets/fonts/Poppins-Bold.ttf';
import './assets/fonts/Poppins-Light.ttf';
import './assets/fonts/NunitoSans_7pt-Regular.ttf';
import './index.css';
import HomePage from "./pages/user/HomePage";
import ContactUsPage from "./pages/user/ContactUsPage";
import NotFoundPage from './pages/NotFoundPage';
import PropertyPage from "./pages/user/PropertyPage";
import DetailPage from "./pages/user/DetailPage";
import CarPage from './pages/user/CarPage';
import BlogPage from "./pages/user/BlogPage";
import BlogDetailPage from "./pages/user/BlogDetailPage";
import PrivacyPolicyPage from "./pages/user/PrivacyPolicyPage";
import MemberLoginPage from "./pages/user/MemberLoginPage";
import MemberRegisterPage from "./pages/user/MemberRegisterPage";
import MemberForgetPasswordPage from "./pages/user/MemberForgetPasswordPage.jsx";
import MemberDrawerComponent from "./components/Drawer/MemberDrawerComponent.jsx";
import { Box } from "@mui/material";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState ,useEffect } from "react";
import theme from "./theme.js";

export default function App() {
  const [showFab, setShowFab] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Box sx={{
      position : 'relative'
    }}>
      <TableHeadersProvider >
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/admin/login' component={LoginPage} />
            <Route exact path='/admin/manage' component={DrawerComponent} />
            <Route exact path='/contact' component={ContactUsPage} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/property' component={PropertyPage}/>
            <Route exact path='/car' component={CarPage}/>
            <Route exact path='/detail' component={DetailPage}/>
            <Route exact path='/blog' component={BlogPage}/>
            <Route exact path='/blog/detail/:id' component={BlogDetailPage}/>
            <Route exact path='/privacy-policy' component={PrivacyPolicyPage}/>
            <Route exact path='/member/login' component={MemberLoginPage}/>
            <Route exact path='/member/register' component={MemberRegisterPage}/>
            <Route exact path='/member/forget-password' component={MemberForgetPasswordPage} />
            <Route exact path='/member/manage' component={MemberDrawerComponent} />
            {/* Add this Route as the fallback for undefined routes */}
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </TableHeadersProvider>
      <Zoom in={showFab}>
        <Fab
          color="red"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 40,
            boxShadow: 3,
            backgroundColor: "#3E0F56",  
            color: "#fff",              
            "&:hover": {
              border: "1px solid #3E0F56",
              color :"#3E0F56",
              backgroundColor: "#fff",  
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
      <ToastContainer />
    </Box>
  );
}
