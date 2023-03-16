import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { SWRConfig } from 'swr';

import App from './App';
import './index.css';
import { fetcher } from './lib/swrFetcher';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher, dedupingInterval: 100 }}>
      <ChakraProvider>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </SWRConfig>
  </React.StrictMode>
);
