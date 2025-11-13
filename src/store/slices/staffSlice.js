import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { ENDPOINT_STAFF } from '../../constants/endpoints';

// Async thunks
export const fetchStaffs = createAsyncThunk(
  'staffs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(ENDPOINT_STAFF);
      return response?.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createStaff = createAsyncThunk(
  'staffs/create',
  async (staffData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ENDPOINT_STAFF, staffData);
      return response?.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateStaff = createAsyncThunk(
  'staffs/update',
  async ({ id, ...staffData }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`${ENDPOINT_STAFF}/${id}`, staffData);
      return response?.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteStaff = createAsyncThunk(
  'staffs/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`${ENDPOINT_STAFF}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  staffs: [],
  currentStaff: null,
  loading: false,
  error: null,
};

const staffSlice = createSlice({
  name: 'staffs',
  initialState,
  reducers: {
    setCurrentStaff: (state, action) => {
      state.currentStaff = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all staffs
    builder.addCase(fetchStaffs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchStaffs.fulfilled, (state, action) => {
      state.loading = false;
      state.staffs = action.payload;
    });
    builder.addCase(fetchStaffs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create staff
    builder.addCase(createStaff.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.staffs.push(action.payload);
    });
    builder.addCase(createStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update staff
    builder.addCase(updateStaff.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateStaff.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.staffs.findIndex(staff => staff.id === action.payload.id);
      if (index !== -1) {
        state.staffs[index] = action.payload;
      }
    });
    builder.addCase(updateStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete staff
    builder.addCase(deleteStaff.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.staffs = state.staffs.filter(staff => staff.id !== action.payload);
    });
    builder.addCase(deleteStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Selectors
export const selectAllStaffs = (state) => state.staffs.staffs;
export const selectStaffsStatus = (state) => state.staffs.loading;

export const { setCurrentStaff, clearError } = staffSlice.actions;

export default staffSlice.reducer;
