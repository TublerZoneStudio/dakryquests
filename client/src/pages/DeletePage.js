import React, {useState, useCallback, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {useParams} from 'react-router-dom'
import {LoginContext} from '../context/LoginContext'
import {Loader} from '../components/Loader'
import rocket from '../images/rocket.png'
import $ from 'jquery'

export const DeletePage = () => { 
	const navigate = useNavigate()

	const {token} = useContext(LoginContext)
	
	const [deleted, setDeleted] = useState([])
	
	const {request, loading} = useHttp()
	
	const tableId = useParams().id
	
	const deleteTable = useCallback( async () => {
		try{
			const deleted = await request(`/api/table/delete/${tableId}`, 'GET', null, {
				Authorization: `Bearer ${token}`
			})
		} catch(e) {
			console.log(e)
		}
	}, [token, request])
	
	useEffect( () => {
		deleteTable()
	}, [deleteTable])
	
	$(document).ready(function() {
		$('.create-btn').click(function(e) {  
			navigate(`/tables`)
		});
	});
	
	if( loading) {
		return(
			<Loader />	
		)
	}
	
	return (
		<div style={{ textAlign: "center", color: "#fff" }}className="container register-main">
			<img src={rocket} alt="asad" width="220px" height="220px"/>
			<p>Таблица успешно удалена.</p>
			<button className="create-btn waves-effect waves-component .waves-ripple">Вернутся обратно</button>
		</div>
	)	
}