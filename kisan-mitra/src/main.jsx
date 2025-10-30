import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Auth0Provider
    domain="dev-m5zoyyqwu0xn7orc.us.auth0.com"
    clientId="UBEGDXIMYhd0igXfWcRfwe7du9K7V9eH"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Toaster />
    <App />
  </Auth0Provider >,
  // </StrictMode>,
)
