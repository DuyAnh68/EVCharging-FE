import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import chargingStationReducer from "./slices/chargingStationSlice.js";
import chargingSpotReducer from "./slices/chargingSpotSlice.js";
import vehicleModelReducer from "./slices/vehicleModelSlice.js";
import vehicleBrandReducer from "./slices/vehicleBrandSlice.js";
import {useDispatch, useSelector} from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chargingStations: chargingStationReducer,
    chargingSpots: chargingSpotReducer,
    vehicleModels: vehicleModelReducer,
    vehicleBrands: vehicleBrandReducer,
  },
});

export default store;


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
