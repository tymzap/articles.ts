import {configureStore, combineReducers} from '@reduxjs/toolkit';

import articlesSlice from 'store/articles';
import appSlice from 'store/app';

const reducer = combineReducers({
  articles: articlesSlice.reducer,
  app: appSlice.reducer
});

export type StoreState = ReturnType<typeof reducer>;

const store = configureStore({
  reducer,
});

export default store;
