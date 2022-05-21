import { useState, useEffect, useContext, useCallback } from 'react'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import Loader from '../components/UI/Loader/Loader'
import TableList from '../components/TableConstructor/TableList/TableList'
import PageTitle from '../components/UI/PageTitle/PageTitle'
import no_results from '../images/no-results.png'

export const PublicTables = () => {
	
	const [tables, setTables] = useState([]) 
	
	const {loading, request} = useHttp() 
	
	const {token} = useContext(LoginContext)
		
	const fetchTables = useCallback( async () => {
		try{
			const fetched = await request('/api/table/get-all', 'GET', null, {
				Authorization: `Bearer ${token}`
			})

			return setTables(fetched)
		} catch(e) {
			console.log(e)
		}
	}, [request, token])
	
	useEffect( () => {
		fetchTables()
	}, [fetchTables])
	
	if(loading) {
		return <Loader />
	}
	
	return (
		<>
			{
				tables.length 
					?
						<>
							<PageTitle>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									<path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
								</svg>
							</PageTitle>
							<TableList tables={tables}/>
						</>
					:
					<div style={{
							height: "100vh",
						 	display: "grid",
						 	alignItems: "center",
						 	justifyContent: "center"
						}}
					>
						<div style={{
							textAlign: "center",
							color: "#fff"
						}}
						>
							<img src={no_results} alt=""/>
							<p>
								Не найдена не одна таблица...
							</p>
						</div>
					</div>	
			}
		</>
	)
}

