import {useState, useContext} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {LoginContext} from '../../../context/LoginContext'
import cl from './UserControlItem.module.sass'

const UserControlItem = ({user}) => {

	const [active, setActive] = useState(false)
	const [tokens, setTokens] = useState(user.tokens)
	const [titleNickname, setTitleNickname] = useState(user.nickname)
	const [nickname, setNickname] = useState(user.nickname)
	const [status, setStatus] = useState(user.user_status)
	const [activeSelect, setActiveSelect] = useState(false)

	const auth = useContext(LoginContext)

	const {request} = useHttp()

	const setUIStatus = (UIstatus) => {
		setStatus(UIstatus)

		setActiveSelect(false)
	}

	const updateUser = async () => {

		setTitleNickname(nickname)

		try {
			const response = await request('/api/auth/update-user', 'POST', {
				userId: user._id,
				tokens,
				nickname,
				status

			},
			{
				Authorization: `Bearer ${auth.token}`
			})

			window.M.toast({ html: response })
		} catch(e) {
			console.log(e)
		}
	}

	return (
		<div>
			<div className={cl.UserControlItem}>
				<div className={cl.Icon}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
						<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
					</svg>
				</div>
				<div className={cl.Content}>
					{titleNickname}
					<button className={`${cl.CaretBtn} ${active && cl.active}`} onClick={() => setActive(active ? false : true)}>
						<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 16 16">
						  <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
						</svg>
					</button>
				</div>
			</div>
			<div className={`${cl.ContentDetails} ${active && cl.active}`}>
				<div className={cl.TokensInner}>
					<button onClick={() => setTokens(tokens - 1)} className={`${cl.TokenControlItem} waves-effect waves-light`} style={{borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}}>
						-
					</button>
					<span className={cl.TokensInput}>DQP: {tokens}</span>
					<button onClick={() => setTokens(tokens + 1)} className={`${cl.TokenControlItem} waves-effect waves-light`} style={{borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}}>
						+
					</button>
				</div>
				<div className={cl.NicknameInner}>
					<input className={cl.NicknameInput} defaultValue={nickname} onChange={e => setNickname(e.target.value)}/>
				</div>
				<div className={cl.StatusInner}>
					<button onClick={() => setActiveSelect( activeSelect ? false : true)} className={cl.SelectHeader}>
						<div className={cl.Content}>
							Статус пользователя: {status}
						</div>
						<div className={`${cl.Caret} ${activeSelect && cl.active}`}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
							  <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
							</svg>
						</div>
					</button>
					<div className={`${cl.SelectBody} ${activeSelect && cl.active}`}>
						<button className={cl.StatusBtn} onClick={() => setUIStatus('participant')}>participant</button>
						<button className={cl.StatusBtn} onClick={() => setUIStatus('employee')}>employee</button>
						<button className={cl.StatusBtn} onClick={() => setUIStatus('admin')}>admin</button>
					</div>
				</div>
				<div className={cl.SaveInner}> 
					<button onClick={() => updateUser()} className={`${cl.SaveBtn} waves-effect waves-light`}>
						Сохранить изменения
					</button>
				</div>
			</div>
		</div>
	)
}

export default UserControlItem