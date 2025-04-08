import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <h1>404</h1>
      <p>К сожалению, страница, которую вы ищете, не существует.</p>
      <Button label="На главную" onClick={() => navigate('/')} />
    </>
  )
}

export default NotFoundPage
