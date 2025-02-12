import { configureStore } from "@reduxjs/toolkit";
import  prodata  from "../features/projectSlice";

export const Store=configureStore({
    reducer:{
        app:prodata

    }
})