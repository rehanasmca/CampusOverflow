import { createStore, applyMiddleware  } from 'redux';
import thunkMiddleware from 'redux-thunk'
import thunk from 'redux-thunk';
import Reducers from './reducers/index';
const composedEnhancer = (thunk,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


const store = createStore(
    Reducers, applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;