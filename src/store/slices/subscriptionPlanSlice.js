import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import {ENDPOINT_SUBSCRIPTION_PLAN} from "../../constants/endpoints.js";

// Async thunks
export const fetchSubscriptionPlans = createAsyncThunk(
  'subscriptionPlans/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(ENDPOINT_SUBSCRIPTION_PLAN);
      return response?.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createSubscriptionPlan = createAsyncThunk(
  'subscriptionPlans/create',
  async (planData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ENDPOINT_SUBSCRIPTION_PLAN, planData);
      return response?.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSubscriptionPlan = createAsyncThunk(
  'subscriptionPlans/update',
  async ({ id, ...planData }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`${ENDPOINT_SUBSCRIPTION_PLAN}/${id}`, planData);
      return response?.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteSubscriptionPlan = createAsyncThunk(
  'subscriptionPlans/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`${ENDPOINT_SUBSCRIPTION_PLAN}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  plans: [],
  currentPlan: null,
  loading: false,
  error: null,
};

const subscriptionPlanSlice = createSlice({
  name: 'subscriptionPlans',
  initialState,
  reducers: {
    setCurrentPlan: (state, action) => {
      state.currentPlan = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all plans
    builder.addCase(fetchSubscriptionPlans.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
      state.loading = false;
      state.plans = action.payload;
    });
    builder.addCase(fetchSubscriptionPlans.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create plan
    builder.addCase(createSubscriptionPlan.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createSubscriptionPlan.fulfilled, (state, action) => {
      state.loading = false;
      state.plans.push(action.payload);
    });
    builder.addCase(createSubscriptionPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update plan
    builder.addCase(updateSubscriptionPlan.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateSubscriptionPlan.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.plans.findIndex(plan => plan.id === action.payload.id);
      if (index !== -1) {
        state.plans[index] = action.payload;
      }
    });
    builder.addCase(updateSubscriptionPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete plan
    builder.addCase(deleteSubscriptionPlan.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteSubscriptionPlan.fulfilled, (state, action) => {
      state.loading = false;
      state.plans = state.plans.filter(plan => plan.id !== action.payload);
    });
    builder.addCase(deleteSubscriptionPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Selectors
export const selectAllSubscriptionPlans = (state) => state.subscriptionPlans.plans;
export const selectSubscriptionPlansStatus = (state) => state.subscriptionPlans.loading;

export const { setCurrentPlan, clearError } = subscriptionPlanSlice.actions;

export default subscriptionPlanSlice.reducer;
