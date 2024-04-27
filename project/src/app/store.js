



import {configureStore} from '@reduxjs/toolkit'
import currencyReducer from "../features/currency/CurrencySlice"
export const store =configureStore({
    reducer:{
        currency: currencyReducer
    },

});


