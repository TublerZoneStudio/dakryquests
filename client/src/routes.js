import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {TablesPage} from './pages/TablesPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {LogInPage} from './pages/LogInPage'
import {SignInPage} from './pages/SignInPage'
import {UpdatePage} from './pages/UpdatePage'
import {CreateTokenPage} from './pages/CreateTokenPage'
import {DeletePage} from './pages/DeletePage'

export const useRoutes = isA => {
  if (isA) {
    return (
      <Routes>
        <Route path="/tables" element={<TablesPage />} exact/>
        <Route path="/create" element={<CreatePage />} exact/>
        <Route path="/detail/:id" element={<DetailPage />}/>
		<Route path="/update/:id" element={<UpdatePage />}/>
		<Route path="/delete/:id" element={<DeletePage />}/>
		<Route path="/tokencreate" element={<CreateTokenPage />}/>
		<Route path='/' element={<Navigate to="/create" />}/>
      </Routes>     
	)
  }

  return (
    <Routes>
	  <Route path="/sign-in" element={<SignInPage/>} exact/>
	  <Route path="/" element={<LogInPage/>} exact/>
	  <Route element={<Navigate to="/"/>}/>
    </Routes>
  )
}