import React from 'react';
import {
  View,
  Flex,
  Text,
  Image,
  Heading,
  ProgressCircle
} from '@adobe/react-spectrum';
import ImageIcon from '@spectrum-icons/workflow/Image';
import {ViewProps} from '@react-types/view';

import type {Article as ArticleType} from 'interfaces/article';
import useWindowSize from 'hooks/useWindowSize';
import useIsImageLoaded from 'hooks/useIsImageLoaded';
import BREAKPOINTS from 'config/breakpoints';

type ArticleProps = ViewProps & Pick<
  ArticleType, 'title' | 'preamble' | 'image' | 'date'
>;

const Article = ({title, preamble, image, date, ...rest}: ArticleProps) => {
  const {width} = useWindowSize();
  const isImageLoaded = useIsImageLoaded(image);

  return (
    <View
      padding={width >= BREAKPOINTS.TABLET ? 'size-200' : 'size-150'}
      borderWidth={'thin'}
      borderColor={'dark'}
      borderRadius={'medium'}
      width={'100%'}
      {...rest}
    >
      <Flex alignItems={'start'}>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          alignSelf={'center'}
          flexShrink={0}
          width={width >= BREAKPOINTS.TABLET ? 'size-2400' : 'size-1600'}
          height={width >= BREAKPOINTS.TABLET ? 'size-1600' : 'size-800'}
        >
          {image
            ? isImageLoaded
              ? (
                  <Image
                    src={image}
                    alt={title}
                    width={width >= BREAKPOINTS.TABLET ? 'size-3000' : 'size-1600'}
                    height={'auto'}
                  />
              )
              : <ProgressCircle isIndeterminate={true} />
            : <ImageIcon size={'XXL'} />
          }
        </Flex>
        <Flex
          direction={'column'}
          width={'100%'}
          marginX={'size-300'}
          marginY={'size-100'}
        >
          <Flex
            direction={width >= BREAKPOINTS.TABLET ? 'row' : 'column'}
            alignItems={'start'}
            justifyContent={'space-between'}
          >
            <Heading level={3} marginTop={0}>{title}</Heading>
            <Text
              marginStart={
                width >= BREAKPOINTS.TABLET ? 'size-300' : undefined
              }
              UNSAFE_style={{
                whiteSpace: 'nowrap'
              }}
            >
              {date}
            </Text>
          </Flex>
          <Text isHidden={width < BREAKPOINTS.TABLET}>{preamble}</Text>
        </Flex>
      </Flex>
    </View>
  );
};

export default Article;
