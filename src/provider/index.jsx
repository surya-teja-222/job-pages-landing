import React from 'react';
import { Provider } from 'react-redux';

import store from '../stores';

export default function ProviderWrapper({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
