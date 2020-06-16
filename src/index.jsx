import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import redusers from './redux/redusers';
import '@csstools/normalize.css';
import 'antd/dist/antd.css';
import App from './components/App';

const store = createStore(redusers, compose(applyMiddleware(thunk)));

const Main = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
