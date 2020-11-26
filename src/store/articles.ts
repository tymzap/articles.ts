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

export type ArticlesStoreState = {
  data: Article[];
  currentData: Article[];
  filters: Filter[];
  sorting: Sorting | null;
  error: string;
  isLoading: boolean;
  fetchedAt: {
    [K in Article['category']]: number
  };
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    data: [],
    currentData: [],
    filters: [],
    sorting: null,
    error: '',
    isLoading: false,
    fetchedAt: {
      sport: 0,
      fashion: 0
    }
  } as ArticlesStoreState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => ({
      ...state,
      data: action.payload
    }),
    setError: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload
    }),
    setFilters: (state, action: PayloadAction<Filter[]>) => {
      const filters = action.payload;
      const dataToFilter = state.currentData.length && !state.filters.length
        ? state.currentData
        : state.data;
      return {
        ...state,
        filters,
        sorting: null,
        currentData:
          filters.reduce(
            (accumulator, filter) =>
              accumulator.concat(
                dataToFilter.filter(
                  (article) => article[filter.key] === filter.is
                )
              ),
              [] as Article[]
          )
      }
    },
    setSorting: (
      state,
      action: PayloadAction<ArticlesStoreState['sorting']>
    ) => {
      const sorting = action.payload;
      const dataToSort = state.currentData.length ? state.currentData : state.data;
      return {
        ...state,
        sorting: sorting,
        currentData:
          sorting
            ? dataToSort.slice().sort(
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
            : dataToSort
      }
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload
    }),
    setFetchedAt: (
      state,
      action: PayloadAction<Partial<ArticlesStoreState['fetchedAt']>>
    ) => ({
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
    dispatch(setIsLoading(true));
    try {
      const data = await fetch<
        {articles: Article[]}
      >(`/articles/${resolveCategoryEndpoint(category)}`);
      dispatch(setArticles([...state.data, ...data.articles]));
      dispatch(setFetchedAt({
        [category]: Date.now()
      }));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setFilters([]));
    }
    dispatch(setIsLoading(false));
    dispatch(setFilters(unionWith(state.filters, [{
      key: 'category',
      is: category
    }], isEqual)));
    dispatch(setSorting(null));
  }
);

export default articlesSlice;
