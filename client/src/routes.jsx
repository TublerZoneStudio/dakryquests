import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import {TablesPage} from './pages/TablesPage'
import Constructor from './pages/Constructor/Constructor'
import LogInPage from './pages/Auth/LogIn/LogInPage'
import SignInPage from './pages/Auth/SignIn/SignInPage'
import UpdatePage from './pages/UpdatePage'
import {CreateTokenPage} from './pages/CreateTokenPage'
import {PublicTables} from './pages/PublicTables'
import {DeletePage} from './pages/DeletePage'
import Billboard from './pages/Billboard/Billboard'
import UserControl from './pages/UserControl/UserControl'
import TableView from './pages/TableView'
import UndefinedRoutePage from './pages/UndefinedRoutePage/UndefinedRoutePage'
import QuestCreatePage from './pages/Quest/QuestCreate/QuestCreatePage'
import QuestList from './pages/Quest/QuestList/QuestList'
import DeleteQuest from './pages/Quest/DeleteQuest/DeleteQuest'
import UpdateQuest from './pages/Quest/UpdateQuest/UpdateQuest'
import QuestDetailsPage from './pages/Quest/QuestDetails/QuestDetailsPage'
import OrderPage from './pages/Order/OrderPage'
import OrderList from './pages/Order/OrderList/OrderList'

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
					<Route path="/quests/create" element={<QuestCreatePage/>}/>
					<Route path="/quests/delete/:id" element={<DeleteQuest/>}/>
					<Route path="/quests" element={<QuestList/>}/>
					<Route path="/quests/update/:id" element={<UpdateQuest/>}/>
					<Route path="/quests/:id" element={<QuestDetailsPage/>}/>
					<Route path="/quests/:id/order" element={<OrderPage/>}/>
					<Route path="/orders/:id" element={<OrderList/>}/>
					<Route
		        path="*"
		        element={<UndefinedRoutePage/>}
		    	/>
	      </Routes>  
  		)
  	}

  	const routes = [
				{ path: "/billboard", element: <Billboard  />, id: 1 },
				{ path: "/public-tables", element: <PublicTables />, id: 2},
				{ path: "/tables/:id", element: <TableView />, id: 3},
				{ path: "/log-in", element: <Navigate to="/public-tables" />, id: 4},
				{ path: "/sign-in", element: <Navigate to="/public-tables" />, id: 5},
				{ path: "/quests", element: <QuestList />, id: 6},
				{ path: "/quests", element: <QuestList />, id: 7},
				{ path: "/quests/:id", element: <QuestDetailsPage />, id: 8},
				{ path: "/quests/:id/order", element: <OrderPage />, id: 9},
				{ path: "/orders/:id", element: <OrderList />, id: 10}
		]

    return (
      <Routes>
      	{
      		routes.map((route) => 
      			<Route path={route.path} element={route.element} key={route.id}/>
      		)
      	}
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