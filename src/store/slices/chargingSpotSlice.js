import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_SPOTS } from '../../constants/endpoints';
import axiosClient from '../../api/axiosClient';

// Async thunks
export const fetchSpots = createAsyncThunk(
    'chargingSpots/fetchSpots',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ENDPOINT_SPOTS);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch charging spots');
        }
    }
);

export const createSpot = createAsyncThunk(
    'chargingSpots/createSpot',
    async ({ stationId, spotData }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`${ENDPOINT_SPOTS}/create/${stationId}`, spotData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create charging spot');
        }
    }
);

export const updateSpot = createAsyncThunk(
    'chargingSpots/updateSpot',
    async ({ id, ...spotData }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.put(`${ENDPOINT_SPOTS}/${id}`, spotData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update charging spot');
        }
    }
);

export const deleteSpot = createAsyncThunk(
    'chargingSpots/deleteSpot',
    async (id, { rejectWithValue }) => {
        try {
            await axiosClient.delete(`${ENDPOINT_SPOTS}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete charging spot');
        }
    }
);

const initialState = {
    spots: [],
    status: 'idle',
    error: null,
};

const chargingSpotSlice = createSlice({
    name: 'chargingSpots',
    initialState,
    reducers: {
        // Add any synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        // Fetch Spots
        builder
            .addCase(fetchSpots.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSpots.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.spots = action.payload;
            })
            .addCase(fetchSpots.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

        // Create Spot
        builder
            .addCase(createSpot.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createSpot.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.spots.push(action.payload);
            })
            .addCase(createSpot.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

        // Update Spot
        builder
            .addCase(updateSpot.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSpot.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.spots.findIndex(spot => spot.id === action.payload.id);
                if (index !== -1) {
                    state.spots[index] = action.payload;
                }
            })
            .addCase(updateSpot.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

        // Delete Spot
        builder
            .addCase(deleteSpot.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteSpot.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.spots = state.spots.filter(spot => spot.id !== action.payload);
            })
            .addCase(deleteSpot.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Selectors
export const selectAllSpots = (state) => state.chargingSpots.spots;
export const selectSpotById = (state, spotId) =>
    state.chargingSpots.spots.find(spot => spot.id === spotId);
export const selectSpotsByStationId = (state, stationId) =>
    state.chargingSpots.spots.filter(spot => spot.stationId === stationId);
export const selectSpotsStatus = (state) => state.chargingSpots.status;
export const selectSpotsError = (state) => state.chargingSpots.error;

export default chargingSpotSlice.reducer;