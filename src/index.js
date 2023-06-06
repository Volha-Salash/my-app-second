import React from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import './App.css';
import { Game } from './components/_Game';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducer';

const store = configureStore({
  reducer: rootReducer,
})

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Game />
    </Provider>
);





