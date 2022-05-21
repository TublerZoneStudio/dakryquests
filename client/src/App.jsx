import { BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from './routes'
import {useLogin} from './hooks/login.hook'
import {LoginContext} from './context/LoginContext'
import { TableProvider } from './context/TableProvider'
import {Navbar} from './components/Navbar/Navbar'
import Loader from './components/UI/Loader/Loader'

function App() {
	
	const {token, login, logout, userId, userStatus, ready} = useLogin()
	
	const isAuth = !!token
	
	const routes = useRoutes(isAuth, userStatus)
	
	if(!ready){
		return <Loader/>
	}

	return (
		<LoginContext.Provider value={{
			token, login, logout, userId, userStatus
		}}>
			<Router>
				<TableProvider>
					{
						isAuth ?
							<>
								<Navbar isAuth={isAuth} />
								<div className="App">{routes}</div>
							</>
							:
							routes
					}
				</TableProvider>
			</Router>
		</LoginContext.Provider>
	)
}

export default App
