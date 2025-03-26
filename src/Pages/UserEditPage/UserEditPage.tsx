import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../../Api/requests/getUser'
import { updateUser } from '../../Api/requests/updateUser'
import UserForm from '../../Common/Components/UserForm'
import { User } from '../../Common/Models/User'
import { UserCreation } from '../../Common/Models/UserCreation'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { setToast } from '../../Stores/slices/toastSlice'
import { AppDispatch } from '../../Stores/store'

const UserEditPage = () => {
  document.title = 'Редактирование пользователя'

  const params = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false)

  const userId = Number(params.id)

  const onSubmit: SubmitHandler<UserCreation> = (data: UserCreation) => {
    setIsLoadingData(true)
    updateUser(data, userId)
      .then(() => {
        dispatch(setToast({ type: 'success', message: 'Пользователь изменён' }))
        navigate('/users-list')
      })
      .catch(() =>
        dispatch(
          setToast({ type: 'error', message: 'Ошибка изменения пользователя' })
        )
      )
      .finally(() => setIsLoadingData(false))
  }

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

  return (
    <>
      <h1>Редактирование пользователя</h1>
      {selectedUser && (
        <UserForm
          onSubmit={onSubmit}
          isLoadingData={isLoadingData}
          userData={selectedUser}
        />
      )}
    </>
  )
}

export default UserEditPage
