import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import  Game  from "./Game";
import rootReducer from './reducers/reducer';
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
})

//console.log('Initial state: ', store.getState())

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
      <Game />
  </Provider>
);



