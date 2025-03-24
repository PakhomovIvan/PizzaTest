import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/md-dark-indigo/theme.css'
import { BrowserRouter, Routes } from 'react-router-dom'
import { axiosInterceptors } from './Api/axios/AxiosInterceptors'
import './App.scss'
import Spinner from './Shared/spinner/Spinner'
import ShowToast from './Shared/toast/ShowToast'

function App() {
  axiosInterceptors()
  return (
    <BrowserRouter>
      <Routes></Routes>
      <Spinner />
      <ShowToast />
    </BrowserRouter>
  )
}

export default App
