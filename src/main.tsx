import { PrimeReactProvider } from 'primereact/api'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import './index.scss'
import store from './Stores/store.ts'

createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </PrimeReactProvider>
)
