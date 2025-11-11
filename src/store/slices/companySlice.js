import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { ENDPOINT_COMPANY } from '../../constants/endpoints';

// Async thunks
export const fetchCompanies = createAsyncThunk(
  'companies/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(ENDPOINT_COMPANY);
      return response?.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createCompany = createAsyncThunk(
  'companies/create',
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ENDPOINT_COMPANY, companyData);
      return response?.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCompany = createAsyncThunk(
  'companies/update',
  async ({ id, ...companyData }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`${ENDPOINT_COMPANY}/${id}`, companyData);
      return response?.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  'companies/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`${ENDPOINT_COMPANY}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  companies: [],
  currentCompany: null,
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all companies
    builder.addCase(fetchCompanies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.loading = false;
      state.companies = action.payload;
    });
    builder.addCase(fetchCompanies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create company
    builder.addCase(createCompany.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCompany.fulfilled, (state, action) => {
      state.loading = false;
      state.companies.push(action.payload);
    });
    builder.addCase(createCompany.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update company
    builder.addCase(updateCompany.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCompany.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.companies.findIndex(company => company.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    });
    builder.addCase(updateCompany.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete company
    builder.addCase(deleteCompany.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCompany.fulfilled, (state, action) => {
      state.loading = false;
      state.companies = state.companies.filter(company => company.id !== action.payload);
    });
    builder.addCase(deleteCompany.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Selectors
export const selectAllCompanies = (state) => state.companies.companies;
export const selectCompaniesStatus = (state) => state.companies.loading;

export const { setCurrentCompany, clearError } = companySlice.actions;

export default companySlice.reducer;
