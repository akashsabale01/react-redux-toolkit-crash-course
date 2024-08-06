import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      /**
       * # Redux Core:
       *
       * - In redux state is immutable
       * - Internally createSlice present in redux-toolkit do like below
       *   return [...state, action.payload];
       * - It means we are returning new state instead of modifying state
       *
       */
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const {add,remove} = cartSlice.actions;

export default cartSlice.reducer;