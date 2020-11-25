import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import unionWith from 'lodash/unionWith';
import isEqual from 'lodash/isEqual';

import dayjs from 'services/date';
import fetch from 'services/fetch';
import {Article} from 'interfaces/article';
import {resolveCategoryEndpoint} from 'utils/article';
import {StoreState} from 'store';
import {compare} from 'utils/array';
import {FORMAT} from 'constants/date';

export type Filter = {
  key: Extract<keyof Article, 'category'>, is: Article['category'];
};

export type Sorting = {
  key: Extract<keyof Article, 'date' | 'title'>
  order: 'ASC' | 'DESC'
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    data: [] as Article[],
    currentData: [] as Article[],
    filters: [] as Filter[],
    sorting: [] as Sorting[],
    error: '',
    isLoading: false,
    fetchedAt: {
      sport: 0,
      fashion: 0
    } as {
      [K in Article['category']]: number
    }
  },
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => ({
      ...state,
      data: action.payload
    }),
    setError: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload
    }),
    setFilters: (state, action: PayloadAction<Filter[]>) => ({
      ...state,
      filters: action.payload,
      currentData:
        action.payload.reduce(
          (accumulator, filter) =>
            accumulator.concat(
              state.data.filter(
                (article) => article[filter.key] === filter.is
              )
            ),
            [] as Article[]
        )
    }),
    setSorting: (state, action: PayloadAction<Sorting>) => {
      const sorting = action.payload;
      const dataToSort = state.currentData.length ? state.currentData : state.data;
      return {
        ...state,
        sorting: [sorting],
        currentData:
          dataToSort.slice().sort(
            (previousArticle, nextArticle) =>
              sorting.key === 'date'
                ? compare(
                  dayjs(previousArticle.date, FORMAT)
                    .isBefore(dayjs(nextArticle.date, FORMAT)), sorting.order
                )
                : compare(
                  previousArticle.title < nextArticle.title, sorting.order
                )
          )
      }
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload
    }),
    setFetchedAt: (state, action: PayloadAction<Partial<{sport: number; fashion: number}>>) => ({
      ...state,
      fetchedAt: {
        ...state.fetchedAt,
        ...action.payload
      }
    })
  }
});

export const {
  setArticles,
  setFilters,
  setError,
  setIsLoading,
  setFetchedAt,
  setSorting
} = articlesSlice.actions;

export const getArticles = createAsyncThunk(
  'articles/fetch',
  async (category: Article['category'], {dispatch, getState}) => {
    const state = (getState() as StoreState).articles;
    if (!state.fetchedAt[category]) {
      dispatch(setIsLoading(true));
      try {
        const data = await fetch<
          {articles: Article[]}
        >(`/articles/${resolveCategoryEndpoint(category)}`);
        dispatch(setArticles([...state.data, ...data.articles]));
        dispatch(setFetchedAt({
          [category]: Date.now()
        }));
        dispatch(setIsLoading(false));
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
    dispatch(setFilters(unionWith(state.filters, [{
      key: 'category',
      is: category
    }], isEqual)));
  }
);

export type ArticlesStoreState = ReturnType<typeof articlesSlice.reducer>;

export default articlesSlice;
