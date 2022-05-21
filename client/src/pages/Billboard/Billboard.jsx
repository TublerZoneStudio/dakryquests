import { useState, useEffect, useContext, useCallback } from 'react'
import {useHttp} from '../../hooks/http.hook'
import {LoginContext} from '../../context/LoginContext'
import cl from './Billboard.module.sass'
import BillboardPanel from './panel/BillboardPanel'
import BillboardMessages from '../../components/Billboard/BillboardMessages'
import PageTitle from '../../components/UI/PageTitle/PageTitle'
import mailbox from '../../images/mailbox.png'

const Billboard = () => {

	const [messages, setMessages] = useState([])

	const [currentUser, setCurrentUser] = useState()

	const auth = useContext(LoginContext)

	const {request} = useHttp()

	const getCurrentUser = useCallback( async () => {
		try{
			const response = await request('/api/auth/get-user-by-id', 'POST', {id: auth.userId}, {
				Authorization: `Bearer ${auth.token}`
			})
			
			setCurrentUser(response)
		} catch(e) {
			console.log(e)
		}
	}, [request, auth.userId, auth.token, setCurrentUser])

	const createBillboardMessage = async (title, description) => {
		try {
			const response = await request('/api/billboard/generate', 'POST', {
				title,
				description,
				ownerId: auth.userId
			},
			{
				Authorization: `Bearer ${auth.token}`
			})

			setMessages([...messages, response])
		} catch(e) {
			console.log(e)
		}
	}

	const deleteBillboardMessage = async (messageId) => {
		setMessages(messages.filter(message => message._id !== messageId))
		try {
			await request(`/api/billboard/delete`, 'POST', {messageId} , {
				Authorization: `Bearer ${auth.token}`
			})
		} catch(e) {
			console.log(e)
		}
	}

	const getBillboardMesages = useCallback( async () => {
		try {
			const response = await request('/api/billboard/messages', 'GET', null, {
				Authorization: `Bearer ${auth.token}`
			})

			setMessages(response)
		} catch(e) {
			console.log(e)
		}
	}, [request, auth.token, setMessages])

	useEffect(() => {
		getCurrentUser()
		getBillboardMesages()
	}, [getCurrentUser, getBillboardMesages])

	return (
		<>
			{
				messages.length &&
				<PageTitle>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
					  <path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z"/>
					  <path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z"/>
					</svg> 
				</PageTitle>
			}
			<div className={cl.BillboardContainer}>
				{
					messages.length 
						?
						<BillboardMessages messages={messages} deleteFunc={deleteBillboardMessage}/>
						:
						<div style={{
							height: "110%",
						 	display: "grid",
						 	alignItems: "center",
						 	justifyContent: "center"
							}}
						>
							<div style={{
								textAlign: "center",
								color: "#fff"
								}}
							>
								<img src={mailbox} alt=""/>
								<p>
									Не найдено не одно сообщение...
								</p>
							</div>
						</div>	
				}
				{currentUser && currentUser.user_status === "admin" && <BillboardPanel createBillboardMessage={createBillboardMessage}/>}
			</div>
		</>
	)
}

export default Billboard