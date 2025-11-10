import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { ENDPOINT_VEHICLE_BRAND } from '../../constants/endpoints';

// Async thunks
export const fetchVehicleBrands = createAsyncThunk(
    'vehicleBrands/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`${ENDPOINT_VEHICLE_BRAND}/all`);
            return response?.result || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch vehicle brands');
        }
    }
);

export const createVehicleBrand = createAsyncThunk(
    'vehicleBrands/create',
    async (brandData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(ENDPOINT_VEHICLE_BRAND, brandData);
            return response?.result;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create vehicle brand');
        }
    }
);

export const updateVehicleBrand = createAsyncThunk(
    'vehicleBrands/update',
    async ({ id, ...brandData }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.put(`${ENDPOINT_VEHICLE_BRAND}/${id}`, brandData);
            return response?.result;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update vehicle brand');
        }
    }
);

export const deleteVehicleBrand = createAsyncThunk(
    'vehicleBrands/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axiosClient.delete(`${ENDPOINT_VEHICLE_BRAND}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete vehicle brand');
        }
    }
);

const initialState = {
    brands: [],
    status: 'idle',
    error: null,
};

const vehicleBrandSlice = createSlice({
    name: 'vehicleBrands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all brands
            .addCase(fetchVehicleBrands.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVehicleBrands.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brands = action.payload;
            })
            .addCase(fetchVehicleBrands.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Create brand
            .addCase(createVehicleBrand.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createVehicleBrand.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brands.push(action.payload);
            })
            .addCase(createVehicleBrand.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Update brand
            .addCase(updateVehicleBrand.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateVehicleBrand.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.brands.findIndex(brand => brand.id === action.payload.id);
                if (index !== -1) {
                    state.brands[index] = action.payload;
                }
            })
            .addCase(updateVehicleBrand.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Delete brand
            .addCase(deleteVehicleBrand.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteVehicleBrand.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brands = state.brands.filter(brand => brand.id !== action.payload);
            })
            .addCase(deleteVehicleBrand.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Selectors
export const selectAllVehicleBrands = (state) => state.vehicleBrands.brands;
export const selectVehicleBrandsStatus = (state) => state.vehicleBrands.status;
export const selectVehicleBrandsError = (state) => state.vehicleBrands.error;

export default vehicleBrandSlice.reducer;