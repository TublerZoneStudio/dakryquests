import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import {Loader} from '../components/Loader'
import {UserList} from '../components/UserList'
import $ from 'jquery'

export const UserListPage = () => {
	
	const navigate = useNavigate()
	
	const [users, setUsers] = useState([])
	
	const {loading, request} = useHttp()
	
	const {token} = useContext(LoginContext) 
	
	
	const fetchUsers = useCallback( async () => {
		try{
			const fetchedUsers = await request('/api/auth/get-participants', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			
			return setUsers(fetchedUsers)
		} catch(e) {
			console.log(e)
		}
	}, [token, request])
	
	
	useEffect( () => {
		fetchUsers()
	}, [])
	
	if(loading) {
		return <Loader />
	}
	
	return(
		<>
			<UserList users={users}/>
		</>
	)
}