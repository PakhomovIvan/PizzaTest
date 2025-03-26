import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../Api/requests/createUser'
import UserForm from '../../Common/Components/UserForm'
import { UserCreation } from '../../Common/Models/UserCreation'
import { setToast } from '../../Stores/slices/toastSlice'
import { AppDispatch } from '../../Stores/store'

const UserCreationPage = () => {
  document.title = 'Создание пользователя'

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [isLoadingData, setIsLoadingData] = useState<boolean>(false)

  const onSubmit: SubmitHandler<UserCreation> = (data: UserCreation) => {
    setIsLoadingData(true)
    createUser(data)
      .then(() => {
        dispatch(
          setToast({ type: 'success', message: 'Пользователь добавлен' })
        )
        navigate('/users-list')
      })
      .catch(() =>
        dispatch(
          setToast({ type: 'error', message: 'Ошибка добавления пользователя' })
        )
      )
      .finally(() => setIsLoadingData(false))
  }

  return (
    <>
      <h1>Создание пользователя</h1>
      <UserForm onSubmit={onSubmit} isLoadingData={isLoadingData} />
    </>
  )
}

export default UserCreationPage
