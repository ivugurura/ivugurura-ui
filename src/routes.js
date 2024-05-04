import React from 'react';

import { Route, Routes } from 'react-router-dom';

import {
  AdminLayout,
  AdminMainLayout,
  useLang,
  UserLayout,
  UserMainLayout,
} from './common/components';
import { Login } from './pages/admin/Login';

export const AppRoutes = () => {
  const { lang } = useLang();
  return (
    <Routes>
      <Route path="/" element={<UserMainLayout />}>
        <Route path={`${lang}/*`} element={<UserLayout />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="admin/" element={<AdminMainLayout />}>
        <Route path={`${lang}/*`} element={<AdminLayout />} />
      </Route>
    </Routes>
  );
};
