import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../ApiSetup";
import { Lists } from "../Types/Lists";

interface ListSliceState {
    lists: Lists[],
    listId:number
};


const initialState: ListSliceState = {
    lists: [],
    listId:0
};





export const createList = createAsyncThunk(
    'list/create',
    async(list:Lists, thunkAPI) => {
        try{
           
            const res = await request.post(`/lists/`, list);
            return res.data;
        } catch(e) {
            return thunkAPI.rejectWithValue('Invalid List');
        }
    }
);
export const getLists = createAsyncThunk(
    'list/getListsByPerson',
    async(personId:number,thunkAPI) => {
        try{    
            const res = await request.get(`/lists/${personId}`);
           return res.data;
         
        } catch(e) {
            return thunkAPI.rejectWithValue('No Items in the List');
        }
    }
);

export const ListSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        currentListId: (state:ListSliceState, action:PayloadAction<number>) => {
            state.listId =  action.payload;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createList.fulfilled, (state, action) => {
            return state;
        });
        builder.addCase(getLists.fulfilled, (state,action) => {
            state.lists= action.payload;
            return state
        });

        builder.addCase(createList.rejected, (state,action) => {   
            console.log(" create lits rejected");
            return state
        });

        builder.addCase(getLists.rejected, (state) => {
            console.log(" get lits rejected");
            return state
        });
     
    }
});
export const {currentListId} = ListSlice.actions;
export default ListSlice.reducer;