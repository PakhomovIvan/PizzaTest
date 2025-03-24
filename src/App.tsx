import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/md-dark-indigo/theme.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { axiosInterceptors } from './Api/axios/AxiosInterceptors'
import './App.scss'
import MainLayout from './Layouts/MainLayout'
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage'
import UserCreationPage from './Pages/UserCreationPage/UserCreationPage'
import UserEditPage from './Pages/UserEditPage/UserEditPage'
import UsersListPage from './Pages/UsersListPage/UsersListPage'
import Spinner from './Shared/spinner/Spinner'
import ShowToast from './Shared/toast/ShowToast'

function App() {
  axiosInterceptors()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/users-list" replace />} />
          <Route path="/users-list" element={<UsersListPage />} />
          <Route path="/users-list/:id/edit/" element={<UserEditPage />} />
          <Route path="/users-list/create" element={<UserCreationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Spinner />
      <ShowToast />
    </BrowserRouter>
  )
}

export default App
