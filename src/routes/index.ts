import { lazy } from "react";

const Home = lazy(() => import("../containers/home"));
const Share = lazy(() => import("../containers/share"));

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/share",
    component: Share,
  },
];

export default routes;
