import { useState, useEffect, useCallback, useContext } from 'react'
import cl from './AnswerItem.module.sass'
import { useTable } from '../../../../../context/TableProvider'
import RoundBtn from '../../../../UI/RoundBtn/RoundBtn'
import TableLoader from '../../../TableItem/TableLoader/Loader'
import { LoginContext } from '../../../../../context/LoginContext'

const AnswerItem = ({comment, answer}) => {

	const { tableMethods, getUser } = useTable()

	const [owner, setOwner] = useState(null)

	const { userId } = useContext(LoginContext)

	const getOwner = useCallback( async () => {
		let owner = await getUser(answer.owner)

		setOwner(owner)
	}, [getUser, answer.owner, setOwner])

	const removeAnswer = async () => {
		await tableMethods.removeAnswer(comment.id, answer.id)
	}

	useEffect(() => {
		getOwner()
	}, [getOwner])

	if(!owner) {
		return <TableLoader/>
	} 

	return (
		<div className={cl.AnswerContainer}>
			<div className={cl.Answer}>
				<div className={cl.Header}>
					<strong>{owner.nickname}</strong> <div> {answer.date} </div>
				</div>
				<div className={cl.Body}>
					{answer.comment} 
				</div>
				{
					answer.owner === userId &&
					<div className={cl.CloseInner}>
						<RoundBtn onClick={() => removeAnswer()}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
							</svg>
						</RoundBtn>
					</div>
				}
			</div>
		</div>
	)
}

export default AnswerItem