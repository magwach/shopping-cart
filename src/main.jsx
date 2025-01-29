import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CurrentTabContext from './components/context/index.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <CurrentTabContext>
        <App />
      </CurrentTabContext>
    </StrictMode>
  </BrowserRouter>
  ,
)
