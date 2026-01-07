import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './styles/globalStyles.js'

import Router from './Routes/routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    <GlobalStyle />
  </React.StrictMode>,
)
