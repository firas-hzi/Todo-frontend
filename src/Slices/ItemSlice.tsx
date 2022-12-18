import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Item } from "../Types/Item";
import { remoteUrl } from "../Types/URL";


interface ItemSliceState {
    items: Item[]
};


const initialState: ItemSliceState = {
    items: []
};

export const createItem = createAsyncThunk(
    'item/create',
    async(item:Item, thunkAPI) => {
        try{
            
            const res = await axios.post(`${remoteUrl}/items/`, item);
            return res.data;
        } catch(e) {
            return thunkAPI.rejectWithValue('Invalid Item');
        }
    }
);
export const getItems = createAsyncThunk(
    'item/getItemsByList',
    async(listId:number,thunkAPI) => {
        try{    
            const res = await axios.get(`${remoteUrl}/items/${listId}`);
           return res.data;
         
        } catch(e) {
            return thunkAPI.rejectWithValue('No Items in the List');
        }
    }
);

export const removeItem = createAsyncThunk(
    'item/removeItem',
    async(itemId:number,thunkAPI) => {
        try{    
            const res = await axios.delete(`${remoteUrl}/items/${itemId}`);
           return res.data;
         
        } catch(e) {
            return thunkAPI.rejectWithValue('No Items in the List');
        }
    }
);

export const ItemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createItem.fulfilled, (state, action) => {
            return state;
        });
        builder.addCase(getItems.fulfilled, (state,action) => {
            localStorage.setItem('items', JSON.stringify(action.payload));
            state.items= action.payload;
            console.log("items are "+JSON.stringify(localStorage.getItem('items')));
            return state
        });

        builder.addCase(createItem.rejected, (state,action) => {   
            return state
        });

        builder.addCase(getItems.rejected, (state) => {
            return state
        });
     
    }
});

export default ItemSlice.reducer;