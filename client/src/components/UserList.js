import React, {useState, useCallback, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {LoginContext} from '../context/LoginContext'
import 'materialize-css'
import no_results from '../images/no-results.png'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export const UserList = ({ users }) => {
	
	const navigate = useNavigate()
	
	const {loading, request} = useHttp()
	
	const {token} = useContext(LoginContext) 
	
	const changeHandler = event => {
		event.preventDefault()
		var val = event.target.value
		var id = event.target.id
		
		updateUser(id, val)
	}
	
	const updateUser = useCallback( async (user_id, tokens_num) => {
		try{
			const user = await request('/api/auth/update-user-tokens', 'POST', {user_id: user_id, tokens_num: tokens_num} ,{
				Authorization: `Bearer ${token}`
			})
			
			
		} catch(e) {
			console.log(e)
		}
	})
	
	return(
		<>
			<div className="container bill-container">
				{ users.map((user) => {
					
					var tokens_num_class = `tok-${user._id}`
					
					return (
						<div key={user._id} className="message-inner">
							<div className="title-content">
								<div className="envelope-inner">
									<FontAwesomeIcon style={{color: "var(--fg)" }} icon={ faUser } size="2x"/>
								</div>
								<div className="message-content">
									<div className="contentblock">
										<div className="contentblock">
											<strong className="strong-f">{user.nickname}</strong>
										</div>
									</div>
									<div className="contentblock">
										<div className="contentblock">
											<span className="usercontrol-span val">
												Кол-во жетонов:<input id={user._id} type="number" className="token_num_inp browser-default" defaultValue={user.tokens} onChange={changeHandler}/>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div> 
		</>
	)
	
}