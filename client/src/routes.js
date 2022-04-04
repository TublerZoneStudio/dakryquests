import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {TablesPage} from './pages/TablesPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {LogInPage} from './pages/LogInPage'
import {SignInPage} from './pages/SignInPage'
import {UpdatePage} from './pages/UpdatePage'
import {CreateTokenPage} from './pages/CreateTokenPage'
import {PublicTables} from './pages/PublicTables'
import {DeletePage} from './pages/DeletePage'
import {BillboardPage} from './pages/BillboardPage'
import {RedactTokenPage} from './pages/RedactTokenPage'
import {NotEnoughRightsPage} from './pages/NotEnoughRightsPage'
import {UserListPage} from './pages/UserListPage'

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
		<Route path="/tokenredact/:id" element={<RedactTokenPage />}/>
		<Route path="/billboard" element={<BillboardPage />}/>
		<Route path="/public-tables" element={<PublicTables/>}/>
		<Route path="/undefined-page" element={<NotEnoughRightsPage/>}/>
		<Route path="/userlist" element={<UserListPage/>}/>
		<Route path='/' element={<Navigate to="/public-tables" />}/>
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