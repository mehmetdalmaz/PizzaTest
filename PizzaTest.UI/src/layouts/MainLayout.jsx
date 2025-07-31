import { Outlet } from "react-router";

import { Box } from "@mui/material";

export default function MainLayout() {
  return (
    <div>
      <Box sx={{ mt: 1 }}>
        <Outlet />
      </Box>
    </div>
  );
}
