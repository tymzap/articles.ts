import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import fetch from 'services/fetch';
import {Article} from 'interfaces/article';

export const fetchArticles = createAsyncThunk(
  'articles/fetch',
  async (category: Article['category'], st) => {
    return fetch<{articles: Article[]}>(`/articles/${category}`);
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    data: [] as Article[],
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.data.push(...action.payload.articles);
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.error = action.error.message as string;
    });
  }
});

export type ArticlesStoreState = ReturnType<typeof articlesSlice.reducer>;

export default articlesSlice;
