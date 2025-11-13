import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import chargingStationReducer from "./slices/chargingStationSlice.js";
import chargingSpotReducer from "./slices/chargingSpotSlice.js";
import vehicleModelReducer from "./slices/vehicleModelSlice.js";
import vehicleBrandReducer from "./slices/vehicleBrandSlice.js";
import subscriptionPlanReducer from "./slices/subscriptionPlanSlice.js";
import companyReducer from "./slices/companySlice.js";
import staffReducer from "./slices/staffSlice.js";
import {useDispatch, useSelector} from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chargingStations: chargingStationReducer,
    chargingSpots: chargingSpotReducer,
    vehicleModels: vehicleModelReducer,
    vehicleBrands: vehicleBrandReducer,
    subscriptionPlans: subscriptionPlanReducer,
    companies: companyReducer,
    staffs: staffReducer,
  },
});

export default store;

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
