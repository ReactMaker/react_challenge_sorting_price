import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';

import createSagaMiddleware, { END } from 'redux-saga';
import sagaManager from '../sagaManager';

function reduxStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
		sagaMiddleware
	];

  const enhancers = [applyMiddleware(...middleware)];
  const finalCreateStore = compose(...enhancers)(createStore);
  const store = finalCreateStore(reducers, initialState,
    window.devToolsExtension && window.devToolsExtension());

  sagaManager.startSagas(sagaMiddleware);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('../reducers');  // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });

    module.hot.accept('../sagaManager', () => {
			sagaManager.cancelSagas(store);
			require('../sagaManager').default.startSagas(sagaMiddleware);
		});
  }

  store.runSaga = sagaMiddleware.run;
  return store;
}

export default reduxStore;