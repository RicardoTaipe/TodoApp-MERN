import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import NotesIcon from "@mui/icons-material/Notes";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("AuthToken");
    navigate("/login");
  };

  const loadTodoPage = () => {
    navigate("/todo");
  };

  const loadAccountPage = () => {
    navigate("/account");
  };

  useEffect(() => {
    const authToken = localStorage.getItem("AuthToken");
    if (authToken === null) {
      navigate("/login");
    }
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            TodoApp
          </Typography>
        </Toolbar>
      </AppBar>
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
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <center>
            <Avatar
              src={""}
              alt="Profile Image"
              sx={{
                height: 110,
                width: 100,
                flexShrink: 0,
                flexGrow: 0,
                marginTop: 4,
              }}
            />
            <p>{"NAME"}</p>
            <p>{"USERNAME"}</p>
          </center>
          <Divider />
          <List>
            <ListItem button key="Todo" onClick={loadTodoPage}>
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText primary="Todo" />
            </ListItem>

            <ListItem button key="Account" onClick={loadAccountPage}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>

            <ListItem button key="Logout" onClick={logoutHandler}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
