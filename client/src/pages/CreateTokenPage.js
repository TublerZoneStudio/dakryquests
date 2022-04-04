import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import {Loader} from '../components/Loader'
import {TokensList} from '../components/TokensList'
import $ from 'jquery'
const randomize = require('randomatic')

export const CreateTokenPage = () => {
	
	const navigate = useNavigate()
	
	const [tokens, setTokens] = useState([])
	
	const {loading, request} = useHttp()
	
	const {token, userId} = useContext(LoginContext)
	
	const auth = useContext(LoginContext)
	
	const checkStatus = useCallback( async () => {
		try{
			const fetched = await request('/api/auth/getnickname', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			
			if(fetched.user_status !== 'admin'){
				return navigate('/undefined-page')
			}
			
			return fetchTokens()
		} catch(e) {
			console.log(e)
		}
	}, [token, request])
	
	useEffect( () => {
		checkStatus()
	}, [])
	
	const fetchTokens = useCallback( async () => {
		try{
			const fetched = await request('/api/token/', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			setTokens(fetched)
		} catch(e) {
			auth.logout()
			navigate('/')
			window.M.toast({ html: "Срок вашего нахождения на платформе истек. Авторизуйтесь снова" }) 
		}
	}, [token, request])
	
	const generateToken = () => {
		const token = randomize('AAAA0', 10)
		$('.collection').append(`<li class="collection-item"><div>${token}<a href="#!" class="secondary-content"></a></div></li>`)
		return token
	}
	
	if(loading){
		return <Loader/>
	}
	
	const addToken = async () => {

		const auth_token = generateToken()
		try {
			const req_token = await request('/api/token/generate', 'POST', {token: auth_token}, { 
			  Authorization: `Bearer ${token}`
			})
			
			return fetchTokens()
			
		} catch (e) {
			console.log(e)
		}
	} 
	
	$(document).ready(function() 
	{
		$('.li-redact-btn').click(function(e) 
		{ 
			e.preventDefault()
			var this_id = $(this).attr('id')
			navigate(`/tokenredact/${this_id}`)
		})
	})
	
	return(
		<div className="register-main container">
			<ul className="collection with-header">
				<li className="collection-header"><h4>Все коды доступа: </h4></li>
				<ul className="tokens-list">
					{!loading && <TokensList tokens={tokens}/>}
				</ul>
				<li className="collection-item-btn"><button onClick={addToken} className="component-bg waves-effect waves-light">Создать токен</button></li>
			</ul>
		</div>
	)
}