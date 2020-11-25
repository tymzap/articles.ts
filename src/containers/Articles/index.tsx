import React, {useEffect} from 'react';
import {useArticles} from 'hooks/store/useArticles';

const Articles = () => {
  const {articles, error, fetchArticles} = useArticles();

  useEffect(() => {
    fetchArticles('fashion');
  }, []);

  useEffect(() => {
    console.log('articles', articles);
  }, [articles])

  return (
    <div>{articles.length ? articles.toString() : error}</div>
  );
}

export default Articles;
