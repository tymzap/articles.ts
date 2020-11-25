import React, {useEffect} from 'react';

import {useArticles} from 'hooks/store/useArticles';

const Articles = () => {
  const {data, error, isLoading, get, setSorting, setFilters} = useArticles();

  useEffect(() => {
    console.log('articles', data);
  }, [data]);

  return (
    <div>
      <div>
        {data.length ? data.map((article) => <div>{article.title}</div>) : error}
      </div>
      <div>
        {isLoading ? 'loading' : null}
      </div>
      <div onClick={() => {
        get('fashion');
      }}>
        fetch fashion
      </div>
      <div onClick={() => {
        get('sport');
      }}>
        fetch sports
      </div>
      <div onClick={() => {
        setSorting({key: 'date', order: 'ASC'});
      }}>
        sort date asc
      </div>
      <div onClick={() => {
        setSorting({key: 'date', order: 'DESC'});
      }}>
        sort date desc
      </div>
      <div onClick={() => {
        setSorting({key: 'title', order: 'ASC'});
      }}>
        sort title asc
      </div>
      <div onClick={() => {
        setSorting({key: 'title', order: 'DESC'});
      }}>
        sort title desc
      </div>
      <div onClick={() => {
        setFilters([]);
      }}>
        remove filters
      </div>
      <div onClick={() => {
        setFilters([
          {
            key: 'category',
            is: 'fashion'
          },
          {
            key: 'category',
            is: 'sport'
          }
        ])
      }}>
        both fashion and sports
      </div>
    </div>
  );
}

export default Articles;
