import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import '@fontsource-variable/inter'
import './styles/tailwind.css'
import './styles/globals.scss'

import App from './App.jsx'

// Vite injects the deploy base here. On GitHub Pages this is `/<repo>/`; on a
// custom domain it is `/`. React Router wants it without the trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Hand the splash over to the app.
//
// The loader in index.html paints before this bundle exists and covers the
// wait for it, the stylesheet and the hero image. It is dismissed on the real
// `load` event rather than a timer, so the first thing a visitor sees is a
// finished page. The controller enforces its own minimum visible time and a
// hard limit, so a slow image can neither cause a flash nor trap anyone.
const loader = window.GrayBrickLoader

if (loader) {
  if (document.readyState === 'complete') loader.finish()
  else window.addEventListener('load', () => loader.finish(), { once: true })
}
