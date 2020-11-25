import {configureStore, combineReducers} from '@reduxjs/toolkit';

import articlesSlice from 'store/articles';

const reducer = combineReducers({
  articles: articlesSlice.reducer
});

export type StoreState = ReturnType<typeof reducer>;

const store = configureStore({
  reducer,
});

export default store;
