import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import {Loader} from '../components/Loader'
import {TablesList} from '../components/TablesList'
import $ from 'jquery'

export const TablesPage = () => {
	const navigate = useNavigate()
	
	const [tables, setTables] = useState([])
	
	const {loading, request} = useHttp()
	
	const {token} = useContext(LoginContext)
	
	const auth = useContext(LoginContext) 
		
	const fetchTables = useCallback( async () => {
		try{
			const fetched = await request('/api/table', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			setTables(fetched)
		} catch(e) {
			auth.logout()
			navigate('/')
			window.M.toast({ html: "Срок вашего нахождения на платформе истек. Авторизуйтесь снова" }) 
		}
	}, [token, request])
	
	useEffect( () => {
		fetchTables()
	}, [fetchTables])
	
	if(loading) {
		return <Loader />
	}
	
	return (
		<>
			{!loading && <TablesList tables={tables}/>}
		</>
	)
}