import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { DojoProvider } from './dojo/state.tsx';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        fontFamily: 'body',
        lineHeight: 'base',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <DojoProvider>
        <App />
      </DojoProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
