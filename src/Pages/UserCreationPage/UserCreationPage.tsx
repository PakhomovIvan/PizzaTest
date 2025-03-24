import { useEffect } from 'react'

const UserCreationPage = () => {
  useEffect(() => {
    document.title = 'Создание пользователя'
  }, [])

  return <h1>Создание пользователя</h1>
}

export default UserCreationPage
