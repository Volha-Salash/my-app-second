/*
import { createStore } from 'redux'
import rootReducer from './reducer'

const store = createStore(rootReducer)

export default store
*/
import { createStore } from "redux";
import reducer from "./reducer";

//Need a reducer to create the store

export default function () {
  const store = createStore(reducer);
  return store;
}

