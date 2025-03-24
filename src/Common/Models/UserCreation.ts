import { UserRole } from './UserRole'

export interface UserCreation {
  name: string
  isArchive: boolean
  role: UserRole
  phone: string
  birthday: string
}
