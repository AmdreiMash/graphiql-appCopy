import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './firebase.ts';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
