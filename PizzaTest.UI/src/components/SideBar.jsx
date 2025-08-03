import React, { useState, useEffect } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    IconButton,
    Box,
    CssBaseline,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin-panel/home" },
    { text: "Kategoriler", icon: <CategoryIcon />, path: "/admin-panel/categories" },
    { text: "Ürünler", icon: <InventoryIcon />, path: "/admin-panel/products" },
    { text: "Siparişler", icon: <ShoppingCartIcon />, path: "/admin-panel/orders" },
    { text: "Kullanıcılar", icon: <PeopleIcon />, path: "/admin-panel/users" },
];

export default function Sidebar() {
    const location = useLocation();
    const theme = useTheme();
    const [showHeader, setShowHeader] = useState(true);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            // 10px'den fazla scroll varsa gizle
            setShowHeader(window.scrollY < 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const drawer = (
        <>
            <Toolbar>
                <Typography variant="h6" fontWeight="bold">
                    Admin Panel
                </Typography>
            </Toolbar>
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        component={Link}
                        to={item.path}
                        selected={location.pathname === item.path}
                        sx={{
                            "&.Mui-selected": {
                                backgroundColor: "#e0e0e0",
                            },
                            "&:hover": {
                                backgroundColor: "#eaeaea",
                            },
                        }}
                        onClick={() => isMobile && setMobileOpen(false)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* Mobilde drawer kapalıyken hamburger + yazı */}
            {isMobile && !mobileOpen && showHeader && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#fff",
                        zIndex: theme.zIndex.drawer + 20,
                        px: 2,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                >
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        size="large"
                        sx={{ mr: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" fontWeight="bold" color="textPrimary" noWrap>
                        Admin Panel
                    </Typography>
                </Box>
            )}

            {/* Drawer */}
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="sidebar navigation"
            >
                {isMobile ? (
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
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
                ) : (
                    <Drawer
                        variant="permanent"
                        open
                        sx={{
                            display: { xs: "none", sm: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                                backgroundColor: "#f5f5f5",
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                )}
            </Box>

            {/* İçerik alanı */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    pt: { xs: '105px', sm: 5 },
                }}
            >
                {/* Buraya sayfa içeriği gelecek */}
            </Box>
        </Box>
    );
}
