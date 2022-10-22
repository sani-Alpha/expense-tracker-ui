import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {AuthContextProvider} from './client/partials/store/auth.store';
import {AppContextProvider} from './client/partials/store/app.store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </AuthContextProvider>
);
