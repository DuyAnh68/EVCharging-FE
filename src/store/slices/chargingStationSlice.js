import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from "../../api/axiosClient.js";
import {ENDPOINT_GET_STATIONS} from "../../constants/endpoints.js";

const initialState = {
  stations: [],
  loading: false,
  error: null,
};

export const fetchStations = createAsyncThunk(
  'chargingStations/fetchStations',
  async ({keyword = ""}, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`${ENDPOINT_GET_STATIONS}?location=${keyword}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stations');
    }
  }
);

const chargingStationSlice = createSlice({
  name: 'chargingStations',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchStations.fulfilled, (state, action) => {
      state.loading = false;
      state.stations = action.payload;
    });
    builder.addCase(fetchStations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const selectAllStations = (state) => state.chargingStations.stations;
export const selectLoading = (state) => state.chargingStations.loading;
export const selectError = (state) => state.chargingStations.error;

export default chargingStationSlice.reducer;