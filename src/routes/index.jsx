import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

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
import VehicleDetail from "../components/Vehicle/VehicleDetail.jsx";
import StationDetail from "../pages/Booking/BookingDetail.jsx";
import VerifySuccess from "../pages/Success/VerifySuccess.jsx";
import Success from "../pages/PaymentSuccess/Success.jsx";
import Fail from "../pages/PaymentSuccess/Fail.jsx";
import BookingSchedule from "../pages/Booking/BookingSchedule.jsx";
import ChargingSession from "../pages/ChargingSession/ChargingSession.jsx";
import SessionDetail from "../pages/ChargingSession/SessionDetail.jsx";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Stations from "../pages/Admin/Stations/Stations";
import VehicleModels from "../pages/Admin/VehicleModels/VehicleModels.jsx";
import Spots from "../pages/Admin/Spots/Spots.jsx";
import VehicleBrands from "../pages/Admin/VehicleBrands/VehicleBrands.jsx";
import StaffStation from "../pages/Staff/StaffStation.jsx";
import StationSpot from "../pages/Staff/StationSpot.jsx";
import InvoiceDetail from "../components/Payment/InvoiceDetail.jsx";
import PaymentBookinngSuccess from "../pages/PaymentBooking/PaymentBookingSuccess.jsx";
import StaffLayout from "../layouts/StaffLayout.jsx";

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
      { path: "/vehicle/:id", element: <VehicleDetail /> },
      { path: "/station/:id", element: <StationDetail /> },
      { path: "/verifySuccess", element: <VerifySuccess /> },
      { path: "/success", element: <Success /> },
      { path: "/fail", element: <Fail /> },
      { path: "/bookingSchedule", element: <BookingSchedule /> },
      { path: "/chargingSession", element: <ChargingSession /> },
      { path: "/session-detail/:id", element: <SessionDetail /> },
      { path: "/payment/invoice/:id", element: <InvoiceDetail /> },
      { path: "/bookingPaymentSuccess", element: <PaymentBookinngSuccess /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "stations", element: <Stations /> },
      { path: "vehicle-models", element: <VehicleModels /> },
      { path: "spots", element: <Spots /> },
      { path: "vehicle-brands", element: <VehicleBrands /> },
    ],
  },
  {
    path: "/staff",
    element: <StaffLayout />,
    children: [
      { path: "station", element: <StaffStation /> },
      { path: "station/spot/:id", element: <StationSpot /> },
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
