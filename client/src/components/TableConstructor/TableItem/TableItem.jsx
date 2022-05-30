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
		<div className={`${cl.TableItem} waves-effect waves-light`}>
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
									<svg onClick={() => navigate(`/tables/${table._id}`)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
									  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
									</svg>
								</TableBtn>
								<TableBtn onClick={() => navigate(`/update/${table._id}`)}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
										<path d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"/>
  										<path d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"/>
									</svg>
								</TableBtn>
								<TableBtn onClick={() => navigate(`/delete/${table._id}`)}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
										<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
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
					<div>
						<strong>Описание:</strong> 
						<span> {table.description} </span>
					</div>
					<div>
						<strong>Дата создания:</strong> 
						<span> {table.date} </span>
					</div>
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