import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    Currency:[],
    search:"",
    currentPage: 1,
    itemsPerPage:10,
}


export const CurrencySlice =createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrency: (state, action) => {
          state.Currency = action.payload;
        },
        setSearch: (state, action) => {
          state.search = action.payload;
        },
        setCurrentPage: (state, action) => {
          state.currentPage = action.payload;
        },
      },
    });

    export const { setCurrency, setSearch, setCurrentPage } = CurrencySlice.actions;

export default CurrencySlice.reducer;