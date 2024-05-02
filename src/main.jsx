import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Providers from './provider';
import './index.css';

const renderApp = () => (
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Providers>
      <App />
    </Providers>,
  )
);

renderApp();
