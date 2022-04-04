import React, {useState, useEffect, useContext, useCallback} from 'react'
import { BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from './routes'
import {useHttp} from './hooks/http.hook'
import {useLogin} from './hooks/login.hook'
import {LoginContext} from './context/LoginContext'
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
import {Preloader} from './components/Preloader'
import 'materialize-css'

function App() {
	
	const isPreloaded = false
	
	const {token, login, logout, userId, ready} = useLogin()
	
	const isAuth = !!token
	
	const routes = useRoutes(isAuth)
	
	if(!ready){
		return <Loader/>
	}
	return (
		<LoginContext.Provider value={{
			token, login, logout, userId
		}}>
			<Router>
				{ isAuth && <Navbar isAuth={isAuth} />}
				{ !isPreloaded && <Preloader/> }
				{routes}
			</Router>
		</LoginContext.Provider>
	)
}

export default App
