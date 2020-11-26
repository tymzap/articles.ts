import {useDispatch, useSelector} from 'react-redux';

import {StoreState} from 'store';
import {Article} from 'interfaces/article';
import {
  setSorting,
  setFilters,
  getArticles,
  ArticlesStoreState,
  Sorting,
  Filter
} from 'store/articles';

export const useArticles = () => {
  const dispatch = useDispatch();

  const {
    currentData,
    error,
    isLoading,
    fetchedAt,
    filters,
    sorting
  } = useSelector<StoreState, ArticlesStoreState>(
    (state) => state.articles
  );

  return {
    data: currentData,
    error,
    isLoading,
    fetchedAt,
    filters,
    sorting,
    get: (category: Article['category']) => {
      dispatch(getArticles(category));
    },
    setSorting: (sorting: Sorting) => {
      dispatch(setSorting(sorting));
    },
    setFilters: (filters: Filter[]) => {
      dispatch(setFilters(filters));
    }
  };
}
