import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {AuthContextProvider} from './client/partials/context/auth.context';
import {AppContextProvider} from './client/partials/context/app.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </AuthContextProvider>
);
