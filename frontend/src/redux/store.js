import {createStore,combineReducers} from 'redux';
import {authReducer} from './reducers/authReducer'

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const rootReducer = combineReducers({
    auth : authReducer,
});
const store = createStore(rootReducer,reduxDevTools);
export default store;
