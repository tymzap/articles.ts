import React from 'react';
import {
  Flex,
  View,
  Heading,
  ActionButton,
  Text,
  Divider
} from '@adobe/react-spectrum';
import LightIcon from '@spectrum-icons/workflow/Light';
import MoonIcon from '@spectrum-icons/workflow/Moon';
import ArticleIcon from '@spectrum-icons/workflow/Article';

import {useColorScheme} from 'hooks/store/app';
import BREAKPOINTS from 'config/breakpoints';
import useWindowSize from 'hooks/useWindowSize';
import i18n from 'services/i18n';

const Header = () => {
  const {width} = useWindowSize();
  const {colorScheme, setColorScheme} = useColorScheme();

  return (
    <View paddingX={'size-250'}>
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Flex alignItems={'center'} gap={'size-200'}>
          <ArticleIcon marginTop={width >= BREAKPOINTS.TABLET ? undefined : 'size-225'}/>
          <Flex direction={'column'}>
            <Heading level={1} marginBottom={0}>
              {i18n.t('header.title')}
            </Heading>
            <Text isHidden={width < BREAKPOINTS.TABLET}>{i18n.t('header.slogan')}</Text>
          </Flex>
        </Flex>
        <ActionButton
          onPress={() => {
            setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
          }}
          aria-label={i18n.t('header.changeColorSchemeButtonLabel')}
          marginTop={'size-225'}
        >
          {colorScheme === 'light' ? <LightIcon /> : <MoonIcon />}
        </ActionButton>
      </Flex>
      <Divider size={'S'} marginTop={'size-150'} />
    </View>
  );
}

export default Header;
