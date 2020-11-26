import React, {useEffect} from 'react';
import {
  View,
  Flex,
  Picker,
  Item,
  Content,
  IllustratedMessage,
  Heading,
} from '@adobe/react-spectrum';
import ErrorIllustration from '@spectrum-icons/illustrations/Error';
import NoSearchResultsIllustration from '@spectrum-icons/illustrations/NoSearchResults';
import omit from 'lodash/omit';

import {useArticles} from 'hooks/store/articles';
import Article from 'components/Article';
import BREAKPOINTS from 'config/breakpoints';
import useWindowSize from 'hooks/useWindowSize';
import i18n from 'services/i18n';

import Filters from './Filters';

const Articles = () => {
  const {
    data,
    error,
    isLoading,
    sorting,
    setSorting,
    setFilters
  } = useArticles();

  const {width} = useWindowSize();

  useEffect(() => {
    if (error) {
      setFilters([]);
    }
  }, [error]);

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
          <Filters />
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
              <Filters />
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
              isHidden={!data.length && width < BREAKPOINTS.TABLET}
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
              margin={width >= BREAKPOINTS.DESKTOP ? 'size-1000' : 'size-250'}
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
