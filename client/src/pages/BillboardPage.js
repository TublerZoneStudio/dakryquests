import React, {useContext, useState, useEffect, useCallback} from 'react'
import $ from 'jquery'
import {Loader} from '../components/Loader'
import {MessagesList} from '../components/MessagesList'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'

export const BillboardPage = () => {
	
	const navigate = useNavigate()
	
	const [messages, setMessages] = useState([])
	
	const [nickname, setNickname] = useState([])

	const {loading, request} = useHttp() 
	
	const auth = useContext(LoginContext)
	
	const fetchNickname = useCallback( async () => {
		try{
			const fetched = await request('/api/auth/getnickname', 'GET', null, {
				Authorization: `Bearer ${auth.token}`
			})
			
			setNickname(fetched)
		} catch(e) {
			console.log(e)
		}
	}, [auth, request])
	
	const createMessage = async () => {
		
		var title =  $('#title').val()
		
		if(!title){
			return $('#title').addClass('invalid')
		}
		
		var desc = $('#desc').val()
		
		if(!desc){
			desc = undefined
		}
		
		try {
			const tok = await request(`/api/billboard/generate`, 'POST', {title: title, desc: desc, owner_nickname: nickname.nickname}, {
				Authorization: `Bearer ${auth.token}` 
			})
			
			if(tok){
				disableBtn()
				fetchMessages()
				return window.M.toast({ html: "Объявление создано." })
			} else {
				return window.M.toast({ html: "Неизвестная ошибка. Перезагрузите страницу" })
			}
		} catch (e) {
			console.log(e)
		}
	} 
	
	
	const fetchMessages = async () => {
		try {
			const messages = await request(`/api/billboard/fetch-messages`, 'GET', null, {
				Authorization: `Bearer ${auth.token}` 
			})
			
			setMessages(messages)
		} catch (e) {
			console.log(e)
		}
	} 
	useEffect(() => {
		fetchNickname()
		fetchMessages()
	}, [])
	
	
	function disableBtn() {
		var btn = $('#btn')
		btn.addClass('disabled')
	  
		setTimeout(function() {
			btn.removeClass('disabled')
		}, 50000); //чтобы было 15 мин поставь 900000 вместо 3000
	}
	
	return(
		<>
			{<MessagesList messages={messages}/>}
				{nickname.user_status !== "admin" && <div style={{ height: "50px"}}></div>}
				{nickname.user_status === "admin" && <div className="container inner">
				<div className="message-controls-inner">
					<div style={{ textAlign: "center"}}>
						<FontAwesomeIcon style={{ color: "var(--component-bg)" }} icon={ faMessage } size="2x"/>
					</div>
					<div className="input-field titles-num-inner col s12">
						<input id="title" type="text" className="validate"/>
						<label htmlFor="text">Введите заголовок сообщения</label>
					</div>
					<div className="input-field titles-num-inner col s12">
						<input id="desc" type="text" className="validate"/>
						<label htmlFor="text">Введите сообщение</label>
					</div>
				<button id="btn" style={{ background: "var(--component-bg)"}} className="btn waves-effect waves-light" onClick={createMessage}>Создать сообщение</button>
				</div>
			</div>}
		</>
	)	
} 