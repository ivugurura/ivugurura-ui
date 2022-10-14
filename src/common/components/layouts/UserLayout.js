import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { PageRoutes } from "RoutesConstants";

export const UserLayout = () => {
  return (
    <Box>
      <h2>Users layout</h2>
      <Routes>
        <Route index element={<h2>User landing page</h2>} />
        <Route path="topics" element={<h2>All topics</h2>} />
        <Route path={PageRoutes.Topic} element={<h2>Topic details</h2>} />
      </Routes>
    </Box>
  );
};
