import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { ENDPOINT_VEHICLE_MODEL } from '../../constants/endpoints';

// Async thunks
export const fetchVehicleModels = createAsyncThunk(
    'vehicleModels/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`${ENDPOINT_VEHICLE_MODEL}/all`);
            return response?.result;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch vehicle models');
        }
    }
);

export const createVehicleModel = createAsyncThunk(
    'vehicleModels/create',
    async (modelData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(ENDPOINT_VEHICLE_MODEL, modelData);
            return response?.result;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create vehicle model');
        }
    }
);

export const updateVehicleModel = createAsyncThunk(
    'vehicleModels/update',
    async ({ id, ...modelData }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.put(`${ENDPOINT_VEHICLE_MODEL}/${id}`, modelData);
            return response?.result;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update vehicle model');
        }
    }
);

export const deleteVehicleModel = createAsyncThunk(
    'vehicleModels/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axiosClient.delete(`${ENDPOINT_VEHICLE_MODEL}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete vehicle model');
        }
    }
);

const initialState = {
    models: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const vehicleModelSlice = createSlice({
    name: 'vehicleModels',
    initialState,
    reducers: {
        // Add any synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            // Fetch all models
            .addCase(fetchVehicleModels.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVehicleModels.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.models = action.payload;
            })
            .addCase(fetchVehicleModels.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Create model
            .addCase(createVehicleModel.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createVehicleModel.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.models.push(action.payload);
            })
            .addCase(createVehicleModel.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Update model
            .addCase(updateVehicleModel.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateVehicleModel.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.models.findIndex(model => model.id === action.payload.id);
                if (index !== -1) {
                    state.models[index] = action.payload;
                }
            })
            .addCase(updateVehicleModel.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Delete model
            .addCase(deleteVehicleModel.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteVehicleModel.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.models = state.models.filter(model => model.id !== action.payload);
            })
            .addCase(deleteVehicleModel.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Selectors
export const selectAllVehicleModels = (state) => state.vehicleModels.models;
export const selectVehicleModelById = (state, modelId) =>
    state.vehicleModels.models.find(model => model.id === modelId);
export const selectVehicleModelsStatus = (state) => state.vehicleModels.status;
export const selectVehicleModelsError = (state) => state.vehicleModels.error;

export default vehicleModelSlice.reducer;