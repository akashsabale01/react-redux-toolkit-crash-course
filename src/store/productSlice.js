import { createSlice } from "@reduxjs/toolkit";

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
    setProducts(state, action){
        state.data = action.payload
    },
    setStatus(state, action){
        state.status = action.payload
    }
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
export function fetchProducts(){
    return async function  fetchProductThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING));

        try {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            dispatch(setProducts(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}