import {createContext} from 'react'

function noop() {}

export const LoginContext = createContext({
  token: null,
  userId: null,
  status: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})