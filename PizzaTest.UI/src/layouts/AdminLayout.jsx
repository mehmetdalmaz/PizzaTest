import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../components/SideBar";

export default function AdminLayout() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1} p={3}>
        <Outlet />
      </Box>
    </Box>
  );
}
