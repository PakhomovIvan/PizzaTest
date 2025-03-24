import axios from 'axios'
import { User } from '../../Common/Models/User'
import { UserCreation } from '../../Common/Models/UserCreation'

export const createUser = async (user: UserCreation): Promise<User> => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/staff`, user)
  return res.data
}
