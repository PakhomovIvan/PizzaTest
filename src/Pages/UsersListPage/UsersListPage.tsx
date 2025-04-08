import { format, parse } from 'date-fns'
import { Button } from 'primereact/button'
import {
  Column,
  ColumnFilterElementTemplateOptions,
  ColumnSortEvent,
} from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import {
  TriStateCheckbox,
  TriStateCheckboxChangeEvent,
} from 'primereact/tristatecheckbox'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers } from '../../Api/requests/getUsers'
import { User } from '../../Common/Models/User'
import useWindowSize from '../../Shared/windowSize/WindowSize'
import { hideSpinner, showSpinner } from '../../Stores/slices/spinnerSlice'
import { setToast } from '../../Stores/slices/toastSlice'
import { AppDispatch } from '../../Stores/store'
import styles from './UsersListPage.module.scss'

const UsersListPage = () => {
  document.title = 'Список пользователей'

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [usersList, setUsersList] = useState<User[] | null>(null)
  const [userRole] = useState<string[]>(['Водитель', 'Официант', 'Повар'])
  const [isArchiveFilterValue, setIsArchiveFilterValue] = useState<
    boolean | string | null | undefined
  >('')

  const windowWidth = useWindowSize()
  const isMediumScreen = windowWidth < 768

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
      ></Tag>
    )
  }

  const roleRowFilter = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={options.value}
        variant="filled"
        options={userRole}
        onChange={(e: DropdownChangeEvent) =>
          options.filterApplyCallback(e.value)
        }
        placeholder="Выберите..."
        className="p-column-filter"
        showClear
        style={windowWidth > 420 ? { width: '140px' } : { width: '100px' }}
      />
    )
  }

  const isArchiveRowFilter = () => {
    const onChange = (e: TriStateCheckboxChangeEvent) => {
      if (e.value !== null) setIsArchiveFilterValue(e.value)
    }
    return <TriStateCheckbox value={isArchiveFilterValue} onChange={onChange} />
  }

  const filteredUsers = usersList
    ? isArchiveFilterValue === ''
      ? usersList
      : usersList.filter((user) => user.isArchive === !isArchiveFilterValue)
    : null

  const formatDate = (value: string | Date) => {
    const date =
      typeof value === 'string' ? parse(value, 'dd.MM.yyyy', new Date()) : value
    return format(date, 'dd.MM.yyyy')
  }

  const dateBodyTemplate = (rowData: User) => {
    return formatDate(rowData.birthday)
  }

  const dateSortFunction = (sortingOptions: ColumnSortEvent) => {
    const { data, order } = sortingOptions

    return data.sort((user1: User, user2: User) => {
      const dateA = parse(user1.birthday, 'dd.MM.yyyy', new Date())
      const dateB = parse(user2.birthday, 'dd.MM.yyyy', new Date())
      return (order as number) * (dateA.getTime() - dateB.getTime())
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['users-list-header']}>
        <h1>Список пользователей</h1>
        {usersList && (
          <Link to="./create">
            <Button
              title="Создать пользователя"
              severity="contrast"
              icon="pi pi-user-plus"
              iconPos="right"
              size={isMediumScreen ? 'small' : undefined}
            />
          </Link>
        )}
      </div>
      {usersList && (
        <div className={styles['users-list-table']}>
          <DataTable
            value={filteredUsers ?? usersList}
            filterDisplay="row"
            emptyMessage="Список пользователей пуст"
            stripedRows
            scrollable
            scrollHeight="85vh"
            size={isMediumScreen ? 'small' : 'normal'}
            selectionMode="single"
            onRowSelect={(e) => navigate(`./${e.data.id}/edit`)}
          >
            <Column field="name" header="Имя" sortable></Column>
            <Column
              field="role"
              header="Должность"
              filter
              filterElement={roleRowFilter}
              showFilterMenu={false}
              showClearButton={false}
            ></Column>
            <Column field="phone" header="Телефон"></Column>
            <Column
              field="birthday"
              header="Дата рождения"
              dataType="date"
              body={dateBodyTemplate}
              hidden={isMediumScreen}
              sortFunction={dateSortFunction}
              sortable
            ></Column>
            <Column
              field="isArchive"
              header="Статус"
              dataType="boolean"
              body={isArchiveUser}
              showFilterMenu={false}
              showClearButton={false}
              filter
              filterMatchMode="equals"
              filterElement={isArchiveRowFilter}
              hidden={isMediumScreen}
            ></Column>
          </DataTable>
        </div>
      )}
    </div>
  )
}

export default UsersListPage
