import axios from 'axios'
import { User } from '../../Common/Models/User'

export const getUser = async (id: number): Promise<User> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`)
  return res.data
}
