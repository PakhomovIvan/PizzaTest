import axios from 'axios'
import { renamingRolesInUsersList } from '../../Common/Helpers/renamingRolesInUsersList'
import { User } from '../../Common/Models/User'

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get(import.meta.env.VITE_API_URL)

  res.data = renamingRolesInUsersList(res.data)

  return res.data
}
