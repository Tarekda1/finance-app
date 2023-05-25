import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import {
  IndexPage,
  CreateFinancialSubmissionPage,
  NotFoundPage,
} from "./pages";
import Page from "../components/Page/Page";
import { CountryLanguageContextProvider } from "../context/CountryLanguageProvider";
const Router = () => {
  return (
    <CountryLanguageContextProvider>
      <Routes>
        <Route
          exact
          path={routes.index}
          element={
            <Page>
              <IndexPage />
            </Page>
          }
        />
        <Route
          exact
          path={routes.createSubmission}
          element={
            <Page>
              <CreateFinancialSubmissionPage />
            </Page>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CountryLanguageContextProvider>
  );
};

export default Router;
