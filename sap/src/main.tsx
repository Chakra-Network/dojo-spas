import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { DojoProvider } from './dojo/state';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <DojoProvider>
        <App />
      </DojoProvider>
    </ChakraProvider>
  </StrictMode>
);
