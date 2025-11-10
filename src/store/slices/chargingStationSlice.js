import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_STATIONS } from '../../constants/endpoints';
import axiosClient from "../../api/axiosClient.js";

export const fetchStations = createAsyncThunk(
  'chargeStations/fetchStations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(ENDPOINT_STATIONS);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stations');
    }
  }
);

export const createStation = createAsyncThunk(
  'chargeStations/createStation',
  async (stationData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ENDPOINT_STATIONS, stationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create station');
    }
  }
);

export const updateStation = createAsyncThunk(
  'chargeStations/updateStation',
  async ({ id, ...stationData }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`${ENDPOINT_STATIONS}/${id}`, stationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update station');
    }
  }
);

export const deleteStation = createAsyncThunk(
  'chargeStations/deleteStation',
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`${ENDPOINT_STATIONS}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete station');
    }
  }
);

const initialState = {
  stations: [],
  status: 'idle',
  error: null,
};

const chargingStationSlice = createSlice({
  name: 'chargeStations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Stations
    builder
      .addCase(fetchStations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stations = action.payload;
      })
      .addCase(fetchStations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Create Station
      .addCase(createStation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createStation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stations.push(action.payload);
      })
      .addCase(createStation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update Station
      .addCase(updateStation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.stations.findIndex(station => station.id === action.payload.id);
        if (index !== -1) {
          state.stations[index] = action.payload;
        }
      })
      .addCase(updateStation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Delete Station
      .addCase(deleteStation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteStation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stations = state.stations.filter(station => station.id !== action.payload);
      })
      .addCase(deleteStation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectAllStations = (state) => state.chargingStations.stations;
export const selectStationById = (state, stationId) => 
  state.chargingStations.stations.find(station => station.id === stationId);
export const selectStationsStatus = (state) => state.chargingStations.status;
export const selectStationsError = (state) => state.chargingStations.error;

export default chargingStationSlice.reducer;