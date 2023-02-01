import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import DuoIcon from "@mui/icons-material/Duo";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChatIcon from "@mui/icons-material/Chat";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Tooltip from '@mui/material/Tooltip'
import AssessmentIcon from "@mui/icons-material/Assessment";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    backgroundColor: "#efefef",

    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      backgroundColor: "#efefef",
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function AdvisorHome() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.removeItem("AdvisorToken");
    navigate("/adv_login");
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          elevation={0}
          style={{ backgroundColor: "#efefef", color: "#828282" }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              ADVISOR
            </Typography>
            <IconButton color="inherit">{/* notification */}</IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          {/* <Divider /> */}
          <List
            component="nav"
            style={{
              backgroundColor: "white",
              height: 400,
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            sx={{
              "&::-webkit-scrollbar": { width: 6 },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "white",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#7602b6",
              },
            }}
          >
            <Link to="" style={{ textDecoration: "none", color: "#787878" }}>
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(e) => {
                  handleListItemClick(e, 0);
                }}
              >
                <ListItemIcon style={{ color: "#787878" }}>
                  <Tooltip title="Chat" placement="right">
                    <ChatIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Chat" />
              </ListItemButton>
            </Link>

            <Link
              to="lst_students"
              style={{ textDecoration: "none", color: "#787878" }}
            >
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(e) => {
                  handleListItemClick(e, 1);
                }}
              >
                <ListItemIcon style={{ color: "#787878" }}>
                  <Tooltip title="Manifest" placement="right">
                    <StickyNote2Icon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Manifest" />
              </ListItemButton>
            </Link>

            <Link
              to="report"
              style={{ textDecoration: "none", color: "#787878" }}
            >
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(e) => {
                  handleListItemClick(e, 2);
                }}
              >
                <ListItemIcon style={{ color: "#787878" }}>
                  <Tooltip title="Report" placement="right">
                    <AssessmentIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Add Report" />
              </ListItemButton>
            </Link>

            <Link
              to="add_conference"
              style={{ textDecoration: "none", color: "#787878" }}
            >
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(e) => {
                  handleListItemClick(e, 3);
                }}
              >
                <ListItemIcon style={{ color: "#787878" }}>
                  <Tooltip title="Meeting" placement="right">
                    <DuoIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary=" Meeting" />
              </ListItemButton>
            </Link>
            <Link
              to="chk_task"
              style={{ textDecoration: "none", color: "#787878" }}
            >
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(e) => {
                  handleListItemClick(e, 4);
                }}
              >
                <ListItemIcon style={{ color: "#787878" }}>
                  <Tooltip title="View Task" placement="right">
                    <TaskIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="View Task" />
              </ListItemButton>
            </Link>
            <ListItemButton onClick={logout} style={{ color: "#787878" }}>
              <ListItemIcon style={{ color: "#787878" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            backgroundColor: "#f0f2f5",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdvisorHome;