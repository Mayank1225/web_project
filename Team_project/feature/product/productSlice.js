// src/redux/productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addProduct as addProductAPI, getUserProducts } from '../product/productAPI';

// Define an initial state
const initialState = {
products: [],  
  product: {
    id: '',
    name: '',
    href: '',
    images: [],
    imageAlt: '',
    price: '',
    color: '',
    sizes: '',
    type: '',
    condition: '',
    category: '',
    description: '',
    owner: '',
  },
  loading: false,
  error: null,
};

// Async thunk for adding a product
export const addProduct = createAsyncThunk(
    'product/add',
    async (productData, { rejectWithValue }) => {
      try {
        const data = await addProductAPI(productData);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const fetchUserProducts = createAsyncThunk(
    'product/fetchUserProducts',
    async (ownerEmail, { rejectWithValue }) => {
      try {
        const products = await getUserProducts(ownerEmail);
        return products;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
// Create the product slice
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      resetProduct: (state) => {
        state.product = initialState.product;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(addProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          // Update the state with the new product data if needed
        })
        .addCase(addProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        })
        .addCase(fetchUserProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUserProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
          })
          .addCase(fetchUserProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    },
  });
  
  export const { resetProduct } = productSlice.actions;
  export default productSlice.reducer;