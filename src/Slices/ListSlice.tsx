import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Lists } from "../Types/Lists";
import { remoteUrl } from "../Types/URL";

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
            console.log("aaaaaaa "+JSON.stringify(list));
            console.log('token  '+localStorage.getItem('token'))
            const res = await axios.post(`${remoteUrl}/lists/`, list);
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
            const res = await axios.get(`${remoteUrl}/lists/${personId}`);
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
            localStorage.setItem('lists', JSON.stringify(action.payload));
            state.lists= action.payload;
            console.log("lists are "+JSON.stringify(localStorage.getItem('lists')));
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