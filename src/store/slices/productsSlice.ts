import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type {ProductsState} from '../../types/Product.types';
import {ProductsApi} from '../../api/productsApi';
import {ProductModel} from '../../models/Product.model';

// Initial state
const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  loading: false,
  loadingMore: false,
  error: null,
  searchQuery: '',
  searchResults: [],
  searchLoading: false,
  pagination: {
    skip: 0,
    limit: 20,
    total: 0,
    hasMore: true,
  },
};

// Async Thunks

/**
 * Fetch products with pagination
 */
export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProducts',
  async (
    {skip, limit}: {skip: number; limit: number},
    {rejectWithValue},
  ) => {
    try {
      const response = await ProductsApi.fetchProducts(skip, limit);
      return {
        products: ProductModel.fromApiList(response.products),
        total: response.total,
        skip: response.skip,
        limit: response.limit,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch products',
      );
    }
  },
);

/**
 * Search products
 */
export const searchProductsThunk = createAsyncThunk(
  'products/searchProducts',
  async (
    {query, skip, limit}: {query: string; skip: number; limit: number},
    {rejectWithValue},
  ) => {
    try {
      const response = await ProductsApi.searchProducts(query, skip, limit);
      return {
        products: ProductModel.fromApiList(response.products),
        total: response.total,
        query,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to search products',
      );
    }
  },
);

/**
 * Fetch single product by ID
 */
export const fetchProductByIdThunk = createAsyncThunk(
  'products/fetchProductById',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await ProductsApi.fetchProductById(id);
      return ProductModel.fromApi(response);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch product',
      );
    }
  },
);

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetSearch: state => {
      state.searchQuery = '';
      state.searchResults = [];
      state.searchLoading = false;
    },
    clearError: state => {
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: builder => {
    // Fetch Products
    builder
      .addCase(fetchProductsThunk.pending, (state, action) => {
        if (action.meta.arg.skip === 0) {
          state.loading = true;
          state.products = [];
        } else {
          state.loadingMore = true;
        }
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        
        if (action.meta.arg.skip === 0) {
          state.products = action.payload.products;
        } else {
          state.products = [...state.products, ...action.payload.products];
        }
        
        state.pagination = {
          skip: action.payload.skip,
          limit: action.payload.limit,
          total: action.payload.total,
          hasMore: state.products.length < action.payload.total,
        };
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.payload as string;
      });

    // Search Products
    builder
      .addCase(searchProductsThunk.pending, state => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload.products;
        state.searchQuery = action.payload.query;
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Product By ID
    builder
      .addCase(fetchProductByIdThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {resetSearch, clearError, setSearchQuery} = productsSlice.actions;
export default productsSlice.reducer;
