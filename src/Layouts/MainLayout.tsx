import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './MainLayout.module.scss'

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') navigate('/users-list', { replace: true })
  }, [navigate, location])

  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  )
}

export default MainLayout
