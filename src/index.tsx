import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { Persistor, Store } from './Store';
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <Provider store={Store}>
     <PersistGate loading={null} persistor={Persistor}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

