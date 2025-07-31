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

export default function App() {
  return (
    <>
      <TableHeadersProvider>
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
      <ToastContainer />
    </>
  );
}
