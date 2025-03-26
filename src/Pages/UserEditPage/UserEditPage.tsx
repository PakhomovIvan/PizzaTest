import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUser } from '../../Api/requests/getUser'
import { User } from '../../Common/Models/User'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { setToast } from '../../Stores/slices/toastSlice'
import { AppDispatch } from '../../Stores/store'

const UserEditPage = () => {
  document.title = 'Редактирование пользователя'

  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    dispatch(showSpinner())
    getUser(Number(params.id))
      .then((data) => setSelectedUser(data))
      .catch(() =>
        dispatch(
          setToast({ type: 'error', message: 'Ошибка загрузки пользователей' })
        )
      )
      .finally(() => dispatch(hideSpinner()))
  }, [dispatch, params.id])

  return <h1>Редактирование пользователя</h1>
}

export default UserEditPage
