import { lazy } from "react";
import withSuspense from "../utils/withSuspense";

export const NotFoundPage = withSuspense(
  lazy(() => import("../pages/NotFoundPage/NotFoundPage"))
);

export const IndexPage = withSuspense(
  lazy(() => import("../pages/IndexPage/IndexPage"))
);

export const CreateFinancialSubmissionPage = withSuspense(
  lazy(() => import("../pages/CreateSubmissionPage/CreateSubmissionPage"))
);
