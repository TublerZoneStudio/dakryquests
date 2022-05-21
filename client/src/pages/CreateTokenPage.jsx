import { useState, useEffect, useContext, useCallback } from 'react'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import TokensList from '../components/TokensList/TokensList'
import no_results from '../images/inbox.png'
import Loader from '../components/UI/Loader/Loader'
import Btn from '../components/UI/Btn/Btn'
const randomize = require('randomatic')

export const CreateTokenPage = () => {
	
	const [tokens, setTokens] = useState([])
	
	const {loading, request} = useHttp()
	
	const {token} = useContext(LoginContext)

	const generateToken = () => {
		const token = randomize('AAAA0', 10)
		return token
	}
	
	const fetchTokens = useCallback( async () => {
		try{
			const tokens = await request('/api/token/', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			
			setTokens(tokens)
		} catch(e) {
			console.log(e)
		}
	}, [request, token])

	const deleteToken = async (tokens_, tokenId) => {
		try {
			setTokens(tokens_.filter(token => token._id !== tokenId))

			await request(`/api/token/delete/${tokenId}`, 'GET', null, {
				Authorization: `Bearer ${token}`
			})
		} catch (e) {
			console.log(e)
		}
	}
	
	const createToken = async () => {

		const generated_token = generateToken()

		try {
			const tokens = await request('/api/token/generate', 'POST', {token: generated_token}, { 
			  Authorization: `Bearer ${token}`
			})
			
			return setTokens(tokens)
			
		} catch (e) {
			console.log(e)
		}
	}

	const update = async (tokenId, value) => {
		try {
			const response = await request(`/api/token/updatetoken/${tokenId}`, 'POST', {type: value}, {
				Authorization: `Bearer ${token}`
			})

			setTokens(response)
		} catch (e) {
			console.log(e)
		}
	} 

	useEffect( () => {
		fetchTokens()
	}, [fetchTokens])

	if(loading) return <Loader/>
	
	return(
		<div className="register-main container">
			<ul className="collection with-header">
				<li className="collection-header"><h4>Все коды доступа: </h4></li>
				<ul className="tokens-list">
					{
						tokens.length 
							?
							<TokensList tokens={tokens} deleteFunc={deleteToken} update={update}/>
							:
							<div style={{ textAlign: "center", color: "#fff" }} className="tokens-noop container register-main">
								<img src={no_results} alt="" />
								<p>У вас еще нет не одного токена :(</p>
							</div>
					}
				</ul>
				<li className="collection-item-btn"><Btn onClick={createToken}>Создать токен</Btn></li>
			</ul>
		</div>
	)
}