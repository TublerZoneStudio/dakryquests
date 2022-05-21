import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import {TablesPage} from './pages/TablesPage'
import Constructor from './pages/Constructor/Constructor'
import {LogInPage} from './pages/LogInPage'
import {SignInPage} from './pages/SignInPage'
import UpdatePage from './pages/UpdatePage'
import {CreateTokenPage} from './pages/CreateTokenPage'
import {PublicTables} from './pages/PublicTables'
import {DeletePage} from './pages/DeletePage'
import Billboard from './pages/Billboard/Billboard'
import UserControl from './pages/UserControl/UserControl'
import TableView from './pages/TableView'
import UndefinedRoutePage from './pages/UndefinedRoutePage/UndefinedRoutePage'

export const useRoutes = (isA, userStatus) => {
  if (isA) {
  	if(userStatus === 'admin') {
  		return (
	      <Routes>
	        <Route path="/tables" element={<TablesPage />}/>
	        <Route path="/create" element={<Constructor />}/>
	        <Route path="/tables/:id" element={<TableView/>}/>
					<Route path="/update/:id" element={<UpdatePage />}/>
					<Route path="/delete/:id" element={<DeletePage />}/>
					<Route path="/tokencreate" element={<CreateTokenPage />}/>
					<Route path="/billboard" element={<Billboard />}/>
					<Route path="/public-tables" element={<PublicTables/>}/>
					<Route path="/user-control" element={<UserControl/>}/>
					<Route path="/log-in" element={<Navigate to="/tables"/>}/>
					<Route path="/sign-in" element={<Navigate to="/tables"/>}/>
					<Route
		        path="*"
		        element={<UndefinedRoutePage/>}
		    	/>
	      </Routes>  
  		)
  	}

    return (
      <Routes>
				<Route path="/billboard" element={<Billboard />}/>
				<Route path="/public-tables" element={<PublicTables/>}/>
				<Route path="/tables/:id" element={<TableView/>}/>
				<Route path="/log-in" element={<Navigate to="/public-tables"/>}/>
				<Route path="/sign-in" element={<Navigate to="/public-tables"/>}/>
				<Route
		        path="*"
		        element={<UndefinedRoutePage/>}
		    />
      </Routes>     
		)
	}	

  return (
    <Routes>
		  <Route path="/sign-in" element={<SignInPage/>} exact/>
		  <Route path="/log-in" element={<LogInPage/>} exact/>
		  <Route
        path="*"
        element={<Navigate to="/log-in" replace />}
    	/>
    </Routes>
  )
}