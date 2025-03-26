import { SubmitHandler } from 'react-hook-form'
import { User } from './User'
import { UserCreation } from './UserCreation'

export interface UserFormProps {
  onSubmit: SubmitHandler<UserCreation>
  isLoadingData: boolean
  userData?: User
}
