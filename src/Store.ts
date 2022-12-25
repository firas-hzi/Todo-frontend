import { AnyAction, combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import ItemSlice from "./Slices/ItemSlice";
import ListSlice from "./Slices/ListSlice";
import personSlice  from "./Slices/PersonSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === 'auth/logout') {
  
      // this applies to all keys defined in persistConfig(s)
      storage.removeItem('persist:root')
  
      state = {} as RootState
    }
    return appReducer(state, action)
  }

  

  const appReducer = combineReducers({ 
    auth: personSlice,
    list: ListSlice,
    item: ItemSlice
  })
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer: persistedReducer,
    
    devTools:true
});

export const Persistor= persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;
export type DispatchType = typeof Store.dispatch;
