import {useState, useCallback, useContext} from 'react'
import { LoginContext } from '../context/LoginContext'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { logout } = useContext(LoginContext)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if(data.message === "Нет авторизации") {
        return logout()
      } else {

        setLoading(false)

        return data
      }
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [logout]) 

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}