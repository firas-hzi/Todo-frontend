import { configureStore } from "@reduxjs/toolkit";
import ItemSlice from "./Slices/ItemSlice";
import ListSlice from "./Slices/ListSlice";
import personSlice  from "./Slices/PersonSlice";


export const Store = configureStore({
    reducer: {
       
        auth: personSlice,
        list: ListSlice,
        item: ItemSlice
     
    },
    devTools:true
});
export type RootState = ReturnType<typeof Store.getState>;
export type DispatchType = typeof Store.dispatch;