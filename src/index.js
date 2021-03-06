import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider,  } from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import publicReducers from './redux/reducers/public';
import privateReducers from './redux/reducers/private';
import socketIOClient from "socket.io-client";

let socket;
if (process.env.NODE_ENV === 'development') {
  socket = socketIOClient("http://localhost:4001");
}
else {
  socket = socketIOClient("https://socket-server-dev.us-east-2.elasticbeanstalk.com:8080");
}

// Middleware
const logger = store => next => action => {
  let result = next(action);
  const nextState = store.getState();
  if (action.type === "public/setTurn" || action.type === "public/endTurn") {
    socket.emit("publicStateChange", nextState.public, nextState.public.roomID);
  }
  return result
};

// FireFox Redux Dev Tools Extension
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const rootReducers = combineReducers({
  public: publicReducers,
  private: privateReducers
});

let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(logger))
  );
}
else {
  store = createStore(
    rootReducers,
    applyMiddleware(logger)
  );
}


ReactDOM.render(
  <Provider store={store}>
    <App socket={socket}/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
