import axios, { AxiosError } from 'axios'

export const axiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message)
        throw new AxiosError(error.message)
      } else if (error instanceof Error) {
        console.log(error.stack)
        throw new Error(error.stack)
      }
    }
  )
}
