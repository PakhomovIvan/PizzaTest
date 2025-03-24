import axios from 'axios'
import { renamingRolesInUsersList } from '../../Common/Helpers/renamingRolesInUsersList'

export const getUsers = async () => {
  const res = await axios.get(import.meta.env.VITE_API_URL)

  res.data = renamingRolesInUsersList(res.data)

  return res.data
}
