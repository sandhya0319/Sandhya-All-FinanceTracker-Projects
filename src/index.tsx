import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import $ from 'jquery';
import Popper from 'popper.js';
import { CookiesProvider } from 'react-cookie';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CookiesProvider>
          <Provider store={store}>
               <App />
          </Provider>
  </CookiesProvider>
);

