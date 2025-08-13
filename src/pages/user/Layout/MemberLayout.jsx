"use client"

import { useState } from "react"
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  useMediaQuery,
} from "@mui/material"
import { Apps, Menu, ContactMail, AssignmentInd, Home } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { Route, Link, Switch, useRouteMatch } from "react-router-dom"
import MemberProfilePage from "../../user/Member/Profile"
 
import AddBoxIcon from '@mui/icons-material/AddBox';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation } from "react-router-dom/cjs/react-router-dom"
const drawerWidth = 250

const listItems = [
  { listIcon: <PersonIcon />, listText: "Profile", path: "/profile" },
  { listIcon: <AddBoxIcon />, listText: "Create Post", path: "/create-post" },
  { listIcon: <EditIcon />, listText: "Edit Profile", path: "/edit-profile" },
  { listIcon: <VpnKeyIcon />, listText: "Change Password", path: "/change-password" },
  { listIcon: <SubscriptionsIcon />, listText: "Plans", path: "/plans" },
  { listIcon: <DeleteForeverIcon />, listText: "Delete Account", path: "/Delete Account" },
  { listIcon: <LogoutIcon />, listText: "Logout", path: "/logout" },
  
]

const MemberHome = () => (
  <div>
    <h2>Member Dashboard</h2>
    <p>Welcome to your member area!</p>
  </div>
)
const MemberResume = () => (
  <div>
    <h2>Resume</h2>
    <p>Your resume content goes here.</p>
  </div>
)
const MemberPortfolio = () => (
  <div>
    <h2>Portfolio</h2>
    <p>Your portfolio content goes here.</p>
  </div>
)
const MemberContacts = () => (
  <div>
    <h2>Contacts</h2>
    <p>Your contacts content goes here.</p>
  </div>
)

export default function MemberLayout() {
  const { path, url } = useRouteMatch()
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen)
  }

  const location = useLocation();
   

  const sideList = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: "#f4f4f4",
        height: "100%",
      }}
      role="presentation"
    >
       
      <List sx={{display : "flex" , flexDirection : "column"  ,py:3 , mt :6}}>
        {listItems.map((listItem, index) => {
           const isActive = location.pathname === `${url}${listItem.path}`;
          return <ListItem
          className="list"
          sx={{
            display :'flex',
       
            backgroundColor: isActive ? "#6F1D8E" : "transparent",  
            color: isActive ? "white" : "gray",
            "&:hover" : {
              color :"white",
              backgroundColor :"#B075C7",
              '& .MuiListItemIcon-root': {    // target icon inside ListItem
        color: 'white',
      },
            }
              
          }}
            button
            key={index}
            component={Link}
            to={`${url}${listItem.path}`}
            onClick={() => setMobileOpen(false)} // Close mobile drawer on navigation
          >
            <ListItemIcon sx={{ minWidth: "10px", pr: 1,color: isActive ? "white" : "grey" , ".list&:hover" : {
              color : 'white'
            }}}>{listItem.listIcon}</ListItemIcon>
            <ListItemText primary={listItem.listText} />
          </ListItem>
})}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: 30,
          height: 30,
        position :"absolute",
        top:10,
        left:20,
        }}
      >
        {!isDesktop && (
          <IconButton  color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2  }}>
            <Menu sx={{fontSize : "30px"}}/>
          </IconButton>
        )}
      </Box>

      {isDesktop && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {sideList}
        </Drawer>
      )}

      {!isDesktop && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
            },
          }}
        >
          {sideList}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px : {xs :2,sm : 2 , md:4} ,
          mt: 8,
        }}
      >
        <Switch>
          <Route exact path={path} component={MemberHome} />
           
          <Route exact path={`${path}/resume`} component={MemberResume} />
          <Route exact path={`${path}/portfolio`} component={MemberPortfolio} />
          <Route exact path={`${path}/contacts`} component={MemberContacts} />
          <Route exact path={`${path}/profile`} component={MemberProfilePage} />
         
        </Switch>
      </Box>
    </Box>
  )
}
