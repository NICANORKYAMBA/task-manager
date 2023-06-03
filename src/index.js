import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
//import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';
import App from './components/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
  </Provider>
);