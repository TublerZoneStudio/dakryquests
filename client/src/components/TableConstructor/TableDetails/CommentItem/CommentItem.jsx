import { useState, useEffect, useContext, useCallback } from 'react'
import cl from './CommentItem.module.sass'
import { useTable } from '../../../../context/TableProvider'
import { useHttp } from '../../../../hooks/http.hook'
import LikeBtn from '../../../UI/LikeBtn/LikeBtn'
import RoundBtn from '../../../UI/RoundBtn/RoundBtn'
import AnswerItem from './AnswerItem/AnswerItem'
import { LoginContext } from '../../../../context/LoginContext'
import TableLoader from '../../TableItem/TableLoader/Loader'

const CommentItem = ({comment}) => {

	const { userId } = useContext(LoginContext)

	const [owner, setOwner] = useState(null)
	const [reply, setReply] = useState('')
	const [liked, setLiked] = useState(comment.likes.includes(userId))

	const { tableMethods, getUser } = useTable()

	const { loading } = useHttp() 

	const getOwner = useCallback( async () => {
		const response = await getUser(comment.owner)
		setOwner(response)
	}, [getUser, setOwner, comment.owner]) 

	const addReply = async () => {
		await tableMethods.addAnswerToComment(comment.id, reply)
		setReply('')
	}

	const addLikeToComment = async () => {
		setLiked(liked ? false : true)
		const status = liked ? false : true
		await tableMethods.addLikeToComment(comment.id, status)
	}

	useEffect(() => {
		getOwner()
	}, [getOwner])

	if(loading || !owner) {
		return <TableLoader/>
	}

	return (
		<div className={cl.CommentContainer}>
			<div className={cl.Comment}> 
				<div className={cl.Header}>
					<strong> { owner.nickname } </strong> <div> {comment.date} </div>
				</div>
				<div className={cl.Body}>
					{ comment.comment }
				</div>
				<div className={cl.Footer}>
					<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

						{
							comment.owner === userId &&
							<RoundBtn onClick={() => tableMethods.removeComment(comment.id)}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
								</svg>
							</RoundBtn>
						}

						<LikeBtn liked={liked} setLikeStatus={addLikeToComment}/>
					</div>
					<div className={cl.ReplyForm}>
						<input className={cl.ReplyInput} type="text" placeholder="Ответить" value={reply} onChange={e => setReply(e.target.value)}/>
						<button className={`${cl.ReplyBtn} waves-effect waves-light`} onClick={() => addReply()}>
							Ответить
						</button>
					</div>
				</div>
			</div>
			{
				comment.answers.map((answer) => {

					return (
						<AnswerItem key={answer.id} answer={answer} comment={comment}/>
					)
				})
			} 
		</div>
	)
}

export default CommentItem