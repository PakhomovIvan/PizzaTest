import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { classNames } from 'primereact/utils'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../Api/requests/getUsers'
import { User } from '../../Common/Models/User'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { setToast } from '../../Stores/slices/toastSlice'
import { AppDispatch } from '../../Stores/store'
import styles from './UsersListPage.module.scss'

const UsersListPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [usersList, setUsersList] = useState<User[] | null>(null)

  useEffect(() => {
    document.title = 'Список пользователей'
  }, [])

  useEffect(() => {
    dispatch(showSpinner())
    getUsers()
      .then((data) => setUsersList(data))
      .catch(() =>
        dispatch(
          setToast({ type: 'error', message: 'Ошибка загрузки пользователей' })
        )
      )
      .finally(() => dispatch(hideSpinner()))
  }, [dispatch])

  const isArchiveUser = (user: User) => {
    return (
      <i
        className={classNames('pi', {
          'true-icon pi-check-circle': user.isArchive,
        })}
      ></i>
    )
  }

  return (
    <div className={styles.wrapper}>
      <h1>Список пользователей</h1>
      {usersList && (
        <DataTable
          value={usersList}
          emptyMessage="Список пользователей пуст"
          stripedRows
          scrollable
          scrollHeight="600px"
        >
          <Column field="name" header="Имя"></Column>
          <Column field="role" header="Должность"></Column>
          <Column field="phone" header="Телефон"></Column>
          <Column field="birthday" header="Дата рождения"></Column>
          <Column
            field="isArchive"
            body={isArchiveUser}
            header="Архив"
          ></Column>
        </DataTable>
      )}
    </div>
  )
}

export default UsersListPage
