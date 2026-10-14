import { configureStore } from "@reduxjs/toolkit";
import bankReducer from '../features/bankslice'; //Bank Reducer

export const store = configureStore({
    reducer : {
        bank: bankReducer, //Hooking the banking ledger up to our control system
    },
});