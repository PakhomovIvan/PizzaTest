import { Button } from 'primereact/button'
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers } from '../../Api/requests/getUsers'
import { User } from '../../Common/Models/User'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { setToast } from '../../Stores/slices/toastSlice'
import { AppDispatch } from '../../Stores/store'
import styles from './UsersListPage.module.scss'

const UsersListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [usersList, setUsersList] = useState<User[] | null>(null)
  const [userRole] = useState<string[]>(['Водитель', 'Официант', 'Повар'])

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
      <Tag
        value={user.isArchive ? 'Архивный' : 'Активный'}
        severity={user.isArchive ? 'contrast' : 'success'}
        // {user.isArchive ?  : 'success'}
      ></Tag>
    )
  }

  const statusRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={userRole}
        onChange={(e: DropdownChangeEvent) =>
          options.filterApplyCallback(e.value)
        }
        placeholder="Выберите..."
        className="p-column-filter"
        showClear
        style={{ minWidth: '12rem' }}
      />
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['users-list-header']}>
        <h1>Список пользователей</h1>
        {usersList && (
          <Link to="./create">
            <Button
              label="Создать пользователя"
              severity="contrast"
              icon="pi pi-user-plus"
              iconPos="right"
            />
          </Link>
        )}
      </div>
      {usersList && (
        <div className={styles['users-list-table']}>
          <DataTable
            value={usersList}
            filterDisplay="row"
            emptyMessage="Список пользователей пуст"
            stripedRows
            scrollable
            scrollHeight="800px"
            selectionMode="single"
            onRowSelect={(e) => navigate(`./${e.data.id}/edit`)}
          >
            <Column field="name" header="Имя" sortable></Column>
            <Column
              field="role"
              header="Должность"
              filter
              filterElement={statusRowFilterTemplate}
              showFilterMenu={false}
              showClearButton={false}
            ></Column>
            <Column field="phone" header="Телефон"></Column>
            <Column field="birthday" header="Дата рождения" sortable></Column>
            <Column
              field="isArchive"
              header="Статус"
              body={isArchiveUser}
            ></Column>
          </DataTable>
        </div>
      )}
    </div>
  )
}

export default UsersListPage
