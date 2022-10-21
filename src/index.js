import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {AuthContextProvider} from './client/partials/store/auth.store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
