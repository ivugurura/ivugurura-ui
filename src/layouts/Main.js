import React, { Suspense } from "react";
import { ProgressBar } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { systemLanguages, systemLanguage } from "utils/constants";
import { NavHeader, MainFooter } from "../components/common";

export const Main = ({ route, match }) => {
  const { language } = match.params;
  const languageExit = systemLanguages.find((lang) => lang.abbr === language);
  return languageExit ? (
    <>
      <NavHeader />
      <Suspense fallback={<ProgressBar now />}>
        {renderRoutes(route.routes)}
      </Suspense>
      <MainFooter />
    </>
  ) : (
    <Redirect to={`/${systemLanguage}`} />
  );
};
