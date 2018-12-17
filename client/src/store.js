import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// creates an initial state object
const initialState = {};

// place thunk and other middleware into an array
const middleware = [ thunk ];

// created store with the rootReducer, initial state, and used compose to bring in redux chrome dev tools
const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

// exports the store, will wrap around everything that will be rendered
export default store;
