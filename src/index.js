import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from "react-cookie";
//import { ErrorBoundary } from "react-error-boundary";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     
     <CookiesProvider>
          <Provider store={store}>
               <App />
          </Provider>
     </CookiesProvider>
           

);
reportWebVitals();
