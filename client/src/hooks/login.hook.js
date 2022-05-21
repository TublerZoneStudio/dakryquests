import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useLogin = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userStatus, setUserStatus] = useState(null)

  const login = useCallback((jwtToken, id, user_status) => {
    setToken(jwtToken)
    setUserId(id)
    setUserStatus(user_status)
    
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, userStatus: user_status
    }))
  }, [])


  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUserStatus(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId, data.userStatus)
    }

    setReady(true)
  }, [login])


  return { login, logout, token, userId, userStatus, ready }
}