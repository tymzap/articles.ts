import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from 'store';
import {Article} from 'interfaces/article';

import {ArticlesStoreState, fetchArticles} from 'store/articles';

export const useArticles = () => {
  const dispatch = useDispatch();

  const { data, error } = useSelector<StoreState, ArticlesStoreState>(
    (state) => state.articles
  );

  return {
    articles: data,
    error,
    fetchArticles: (category: Article['category']) => {
      dispatch(fetchArticles(category));
    }
  };
}
