import { UserRole } from './UserRole'

export interface User {
  id: number
  name: string
  isArchive: boolean
  role: UserRole
  phone: string
  birthday: string
}
