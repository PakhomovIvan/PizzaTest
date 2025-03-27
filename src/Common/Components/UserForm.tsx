import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputMask } from 'primereact/inputmask'
import { InputSwitch } from 'primereact/inputswitch'
import { InputText } from 'primereact/inputtext'
import { SelectItem } from 'primereact/selectitem'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { checkingEmptyDataInput } from '../../Shared/forms/checkingEmptyDataInput'
import { UserCreation } from '../Models/UserCreation'
import { UserFormProps } from '../Models/UserFormProps'
import styles from './UserForm.module.scss'

const UserForm = ({ onSubmit, isLoadingData, userData }: UserFormProps) => {
  const roleOptions: SelectItem[] = [
    { label: 'Повар', value: 'cook' },
    { label: 'Официант', value: 'waiter' },
    { label: 'Водитель', value: 'driver' },
  ]

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<UserCreation>({
    defaultValues: {
      name: userData?.name ?? '',
      isArchive: userData?.isArchive ?? false,
      role: userData?.role ?? undefined,
      phone: userData?.phone ?? '',
      birthday: userData?.birthday ?? '',
    },
    mode: 'onTouched',
  })

  const getFormErrorMessage = (name: keyof UserCreation) => {
    return errors[name] && <small>{errors[name].message}</small>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['form-wrapper']}>
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
        {getFormErrorMessage('phone')}
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
        {getFormErrorMessage('birthday')}
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
        {getFormErrorMessage('role')}
      </div>
      <div className={styles['form-input']}>
        <Controller
          control={control}
          name="isArchive"
          render={({ field }) => (
            <div className={styles['isArchive-checkbox']}>
              <InputSwitch
                id={field.name}
                {...field}
                checked={!field.value}
                onChange={() => field.onChange(!field.value)}
              />
              <label htmlFor={field.name}>
                {!field.value ? 'Активный' : 'В архиве'}
              </label>
            </div>
          )}
        />
      </div>
      <div className={styles['action-form']}>
        <Link to="/users-list">
          <Button label="Назад" severity="contrast" />
        </Link>
        <Button
          label={userData ? 'Сохранить' : 'Создать'}
          severity="contrast"
          disabled={!isValid}
          loading={isLoadingData}
        />
      </div>
    </form>
  )
}

export default UserForm
