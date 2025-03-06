import { lazy } from "react";

const Home = lazy(() => import("../containers/home"));
const Share = lazy(() => import("../containers/share"));
const Register = lazy(() => import("../containers/register"));

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/share",
    component: Share,
  },
  {
    path: "register",
    component: Register,
  },
];

export default routes;
