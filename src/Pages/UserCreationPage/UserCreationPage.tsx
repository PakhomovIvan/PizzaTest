import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputMask } from 'primereact/inputmask'
import { InputText } from 'primereact/inputtext'
import { SelectItem } from 'primereact/selectitem'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../../Api/requests/createUser'
import { UserCreation } from '../../Common/Models/UserCreation'
import { checkingEmptyDataInput } from '../../Shared/forms/checkingEmptyDataInput'
import { setToast } from '../../Stores/slices/toastSlice'
import { AppDispatch } from '../../Stores/store'
import styles from './UserCreationPage.module.scss'

const UserCreationPage = () => {
  useEffect(() => {
    document.title = 'Создание пользователя'
  }, [])

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false)

  const roleOptions: SelectItem[] = [
    { label: 'Повар', value: 'cook' },
    { label: 'Официант', value: 'waiter' },
    { label: 'Водитель', value: 'driver' },
  ]

  const {
    control,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<UserCreation>({
    defaultValues: {
      name: '',
      isArchive: false,
      role: undefined,
      phone: '',
      birthday: '',
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<UserCreation> = (data: UserCreation) => {
    setIsLoadingData(true)
    createUser(data)
      .then(() => {
        dispatch(
          setToast({ type: 'success', message: 'Пользователь добавлен' })
        )
        navigate('/users-list')
      })
      .catch(() =>
        dispatch(
          setToast({ type: 'error', message: 'Ошибка добавления пользователя' })
        )
      )
      .finally(() => setIsLoadingData(false))
  }

  const getFormErrorMessage = (name: keyof UserCreation) => {
    return errors[name] && <small>{errors[name].message}</small>
  }

  return (
    <>
      <h1>Создание пользователя</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles['form-wrapper']}
      >
        <div className={styles['form-input']}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Обязательно для заполнения',
              validate: (value) => checkingEmptyDataInput(value),
              maxLength: {
                value: 30,
                message: 'Допустимое количество символов - 30',
              },
              pattern: {
                value: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
                message: 'Недопустимый формат имени',
              },
            }}
            render={({ field }) => (
              <FloatLabel>
                <InputText
                  id={field.name}
                  {...field}
                  placeholder="Введите..."
                  invalid={errors.name ? true : false}
                />
                <label form={field.name}>
                  Имя<span>*</span>
                </label>
              </FloatLabel>
            )}
          />
          {getFormErrorMessage('name')}
        </div>
        <div className={styles['form-input']}>
          <Controller
            control={control}
            name="phone"
            rules={{
              required: 'Обязательно для заполнения',
              validate: (value) => checkingEmptyDataInput(value),
            }}
            render={({ field }) => (
              <FloatLabel>
                <InputMask
                  id={field.name}
                  {...field}
                  mask="+7 (999) 999-9999"
                  placeholder="(999) 999-9999"
                  invalid={errors.phone ? true : false}
                ></InputMask>
                <label form={field.name}>
                  Телефон<span>*</span>
                </label>
              </FloatLabel>
            )}
          />
          {getFormErrorMessage('name')}
        </div>
        <div className={styles['form-input']}>
          <Controller
            control={control}
            name="birthday"
            rules={{
              required: 'Обязательно для заполнения',
              validate: (value) => checkingEmptyDataInput(value),
            }}
            render={({ field }) => (
              <FloatLabel>
                <InputMask
                  id={field.name}
                  {...field}
                  mask="99.99.9999"
                  slotChar="дд.мм.гггг"
                  invalid={errors.birthday ? true : false}
                ></InputMask>
                <label form={field.name}>
                  Дата рождения<span>*</span>
                </label>
              </FloatLabel>
            )}
          />
          {getFormErrorMessage('name')}
        </div>
        <div className={styles['form-input']}>
          <Controller
            control={control}
            name="role"
            rules={{
              required: 'Обязательно для заполнения',
              validate: (value) => checkingEmptyDataInput(value),
            }}
            render={({ field }) => (
              <FloatLabel>
                <Dropdown
                  id={field.name}
                  {...field}
                  className={styles['dropdown-role']}
                  inputId={field.name}
                  options={roleOptions}
                  placeholder="Выберите..."
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  invalid={errors.role ? true : false}
                />
                <label form={field.name}>
                  Должность<span>*</span>
                </label>
              </FloatLabel>
            )}
          />
          {getFormErrorMessage('name')}
        </div>
        <div className={styles['action-form']}>
          <Link to="/users-list">
            <Button label="Назад" severity="contrast" />
          </Link>
          <Button
            label="Создать"
            severity="contrast"
            disabled={!isValid}
            loading={isLoadingData}
          />
        </div>
      </form>
    </>
  )
}

export default UserCreationPage
