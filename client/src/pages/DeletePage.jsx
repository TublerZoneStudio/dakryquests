import { useState, useEffect, useContext, useCallback } from 'react'
import {useHttp} from '../hooks/http.hook'
import {useParams} from 'react-router-dom'
import {LoginContext} from '../context/LoginContext'
import Loader from '../components/UI/Loader/Loader'
import rocket from '../images/rocket.png'

export const DeletePage = () => { 

	const {token} = useContext(LoginContext)
	
	const {request, loading} = useHttp()

	const [message, setMessage] = useState()
	
	const tableId = useParams().id
	
	const deleteTable = useCallback( async () => {
		try{
			const response = await request(`/api/table/delete/${tableId}`, 'GET', null, {
				Authorization: `Bearer ${token}`
			})

			setMessage(response)
		} catch(e) {
			console.log(e)
		}
	}, [request, tableId, token])
	
	useEffect( () => {
		deleteTable()
	}, [deleteTable])
	
	if( loading) {
		return(
			<Loader />	
		)
	}
	
	return (
		<div style={{ textAlign: "center", color: "#fff" }}className="container register-main">
			<img src={rocket} alt="asad" width="220px" height="220px"/>
			<p>{message}</p>
		</div>
	)	
}