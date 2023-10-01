import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import authReducer from './state/index.js'
import { configureStore } from '@reduxjs/toolkit'
import {Provider} from 'react-redux';


export const store=configureStore({
  reducer:

authReducer

})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>

  </React.StrictMode>,
)
