import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/web/admin-panel/home" },
  {
    text: "Kategoriler",
    icon: <CategoryIcon />,
    path: "/web/admin-panel/categories",
  },
  {
    text: "Ürünler",
    icon: <InventoryIcon />,
    path: "/web/admin-panel/products",
  },
  {
    text: "Siparişler",
    icon: <ShoppingCartIcon />,
    path: "/web/admin-panel/orders",
  },
  {
    text: "Kullanıcılar",
    icon: <PeopleIcon />,
    path: "/web/admin-panel/users",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
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
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
