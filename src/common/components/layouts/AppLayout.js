import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { NavBar } from "../navbar";

export const AppLayout = () => {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
};
