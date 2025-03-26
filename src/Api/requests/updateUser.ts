import axios from 'axios'
import { User } from '../../Common/Models/User'
import { UserCreation } from '../../Common/Models/UserCreation'

export const updateUser = async (
  user: UserCreation,
  id: number
): Promise<User> => {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, user)
  return res.data
}
