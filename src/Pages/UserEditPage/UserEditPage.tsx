import { useEffect } from 'react'

const UserEditPage = () => {
  useEffect(() => {
    document.title = 'Редактирование пользователя'
  }, [])

  return <h1>Редактирование пользователя</h1>
}

export default UserEditPage
