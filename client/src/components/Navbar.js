import {NavLink, useNavigate} from 'react-router-dom'
import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import {Loader} from '../components/Loader'
import {TablesList} from '../components/TablesList'
import {Nickname} from '../components/Nickname'
import $ from 'jquery'

export const Navbar = ({ }) => {
	
	const [nickname, setNickname] = useState([])
	
	const navigate = useNavigate()
	
	const {loading, request} = useHttp()
	
	const auth = useContext(LoginContext)
	
	const {token} = useContext(LoginContext)

	const logoutHandler = event => {
		event.preventDefault()
		auth.logout()
		navigate('/')
	}
	
	const fetchNickname = useCallback( async () => {
		try{
			const fetched = await request('/api/auth/getnickname', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			
			setNickname(fetched)
		} catch(e) {
			console.log(e)
		}
	}, [token, request])
	
	useEffect( () => {
		fetchNickname()
	}, [fetchNickname])

  return (
    <nav>
      <div className="nav-wrapper component-bg" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">{<Nickname user={nickname}/>}</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать</NavLink></li>
          <li><NavLink to="/tables">Таблицы</NavLink></li>
		  <li><NavLink to="/tokencreate">Токены</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}