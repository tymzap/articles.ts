import {configureStore, combineReducers} from '@reduxjs/toolkit';

import articlesSlice from 'store/articles';

const rootReducer = combineReducers({
  articles: articlesSlice.reducer
});

export type StoreState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer
});

export default store;
