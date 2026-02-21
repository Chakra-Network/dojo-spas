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
      50: '#fff5f0',
      100: '#ffe5d9',
      200: '#ffc9b3',
      300: '#ffa784',
      400: '#ff8559',
      500: '#ff7a59',
      600: '#ff5c33',
      700: '#e64a19',
      800: '#bf360c',
      900: '#8c2600',
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
