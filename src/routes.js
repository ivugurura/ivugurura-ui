import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import {
  AdminLayout,
  AdminMainLayout,
  AuthProvider,
  useLang,
  UserLayout,
  UserMainLayout,
} from './common/components';

const LoginPage = React.lazy(() => import('./pages/admin/Login'));
export const AppRoutes = () => {
  const { lang } = useLang();

  return (
    <Routes>
      <Route path="/" element={<UserMainLayout lang={lang} />}>
        <Route path="" element={<Navigate to={lang} replace />} />
        <Route path=":lang/*" element={<UserLayout />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route
        path="admin/"
        element={
          <AuthProvider>
            <AdminMainLayout lang={lang} />
          </AuthProvider>
        }
      >
        <Route path="" element={<Navigate to={lang} replace />} />
        <Route path=":lang/*" element={<AdminLayout />} />
      </Route>
    </Routes>
  );
};
