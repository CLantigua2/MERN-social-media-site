import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// creates an initial state object
const initialState = {};

// place thunk and other middleware into an array
const middleware = [ thunk ];

// created store with the rootReducer, initial state, and used composeWithDevTools to bring in redux chrome dev tools only in development
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// exports the store, will wrap around everything that will be rendered
export default store;
