import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {Provider as SpectrumProvider, defaultTheme} from '@adobe/react-spectrum';

import history from 'services/history';
import Articles from 'containers/Articles';

import ROUTES from './routes';

const App = () => {
  return (
    <SpectrumProvider
      locale={'en'}
      theme={defaultTheme}
      height={'100%'}
    >
      <Router history={history}>
        <Switch>
          <Route component={Articles} path={ROUTES.ARTICLES} />
          <Route render={() => <Redirect to={ROUTES.ARTICLES} />} />
        </Switch>
      </Router>
    </SpectrumProvider>
  );
}

export default App;
