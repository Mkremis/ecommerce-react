import React from "react";
import { createHashRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ReviewProduct from "../pages/ReviewProduct";
import SortProduct from "../pages/SortProducts";
import Checkout from "../pages/Checkout";
import SuccessPayment from "../pages/SuccessPayment";
import Orders from "../pages/Orders";
import DashboardForm from "../components/DashboardForm";
import {
  loaderHome,
  loaderDetails,
  loaderSort,
  loaderDashboard,
  loaderOrders,
  loaderLikes,
} from "../loaders";
import Dashboard from "../pages/Dashboard";
import Likes from "../pages/Likes";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: loaderHome,
      },
      {
        path: "/:root/:id",
        element: <ReviewProduct />,
        loader: loaderDetails,
      },
      {
        path: "/:root/category/:category/sortBy/:sortBy/filter/:filter/search/:search/offset/:offset",
        element: <SortProduct />,
        loader: loaderSort,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: ":username",
            element: <DashboardForm />,
            loader: loaderDashboard,
          },
          {
            path: "orders/:username",
            element: <Orders />,
            loader: loaderOrders,
          },
          {
            path: "likeds/:username",
            element: <Likes />,
            loader: loaderLikes,
          },
          {
            path: "newuser",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/success-payment",
        element: <SuccessPayment />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
