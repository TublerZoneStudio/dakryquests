import {PublicTablesList} from '../components/PublicTablesList'
import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import {Loader} from '../components/Loader'
import {TablesList} from '../components/TablesList'
import $ from 'jquery'

export const PublicTables = () => {
	
	const [tokens, setTokens] = useState([])
	
	const {loading, request} = useHttp()
	
	const {token} = useContext(LoginContext)
		
	const fetchTables = useCallback( async () => {
		try{
			const fetched = await request('/api/table/get-all', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			return setTokens(fetched)
		} catch(e) {
			console.log(e)
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
			<PublicTablesList tables={tokens}/>
		</> 
	)
}

