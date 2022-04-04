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
	
	$(document).ready(function(){
		$(".open-btn").click(function () {
			$(".nav-inner").addClass("showNav")
			$(".opac").addClass("opac-active")
		})
		
		$(".ex").click(function () {
			$(".nav-inner").removeClass("showNav")
			$(".opac").removeClass("opac-active")
		})
		$(".opac").click(function () {
			$(".nav-inner").removeClass("showNav")
			$(".opac").removeClass("opac-active")
		})
	})

	
	return(
		<nav>
			<h5 className="nickname-h">{<Nickname user={nickname}/>}</h5>
			<div className="opac"></div>
			<ul className="nav-inner">
				<li className="nav-offcanvas-li">
					{<h5 className="nickname-h">{<Nickname user={nickname}/>}</h5>}
					<span className="ex">
						<svg style={{ marginTop: "22px" }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="nav-svg" viewBox="0 0 16 16">
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
						</svg>
					</span>
				</li>
				{nickname.user_status == "admin" && <li><NavLink to="/create">Создать</NavLink></li>}
				{nickname.user_status == "admin" &&<li><NavLink to="/tables">Мои таблицы</NavLink></li>}
				<li><NavLink to="/public-tables">Все таблицы</NavLink></li>
				{nickname.user_status == "admin" && <li><NavLink to="/tokencreate">Токены</NavLink></li>}
				{nickname.user_status == "admin" && <li><NavLink to="/userlist">Контроль над пользователями</NavLink></li>}
				<li><NavLink to="/billboard">Доска объявлений</NavLink></li>
				<li><a href="/" onClick={logoutHandler}>Выйти</a></li>
			</ul>
			<span className="open-btn">
				<svg style={{ marginTop: "28px" }}className="nav-svg hamb-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 16 16">
					<path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
				</svg>
			</span>
		</nav>
	)
}