import { User } from '../Models/User'
import { renamingUserRole } from './renamingUserRole'

export const renamingRolesInUsersList = (usersList: User[]) => {
  return {
    ...usersList,
    items: usersList.map((user: User) => {
      return { ...user, role: renamingUserRole(user.role) }
    }),
  }
}
