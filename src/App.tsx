import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {
  Provider as SpectrumProvider,
  defaultTheme,
  View,
  Flex,
} from '@adobe/react-spectrum';

import history from 'services/history';
import Articles from 'containers/Articles';
import Header from 'components/Header';
import {useAppSettings} from 'hooks/store/app';
import HelloTour from 'components/HelloTour';

import ROUTES from './routes';

const App = () => {
  const {colorScheme} = useAppSettings();

  return (
    <SpectrumProvider
      locale={'en'}
      theme={defaultTheme}
      colorScheme={colorScheme}
      minHeight={'100%'}
      position={'relative'}
    >
      <HelloTour />
      <View>
        <Flex direction={'column'}>
          <Header />
          <Router history={history}>
            <Switch>
              <Route component={Articles} path={ROUTES.ARTICLES} />
              <Route render={() => <Redirect to={ROUTES.ARTICLES} />} />
            </Switch>
          </Router>
        </Flex>
      </View>
    </SpectrumProvider>
  );
}

export default App;
