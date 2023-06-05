import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducer'
import Game from './components/Game';
import './App.css';
//import store from './store';

const InitialState = {
    history:[
        {
            squares: Array(9).fill(null)
        }
    ],
    stepNumber: 0,
      xIsNext: true,
      isAscending: true,
      clickCount: 0 // добавленный счетчик
    };
  
const store = createStore(rootReducer, InitialState);



ReactDOM.render(
      <React.StrictMode>
      <Provider store={store}>
        <Game />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )

