import {createContext} from 'react';

const AppState = createContext({
  isLoggedIn: false
});

export default AppState;
