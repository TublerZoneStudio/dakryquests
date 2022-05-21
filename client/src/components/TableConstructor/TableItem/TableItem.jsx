import { useState, useEffect, useContext, useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
import TableBtn from './TableBtn/TableBtn'
import {useHttp} from '../../../hooks/http.hook'
import Loader from './TableLoader/Loader'
import {LoginContext} from '../../../context/LoginContext'
import LikeBtn from '../../UI/LikeBtn/LikeBtn'
import cl from './TableItem.module.sass'

const TableItem = ({table}) => {
	const navigate = useNavigate()

	const auth = useContext(LoginContext)

	const [likes, setLikes] = useState([])

	const [likedStatus, setLikedStatus] = useState(table.likes.includes(auth.userId))

	const {request} = useHttp()

	const [owner, setOwner] = useState()

	const fetchOwner = useCallback( async () => {
		try{
			const owner = await request(`/api/auth/get-user-by-id`, 'POST', {id: table.ownerId})

			setOwner(owner)
		} catch(e) {
			console.log(e)
		}
	}, [request, table.ownerId, setOwner])

	const setLikeStatus = async () => {
		if(likedStatus) { 
			setLikedStatus(false)
			setLikes(likes.filter(like => like !== auth.userId))
		} else {
			setLikedStatus(true)
			setLikes([...likes, auth.userId])
		}

		try {
			await request(`/api/table/set-like-status`, 'POST', {
				likerId: auth.userId,
				tableId: table._id
			})
		} catch(e) {
			console.log(e)
		}
	}

	useEffect(() => {
		fetchOwner()
		setLikes(table.likes)
	}, [table, fetchOwner])

	return (
		<div className={cl.TableItem}>
			<div className={cl.TableItem__header}>
				<div className={cl.TableItem__title}>
					{table.title}
				</div>
				<div className={cl.TableItem__btns}>
					{
						table.ownerId === auth.userId
							?
							<div>
								<TableBtn >
									<svg onClick={() => navigate(`/tables/${table._id}`)} style={{position:"relative", top:"1px", right: "2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
									  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
									  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
									</svg>
								</TableBtn>
								<TableBtn onClick={() => navigate(`/update/${table._id}`)}>
									<svg style={{position:"relative", top:"1px", right: "2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
										<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
									</svg>
								</TableBtn>
								<TableBtn onClick={() => navigate(`/delete/${table._id}`)}>
									<svg style={{position:"relative", top:"1px", right: "2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
										<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
									</svg>
								</TableBtn>
							</div>
							:
							<div>
								<TableBtn>
									<svg onClick={() => navigate(`/tables/${table._id}`)} style={{position:"relative", top:"1px", right: "2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
									  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
									  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
									</svg>
								</TableBtn>
							</div>
					}
				</div>
			</div>
			<div className={cl.TableItem__body}>
				<div className={cl.TableItem__details}>
					<strong>Описание:</strong> {table.description}
					<br/>
					<strong>Дата создания:</strong> {table.date}
				</div>
			
				<div className={cl.TableItem__footer}>
					{
						!owner 
							? <Loader/>
							:
							<>
								{owner.nickname}
								<div style={{display: "flex", alignItems: "center"}}>
									<span style={{marginRight: "5px", fontSize: '20px'}}>{likes.length}</span>
									<LikeBtn setLikeStatus={setLikeStatus} liked={likedStatus}/>
								</div>
							</>

					}
				</div>
			</div>
		</div>
	)
}

export default TableItem