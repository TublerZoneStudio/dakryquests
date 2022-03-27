import React, {useState, useCallback, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useParams} from 'react-router-dom'
import {LoginContext} from '../context/LoginContext'
import {Loader} from '../components/Loader'
import {TableCard} from '../components/TableCard'
import {UpdateTable} from '../components/UpdateTable'
import $ from 'jquery'

export const UpdatePage = () => { 
	const {token} = useContext(LoginContext)
	const {request, loading} = useHttp()
	const [table, setTable] = useState(null)
	const tableId = useParams().id
	
	const getTable = useCallback( async() => {
		try{
			const fetched = await request(`/api/table/${tableId}`, "GET", null, {
				Authorization: `Bearer ${token}`
			})
			
			setTable(fetched)
		} catch(e) {
			console.log(e)
		}
		
	}, [token, tableId, request])
	
	useEffect( () => {
		getTable()
	}, [getTable])
	
	if( loading) {
		<Loader />
	}
	
	return (
		<>
		  { !loading && table && <UpdateTable table={table} /> }
		</>
	)	
}