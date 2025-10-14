import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import HomePage from "../pages/Home/HomePage.jsx";
import Subscription from "../pages/SubscriptionManagement/Subscription";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import VehicleList from "../pages/VehicleManagement/VehicleList";
import AddVehicle from "../pages/VehicleManagement/AddVehicle";
import Booking from "../pages/Booking/Booking";
import Account from "../pages/Account/Account";
import StationBookingPage from "../pages/StationBooking/StationBookingPage.jsx";
import ChargePage from "../pages/Charge/ChargePage.jsx";
import PaymentPage from "../pages/Payment/PaymentPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "subscription", element: <Subscription /> },
      { path: "vehicle", element: <VehicleList /> },
      { path: "addvehicle", element: <AddVehicle /> },
      { path: "booking", element: <Booking /> },
      { path: "account", element: <Account /> },
      { path: "booking", element: <StationBookingPage /> },
      { path: "charge", element: <ChargePage /> },
      { path: "payment", element: <PaymentPage /> },
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
