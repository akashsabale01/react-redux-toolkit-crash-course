import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Creating ENUM manually in js as its present in typescript not in js
// Object.freeze() makes that object as readonly
export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const productSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    // setProducts(state, action) {
    //   state.data = action.payload;
    // },
    // setStatus(state, action) {
    //   state.status = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchProducts.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        });
},
});

export const { setProducts, setStatus } = productSlice.actions;

export default productSlice.reducer;

/**
 * We use middleware(thunk) for making async calls,
 * Note we cannot make async call in reducers as they are executed synchronously
 */

// Thunk
// Thunk is fun which returns fun

// Following is Basic Trunk, Redux-toolkit have wrapper around this basic trunk

// export function fetchProducts(){
//     return async function  fetchProductThunk(dispatch, getState){
//         dispatch(setStatus(STATUSES.LOADING));

//         try {
//             const res = await fetch("https://fakestoreapi.com/products");
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (error) {
//             console.log(error);
//             dispatch(setStatus(STATUSES.ERROR));
//
//     }
// }

// Following Trunk in Redux-toolkit which is wrapper around this basic trunk
// it is based on the promises

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
});
