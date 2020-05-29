import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import myApp from './reducers';
import App from './App';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

let store = createStore(myApp, applyMiddleware(ReduxThunk));

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(render);

render();
