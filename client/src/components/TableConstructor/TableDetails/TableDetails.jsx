import { useState, useEffect, useContext, useCallback } from 'react'
import cl from './TableDetails.module.sass'
import { useTable } from '../../../context/TableProvider'
import { useHttp } from '../../../hooks/http.hook'
import { LoginContext } from '../../../context/LoginContext'
import LikeBtn from '../../UI/LikeBtn/LikeBtn'
import Loader from '../../UI/Loader/Loader'
import RoundBtn from '../../UI/RoundBtn/RoundBtn'
import CommentItem from './CommentItem/CommentItem'

const TableDetails = () => {

	const { userId } = useContext(LoginContext)

	const { tableData, tableMethods, owner, comments } = useTable()

	const [tableComments, setTableComments] = useState()

	const [commentsOpened, setCommentsOpened] = useState(false)

	const [likes, setLikes] = useState(tableData.likes)

	const [liked, setLiked] = useState(false)

	const [comment, setComment] = useState('')

	const { loading } = useHttp()

	const addLike = async () => {
		setLiked(liked ? false : true)
		setLikes(liked ? likes.filter(like => like !== userId) : [...likes, userId])
		await tableMethods.addLikeToTable()
	}

	const configTableLikes = useCallback( () => {
		setLikes(tableData.likes)
		if(tableData.likes) {
			setLiked(tableData.likes.includes(userId))
		}
	}, [tableData.likes, userId])

	useEffect(() => {
		configTableLikes()
	}, [configTableLikes])

	useEffect(() => {
		setTableComments(comments)
	}, [comments])

	if(!owner || !tableComments || loading) {
		return <Loader/>
	}

	return (
		<div className={cl.TableDetails}>
			<div className={cl.Header}>	
				<strong> {owner.nickname} </strong>
				<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
					<span style={{marginRight: "5px"}}>
						{likes && likes.length}
					</span>
					<LikeBtn liked={liked} setLikeStatus={addLike}/>
				</div>
			</div>
			<div className={cl.Body}>
				<span> {tableData.title} </span>
				<span> {tableData.description} </span>
			</div>
			<div className={cl.OpenBtnInner}>
				<RoundBtn onClick={() => commentsOpened ? setCommentsOpened(false) : setCommentsOpened(true)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
						<path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
						<path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
					</svg>
				</RoundBtn>
			</div>
			<div className={`${cl.CommentsInner} ${commentsOpened ? cl.Active : ''}`}>
				<div className={cl.CommentForm}>
					<input placeholder="Введите комментарий" type="text" onChange={e => setComment(e.target.value)}/>
					<RoundBtn onClick={() => tableMethods.addComment(comment)}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
							<path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
							<path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
						</svg>
					</RoundBtn>
				</div>
				{
					tableComments.length
						?
						comments.map((comment) => {
							return (
								<CommentItem key={comment.id} comment={comment}/>
							)
						})
						:
						''
				}
			</div>
		</div>
	)
}

export default TableDetails 