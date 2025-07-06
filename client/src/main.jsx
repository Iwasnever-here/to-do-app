import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FaLeaf } from "react-icons/fa6";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <head>
      <FaLeaf />
      <title>Little Todos</title>
    </head> 
    <App />
  </StrictMode>,
)
