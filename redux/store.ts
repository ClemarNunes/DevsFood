import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './reducers/CartReducer';
 

export const store = configureStore({
    reducer:{
    
        CartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
   })
});


export type RootState = ReturnType<typeof store.getState>;