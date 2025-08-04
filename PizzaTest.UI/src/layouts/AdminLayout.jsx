import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../components/SideBar";

export default function AdminLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box display="flex">
      <Sidebar />
      {isMobile ? (
        <Box marginTop={3} flex={1} p={5}>
          <Outlet />
        </Box>
      ) : (
        <Box flex={1} p={3}>
          <Outlet />
        </Box>
      )}
    </Box>
  );
}
