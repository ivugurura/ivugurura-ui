import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { NavBar } from "../navbar";

export const MainLayout = () => {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
};
