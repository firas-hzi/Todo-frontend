import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../ApiSetup";
import { CreateItem, Item } from "../Types/Item";


interface ItemSliceState {
    items: Item[]
};


const initialState: ItemSliceState = {
    items: []
};

export const createItem = createAsyncThunk(
    'item/create',
    async(item:CreateItem, thunkAPI) => {
        try{
            
            const res = await request.post(`/items/`, item);
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
            const res = await request.get(`/items/${listId}`);
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
            const res = await request.delete(`/items/${itemId}`);
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
          
            state.items= action.payload;
           
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