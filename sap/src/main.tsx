import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { DojoProvider } from './dojo/state'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DojoProvider>
      <App />
    </DojoProvider>
  </StrictMode>,
)
