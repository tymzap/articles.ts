import React, {useEffect} from 'react';
import {
  View,
  Flex,
  Picker,
  Item,
  ListBox,
  Section,
  Content,
  ProgressCircle,
  IllustratedMessage,
  Heading
} from '@adobe/react-spectrum';
import Error from '@spectrum-icons/illustrations/Error';
import omit from 'lodash/omit';
import compact from 'lodash/compact';

import {useArticles} from 'hooks/store/articles';
import Article from 'components/Article';
import {Filter} from 'store/articles';
import BREAKPOINTS from 'config/breakpoints';
import useWindowSize from 'hooks/useWindowSize';

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

  console.log('sorting', sorting);

  useEffect(() => {
    console.log('articles', data);
  }, [data]);

  return (
    <View
      paddingX={'size-300'}
      paddingTop={'size-200'}
      paddingBottom={'size-400'}
    >
      <Flex direction={width >= BREAKPOINTS.PHONE ? 'row' : 'column'}>
        <Flex>
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
            width={'size-2400'}
          >
            <Section title={'Data sources'}>
              <Item key={'fashion'}>Fashion</Item>
              <Item key={'sport'}>Sport</Item>
            </Section>
          </ListBox>
        </Flex>
        <Flex direction={'column'} width={'100%'}>
          <Flex justifyContent={'end'}>
            <Picker
              label={'Sort by'}
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
            >
              <Item key={'dateAsc'}>Date: ascending</Item>
              <Item key={'dateDesc'}>Date: descending</Item>
              <Item key={'titleAsc'}>Title: ascending</Item>
              <Item key={'titleDesc'}>Title: descending</Item>
            </Picker>
          </Flex>
          <Flex marginTop={'size-225'} marginStart={'size-225'}>
            <Content isHidden={!data.length || !!error || isLoading}>
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
              isHidden={!error}
              margin={'size-1000'}
              width={'100%'}
            >
              <IllustratedMessage>
                <Error />
                <Heading>Sorry, we have a problem</Heading>
                <Content>{error}</Content>
              </IllustratedMessage>
            </Flex>
          </Flex>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            isHidden={!isLoading}
            margin={'size-1000'}
            width={'100%'}
          >
            <ProgressCircle isIndeterminate={true}/>
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
}

export default Articles;
