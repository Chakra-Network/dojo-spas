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
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#bae7ff',
      200: '#91d5ff',
      300: '#69c0ff',
      400: '#40a9ff',
      500: '#1890ff',
      600: '#096dd9',
      700: '#0050b3',
      800: '#003a8c',
      900: '#002766',
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
