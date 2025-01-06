import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { VscDashboard } from "react-icons/vsc";
import { TbTemplate } from "react-icons/tb";
import { MdOutlineAttachEmail } from "react-icons/md";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { RiMenu2Fill } from "react-icons/ri";
import { HiOutlineUpload } from "react-icons/hi";
import { FaDatabase } from "react-icons/fa";
import { Typography } from "@mui/material";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Template from "./Template";
import TemplateTable from "./TemplateTable";
import Status from "./Status";
import Publish from "./Publish";
import ImageUploading from "./ImageUploading";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CardData from "./CardData";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const MiniDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? drawerWidth : 56, // When closed, only shows icons
  flexShrink: 0,
  whiteSpace: "nowrap",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : 56,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#e9ecf2",
    color: "black",
    borderRight: "none",
  },
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activePage, setActivePage] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfileMenu = Boolean(anchorEl);

  const menuItems = [
    {
      text: "Dashboard",
      icon: <VscDashboard style={{ fontSize: "20px" }} />,
      page: "Dashboard",
    },
    {
      text: "Template",
      icon: <TbTemplate style={{ fontSize: "20px" }} />,
      page: "Template",
    },
    {
      text: "Status",
      icon: <MdOutlineAttachEmail style={{ fontSize: "20px" }} />,
      page: "Status",
    },
    {
      text: "Publish",
      icon: <MdOutlinePublishedWithChanges style={{ fontSize: "20px" }} />,
      page: "Publish",
    },
    {
      text: "Upload Image",
      icon: <HiOutlineUpload style={{ fontSize: "20px" }} />,
      page: "ImageUploading",
    },
    {
      text: "Card Data",
      icon: <FaDatabase style={{ fontSize: "15px" }} />,
      page: "Card Data",
    },
  ];

  const handleDrawerToggle = () => setOpen((prevOpen) => !prevOpen);

  const handleMenuItemClick = (page) => {
    setActivePage(page);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="dashboard"
      style={{
        padding: 0,
        margin: 0,
        top: 0,
        left: 0,
        height: "100vh",
        width: "100%",
        position: "relative",
        textAlign: "center",
        fontFamily: "Roboto, sans-serif",
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "#ffffff",
          boxShadow: "none",
          marginLeft: open ? `${drawerWidth}px` : "56px",
          width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - 56px)`,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {!open && (
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#333",
                marginLeft: "20px",
              }}
            >
              QuickCard
            </Typography>
          )}
          <IconButton
            onClick={handleProfileClick}
            sx={{
              color: "gray",
              position: "absolute",
              right: 20,
            }}
          >
            <HiOutlineUserCircle style={{ fontSize: "30px", color: "gray" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={openProfileMenu}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", height: "100vh" }}>
        <MiniDrawer variant="permanent" open={open}>
          <DrawerHeader>
            {open && (
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "black",
                  padding: "16px",
                  paddingLeft: "20px",
                  paddingRight: "50px",
                }}
              >
                QuickCard
              </Typography>
            )}
            <IconButton onClick={handleDrawerToggle} sx={{ color: "grey" }}>
              {open ? <HiOutlineChevronDoubleLeft /> : <RiMenu2Fill />}
            </IconButton>
          </DrawerHeader>
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => handleMenuItemClick(item.page)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    margin: "8px 0",
                    backgroundColor:
                      activePage === item.page ? "#453c72" : "transparent",
                    color: activePage === item.page ? "white" : "gray",
                    borderRadius: activePage === item.page ? "12px" : "0",
                    boxShadow:
                      activePage === item.page
                        ? "0 4px 8px rgb(69,60,114)"
                        : "none",
                    "&:hover": {
                      backgroundColor:
                        activePage === item.page ? "#52459f" : "#d6dfff",
                      color: activePage === item.page ? "white" : "black",
                      borderRadius: "12px",
                    },
                    "&:hover .MuiListItemIcon-root, &:hover .MuiListItemText-primary":
                      {
                        color: activePage === item.page ? "white" : "black",
                      },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: activePage === item.page ? "white" : "gray",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: activePage === item.page ? "white" : "gray",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </MiniDrawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: theme.spacing(3),
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <DrawerHeader />
          {activePage === "Dashboard" && <TemplateTable />}
          {activePage === "Template" && <Template />}
          {activePage === "Status" && <Status />}
          {activePage === "Publish" && <Publish />}
          {activePage === "ImageUploading" && <ImageUploading />}
          {activePage === "Card Data" && <CardData />}
        </Box>
      </Box>
    </div>
  );
}
