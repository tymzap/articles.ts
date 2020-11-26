import React from 'react';
import {Item, ListBox, Section} from '@adobe/react-spectrum';
import {ListBoxProps} from '@react-types/listbox';
import compact from 'lodash/compact';

import {Filter} from 'store/articles';
import BREAKPOINTS from 'config/breakpoints';
import i18n from 'services/i18n';
import {useArticles} from 'hooks/store/articles';
import useWindowSize from 'hooks/useWindowSize';

const Filters = <T extends object>(
  props: Omit<ListBoxProps<T>, 'children'>
) => {
  const {filters, isLoading, get, setFilters} = useArticles();
  const {width} = useWindowSize();

  return (
    <ListBox
      width={width >= BREAKPOINTS.PHONE ? 'size-3000' : '100%'}
      {...props}
      selectionMode={'multiple'}
      onSelectionChange={(selection) => {
        if (selection instanceof Set) {
          const categories = Array.from(selection) as Filter['is'][];
          const filters: Filter[] = compact(categories.map((category) => {
            get(category);
            return {
              key: 'category',
              is: category
            }
          }));
          setFilters(filters);
        }
      }}
      selectedKeys={filters.map((filter) => filter.is)}
      isLoading={isLoading}
    >
      <Section title={'Data sources'}>
        <Item key={'fashion'}>{i18n.t('article.category.fashion')}</Item>
        <Item key={'sport'}>{i18n.t('article.category.sport')}</Item>
      </Section>
    </ListBox>
  );
}

export default Filters;
