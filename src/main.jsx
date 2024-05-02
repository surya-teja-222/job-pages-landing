import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './components/Home';
import Providers from './provider';
import './index.css';

const renderApp = () => (
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Providers>
      <Home />
    </Providers>,
  )
);

renderApp();
