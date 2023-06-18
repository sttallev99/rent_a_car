import { createStore, applyMiddleware,combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer } from './reducers/reducer.js'
import { loading } from './reducers/loading.js';

const composeEnhancers = composeWithDevTools({
});

const rootReducers = combineReducers({
    reducer,
    loading
});

const store = createStore(
  rootReducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;