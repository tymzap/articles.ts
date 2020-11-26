import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {getStorage, setStorage} from 'services/webStorage';

import articlesSlice from 'store/articles';
import appSlice from 'store/app';

const reducer = combineReducers({
  articles: articlesSlice.reducer,
  app: appSlice.reducer
});

export type StoreState = ReturnType<typeof reducer>;

const preloadedState = getStorage<Partial<StoreState>>();

const store = configureStore({
  reducer,
  preloadedState,
});

store.subscribe(() => {
  setStorage({
    app: store.getState().app
  });
});

export default store;
