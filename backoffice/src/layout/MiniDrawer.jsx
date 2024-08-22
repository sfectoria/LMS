import React, { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import DraftsIcon from "@mui/icons-material/Drafts";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPlayLesson } from "react-icons/md";
import { SiSessionize } from "react-icons/si";
import { FaUsersGear } from "react-icons/fa6";
import { PiPathBold } from "react-icons/pi";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logoblanc.png";
import { FaUserGraduate } from "react-icons/fa";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer+1 ,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          localStorage.removeItem("token");
          window.location.pathname = "/";
        }}
      >
        log out
      </MenuItem>
    </Menu>
  );
    const navigate = useNavigate();
  const user = useSelector((store) => store.auth.me);
  

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar setOpen={setOpen} open={open}>
        <Toolbar
          className="d-flex justify-content-between"
          style={{ backgroundColor: "#0f1924" }}
        >
          <div></div>
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <img
                src={user.image}
                alt=""
                className="rounded-circle"
                style={{ width: 50, height: 50, objectFit: "cover" }}
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        setOpen={setOpen}
        open={open}
        sx={{ backgroundColor: "black" }}
      >
        <div style={{ backgroundColor: "#0f1924", height: "100%" }}>
          <DrawerHeader>
            <div>
              <img src={logo} alt="" style={{ width: "180px" }} />
            </div>
            <IconButton className="text-white" onClick={() => setOpen(false)}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            {user.role === "Manager" && (
              <div>
                <ListItem disablePadding onClick={() => navigate("/")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <MdSpaceDashboard style={{ color: "#ffc107" }} />
                    </ListItemIcon>
                    <ListItemText className="text-white" primary="Dashboard" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding onClick={() => navigate("/courses")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <MdPlayLesson style={{ color: "#ffc107" }} />
                    </ListItemIcon>
                    <ListItemText className="text-white" primary="Courses" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => navigate("/programs")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PiPathBold style={{ color: "#ffc107" }} />
                    </ListItemIcon>
                    <ListItemText className="text-white" primary="Programs" />
                  </ListItemButton>
                </ListItem>
              </div>
            )}

            <ListItem
              disablePadding
              style={{}}
              onClick={() => navigate("/sessions")}
            >
              <ListItemButton>
                <ListItemIcon>
                  <SiSessionize style={{ color: "#ffc107" }} />
                </ListItemIcon>
                <ListItemText className="text-white" primary="My Sessions" />
              </ListItemButton>
            </ListItem>
            {user.role === "Manager" && (
              <ListItem
                disablePadding
                style={{}}
                onClick={() => navigate("/sessionsManager")}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <SiSessionize style={{ color: "#ffc107" }} />
                  </ListItemIcon>
                  <ListItemText className="text-white" primary="Sessions" />
                </ListItemButton>
              </ListItem>
            )}

            {user.role === "Manager" && (
              <ListItem disablePadding onClick={() => navigate("/users")}>
                <ListItemButton>
                  <ListItemIcon>
                    <FaUsersGear style={{ color: "#ffc107" }} />
                  </ListItemIcon>
                  <ListItemText className="text-white" primary="All users" />
                </ListItemButton>
              </ListItem>
            )}
          </List>

          <Divider />
        </div>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, zIndex: 99 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
      {renderMenu}
    </Box>
  );
}
