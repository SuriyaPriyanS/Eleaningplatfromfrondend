import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/index.jsx'

const store = configureStore({
  reducer: rootReducer
})

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store = { store }>
  <StrictMode>
    <App />
  </StrictMode>,
  </Provider>
  </BrowserRouter>
)
