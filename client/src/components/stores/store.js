import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer,FLUSH,REGISTER,PAUSE,PURGE,REHYDRATE,PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducer'; 
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'



const persistConfig = {
  key: 'root', 
  storage,
  stateReconciler: hardSet, // For immutable data structure diffing
};


const persistedReducer = persistReducer(persistConfig,rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REGISTER, PAUSE, PURGE, REHYDRATE,PERSIST]
    },
  })   
});


const persistor = persistStore(store);

export { store, persistor };

