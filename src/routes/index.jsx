import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import ChargingStationMap from "../pages/Home/ChargingStationMap";
import Subscription from "../pages/SubscriptionManagement/Subscription";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import VehicleList from "../pages/VehicleManagement/VehicleList";
import AddVehicle from "../pages/VehicleManagement/AddVehicle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <ChargingStationMap /> },
      { path: "subscription", element: <Subscription /> },
      { path: "vehicle", element: <VehicleList /> },
      { path: "addvehicle", element: <AddVehicle/> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
]);

export default router;
