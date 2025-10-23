import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import chargingStationReducer from "./slices/chargingStationSlice.js";
import {useDispatch, useSelector} from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chargingStations: chargingStationReducer
  },
});

export default store;


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
