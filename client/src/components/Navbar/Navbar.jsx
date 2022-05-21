import { useState, useEffect, useContext, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { LoginContext } from '../../context/LoginContext'
import Nickname from './Nickname'
import $ from 'jquery'

export const Navbar = ({isAuth}) => {
	
	const [user, setUser] = useState([])
	
	const navigate = useNavigate()
	
	const {request} = useHttp()
	
	const auth = useContext(LoginContext)
	
	const {token} = useContext(LoginContext)

	const logoutHandler = event => {
		event.preventDefault()
		auth.logout()
		navigate('/')
	}
	
	const fetchUser = useCallback( async () => {
		try{
			const response = await request('/api/auth/get-user-by-params', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			
			setUser(response)
		} catch(e) {
			console.log(e)
		}
	}, [token, request])
	
	useEffect( () => {
		fetchUser()
	}, [fetchUser])
	
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
			<h5 className="nickname-h">{ isAuth ? <Nickname user={user}/> : "enyter"}</h5>
			<div className="opac"></div>
			<ul className="nav-inner">
				<li className="nav-offcanvas-li">
					<h5 className="nickname-h">{ isAuth ? <Nickname user={user}/> : "enter"}{ user.user_status !== 'admin' && <> <br/> DQP: user.tokens </>} </h5>
					<span className="ex">
						<svg style={{ marginTop: "22px" }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="nav-svg" viewBox="0 0 16 16">
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
						</svg>
					</span>
				</li>
				{
					user.user_status === 'admin' 
						&&
						<>
							<li>
								<NavLink to="/create">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
										<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
										<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
									</svg>
									<span>
										Создать таблицу
									</span>
								</NavLink>
							</li>
							<li>
								<NavLink to="/tables">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
										<path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
									</svg>
									<span>
										Ваши таблицы
									</span>
								</NavLink>
							</li>
							<li>
								<NavLink to="/tokencreate">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
										<path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"/>
									</svg>
									<span>
										Ваши токены
									</span>
								</NavLink>
							</li>
							<li>
								<NavLink to="/user-control">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
									</svg>
									<span>
										Пользователи
									</span>
								</NavLink>
							</li>
						</>

				}

				<li>
					<NavLink to="/public-tables">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
						  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
						</svg>
						<span>
							Таблицы
						</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/billboard">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
							<path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z"></path><path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z"></path>
						</svg>
						<span>
							Доска объявлений
						</span>
					</NavLink>
				</li>
				<li>
					<a href="/" onClick={logoutHandler}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
						  <path d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
						  <path d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
						</svg>
						<span>
							Выйти из аккаунта
						</span>
					</a>
				</li>
			</ul>
			<span className="open-btn">
				<svg style={{ marginTop: "28px" }}className="nav-svg hamb-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 16 16">
					<path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
				</svg>
			</span>
		</nav>
	)
}