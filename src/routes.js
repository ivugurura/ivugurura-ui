import React from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { MainLayout } from "common/components/layouts";
// import { systemLanguage } from "utils/constants";
// import { Main, AdminMain } from "./layouts";
import { PageRoutes } from "./RoutesConstants";
// import Navbar from "common/components/navbar";

// const routes = [
//   {
//     path: "/",
//     exact: true,
//     component: () => <Redirect to={`/${systemLanguage}`} />,
//   },
//   {
//     path: "/admin",
//     component: AdminMain,
//     routes: [
//       {
//         path: "/admin",
//         exact: true,
//         component: lazy(() => import("views/Dashboard")),
//       },
//       {
//         path: "/admin/add-topic",
//         exact: true,
//         component: lazy(() => import("views/AddEditTopic")),
//       },
//       {
//         path: "/admin/audios",
//         exact: true,
//         component: lazy(() => import("views/AdminAudio")),
//       },
//       {
//         path: "/admin/users",
//         exact: true,
//         component: lazy(() => import("views/SystemUsers")),
//       },
//       {
//         path: "/admin/setting",
//         exact: true,
//         component: lazy(() => import("views/AdminSetting")),
//       },
//       {
//         path: "/admin/commentaries",
//         exact: true,
//         component: lazy(() => import("views/AdminCommentaries")),
//       },
//       {
//         path: "/admin/edit-topic/:topicSlug",
//         exact: true,
//         component: lazy(() => import("views/AddEditTopic")),
//       },
//       {
//         component: () => <Redirect to={`/${systemLanguage}`} />,
//       },
//     ],
//   },
//   {
//     path: "/:language",
//     component: Main,
//     routes: [
//       {
//         path: "/",
//         exact: true,
//         component: lazy(() => import("views/Home")),
//       },
//       {
//         path: "/login",
//         exact: true,
//         component: lazy(() => import("views/Login")),
//       },
//       {
//         path: "/topics",
//         exact: true,
//         component: lazy(() => import("views/ViwTopics")),
//       },
//       {
//         path: "/topics/:topicSlug",
//         exact: true,
//         component: lazy(() => import("views/TopicView")),
//       },
//       {
//         path: "/topics/categories/:categorySlug",
//         exact: true,
//         component: lazy(() => import("views/ViwTopics")),
//       },
//       {
//         path: "/radio",
//         exact: true,
//         component: lazy(() => import("views/RadioRRV")),
//       },
//       {
//         path: "/audios",
//         exact: true,
//         component: lazy(() => import("views/Audios")),
//       },
//       {
//         path: "/errors/error-400",
//         exact: true,
//         component: lazy(() => import("views/NotFound")),
//       },

//       {
//         component: () => <Redirect to={`/${systemLanguage}`} />,
//       },
//     ],
//   },
// ];
export const AppRoutes = (props) => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={PageRoutes.Index} element={<h2>Landing page</h2>} />
        <Route path={PageRoutes.Topics} element={<h2>All topics</h2>} />
        <Route
          path={PageRoutes.Topic}
          element={
            <h2>
              Topic details <Link to="/">Home</Link>
            </h2>
          }
        />
        <Route path="*" element={<Navigate to="/kn" />} />
      </Route>
    </Routes>
  );
};
