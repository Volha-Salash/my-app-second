/*import {createStore,  applyMiddleware} from 'redux';
//import Reducer from '../reducers/reducer'
import rootReducer from '../reducers/reducer';


export default function configureStore() {
  const createStoreWithMiddleware = applyMiddleware(createStore);
  const store = createStoreWithMiddleware(rootReducer);
  return store;
}

/*
import { createStore } from 'redux'
import rootReducer from './reducer'

const store = createStore(rootReducer)

export default store
*/
