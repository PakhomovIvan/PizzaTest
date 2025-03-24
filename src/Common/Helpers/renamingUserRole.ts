import { UserRole } from '../Models/UserRole'

export const renamingUserRole = (role: UserRole) => {
  switch (role) {
    case 'driver':
      return 'Водитель'
    case 'waiter':
      return 'Официант'
    case 'cook':
      return 'Повар'
    default:
      return 'Роль пользователя не описана'
  }
}
