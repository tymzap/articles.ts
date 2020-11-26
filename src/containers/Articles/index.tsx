import React from 'react';
import {
  View,
  Flex,
  Picker,
  Item,
  ListBox,
  Section,
  Content,
  IllustratedMessage,
  Heading,
} from '@adobe/react-spectrum';
import ErrorIllustration from '@spectrum-icons/illustrations/Error';
import NoSearchResultsIllustration from '@spectrum-icons/illustrations/NoSearchResults';
import omit from 'lodash/omit';
import compact from 'lodash/compact';

import {useArticles} from 'hooks/store/articles';
import Article from 'components/Article';
import {Filter} from 'store/articles';
import BREAKPOINTS from 'config/breakpoints';
import useWindowSize from 'hooks/useWindowSize';
import i18n from 'services/i18n';

const Articles = () => {
  const {
    data,
    error,
    isLoading,
    filters,
    fetchedAt,
    sorting,
    get,
    setSorting,
    setFilters
  } = useArticles();

  const {width} = useWindowSize();

  const renderListBox = () => (
    <ListBox
      selectionMode={'multiple'}
      onSelectionChange={(selection) => {
        if (selection instanceof Set) {
          const categories = Array.from(selection) as Filter['is'][];
          const filters: Filter[] = compact(categories.map((category) => {
            if (!fetchedAt[category]) {
              get(category);
              return;
            } else {
              return {
                key: 'category',
                is: category
              }
            }
          }));
          setFilters(filters);
        }
      }}
      selectedKeys={filters.map((filter) => filter.is)}
      width={width >= BREAKPOINTS.PHONE ? 'size-3000' : '100%'}
      isLoading={isLoading}
    >
      <Section title={'Data sources'}>
        <Item key={'fashion'}>{i18n.t('article.category.fashion')}</Item>
        <Item key={'sport'}>{i18n.t('article.category.sport')}</Item>
      </Section>
    </ListBox>
  );

  return (
    <View
      paddingX={'size-300'}
      paddingTop={'size-200'}
      paddingBottom={'size-800'}
    >
      <Flex direction={width >= BREAKPOINTS.PHONE ? 'row' : 'column'}>
        <Flex
          isHidden={width >= BREAKPOINTS.PHONE && width < BREAKPOINTS.DESKTOP}
        >
          {renderListBox()}
        </Flex>
        <Flex
          direction={'column'}
          width={'100%'}
          marginTop={width < BREAKPOINTS.PHONE ? 'size-150' : undefined}
        >
          <Flex
            justifyContent={
              width >= BREAKPOINTS.PHONE
                ? width >= BREAKPOINTS.DESKTOP
                  ? 'end'
                  : 'space-between'
                : 'center'
            }
          >
            <Flex
              isHidden={
                width < BREAKPOINTS.PHONE || width >= BREAKPOINTS.DESKTOP
              }
            >
              {renderListBox()}
            </Flex>
            <Picker
              label={i18n.t('articles.sorting.label')}
              onSelectionChange={(key) => {
                setSorting(
                  key === 'dateAsc' ? {
                    key: 'date',
                    order: 'ASC'
                  } : key === 'dateDesc' ? {
                    key: 'date',
                    order: 'DESC'
                  } : key === 'titleAsc' ? {
                    key: 'title',
                    order: 'ASC'
                  } : {
                    key: 'title',
                    order: 'DESC'
                  }
                );
              }}
              isDisabled={!data.length}
              selectedKey={
                sorting
                  ? `${sorting.key}${sorting.order === 'ASC' ? 'Asc' : 'Desc'}`
                  : 0
              }
            >
              <Item key={'dateAsc'}>{i18n.t('articles.sorting.options.dateAsc')}</Item>
              <Item key={'dateDesc'}>{i18n.t('articles.sorting.options.dateDesc')}</Item>
              <Item key={'titleAsc'}>{i18n.t('articles.sorting.options.titleAsc')}</Item>
              <Item key={'titleDesc'}>{i18n.t('articles.sorting.options.titleDesc')}</Item>
            </Picker>
          </Flex>
          <Flex
            marginTop={'size-300'}
            marginStart={width >= BREAKPOINTS.PHONE ? 'size-225' : undefined}
          >
            <Content isHidden={!data.length || !!error || isLoading} width={'100%'}>
              {data.map((article, index) => (
                <Article
                  {...omit(article, ['id'])}
                  marginTop={index ? 'size-250' : undefined}
                  key={index}
                />
              ))}
            </Content>
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              isHidden={!!data.length && !error}
              margin={'size-1000'}
              width={'100%'}
            >
              <IllustratedMessage
                marginEnd={width >= BREAKPOINTS.DESKTOP ? 'size-3000' : undefined}
              >
              {!!error
                ? (
                  <>
                    <ErrorIllustration />
                    <Heading>{i18n.t('articles.error.generic.title')}</Heading>
                    <Content>{i18n.t('articles.error.generic.description')}</Content>
                  </>
                )
                : (
                  <>
                    <NoSearchResultsIllustration />
                    <Heading>{i18n.t('articles.error.notFound.title')}</Heading>
                    <Content>{i18n.t('articles.error.notFound.description')}</Content>
                  </>
                )
              }
              </IllustratedMessage>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
}

export default Articles;
