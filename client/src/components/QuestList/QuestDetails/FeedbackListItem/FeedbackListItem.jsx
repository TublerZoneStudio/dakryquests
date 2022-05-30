import { useCallback, useState, useEffect } from 'react'
import { useQuest } from '../../../../context/QuestProvider'
import cl from './FeedbackListItem.module.sass'

const FeedbackListItem = ({feedback}) => {

	const { getUserById } = useQuest()

	const [owner, setOwner] = useState(null)

	const fetchUser = useCallback( async() => {
		let owner = await getUserById(feedback.owner)
		setOwner(owner)
	}, [getUserById])

	useEffect(() => {
		fetchUser()
	}, [fetchUser])

	if(!owner) return <p> here loading </p>

	return (
		<div className={cl.FeedbackListItem}>
			<div className={cl.EnvelopeInner}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
				</svg>
			</div>
			<div className={cl.Content}>
				<div className={cl.Header}>
					{owner.nickname}. {feedback.date}
				</div>
				<div className={cl.Body}>
					{feedback.feedback}
				</div>
			</div>
		</div>
	)
}

export default FeedbackListItem