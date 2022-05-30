import { useState, useContext, useEffect, useCallback } from 'react'
import cl from './QuestDetails.module.sass'
import { useNavigate } from 'react-router-dom'
import Btn from '../../UI/Btn/Btn'
import GoogleInput from '../../UI/Input/GoogleInput/GoogleInput'
import FeedbackListItem from './FeedbackListItem/FeedbackListItem'
import cactus from '../../../images/cactus.png'
import { useQuest } from '../../../context/QuestProvider'
import { useOrder } from '../../../context/OrderProvider'
import ThemesSelector from '../../UI/ThemesSelector/ThemesSelector'
import { LoginContext } from '../../../context/LoginContext'

const QuestDetails = ({quest}) => {

	const navigate = useNavigate()

	const { userId } = useContext(LoginContext)

	const { addFeedbackToQuest } = useQuest()
	const { getUserOrders } = useOrder()

	const [feedback, setFeedback] = useState('')

	const [feedbacks, setFeedbacks] = useState(quest.feedbacks)

	const addFeedback = async () => {
		const response = await addFeedbackToQuest(quest._id, feedback)
		setFeedbacks([...feedbacks, response])
	}

	return (
		<div className={cl.Container}>
			<div className={cl.Inner}>
				<div className={cl.Banner} style={{backgroundImage: `url(http://localhost:5000/${quest.banner}`}}>
					<div className={cl.Opacity}>
						<div className={cl.Details}>
							<h2>{quest.title}</h2>
						</div>
					</div>
				</div>
				<div className={cl.Body}>
					<div className={cl.Sidebar}>
						<div className={cl.Details}>
							<span> Price: {quest.price} </span>
							<span> startsIn: {quest.startsIn} </span>
							<span> endsIn: {quest.endsIn} </span>
							<span> 
								Статус: {
									!quest.status ? 
										<span style={{color: "#FF4023"}}> 
											Закрыт
										</span> 
										: 
										<span style={{color: "#54B44B"}}> 
											Открыт 
										</span> 
								}
							</span>

						</div>
						<Btn onClick={() => navigate(`/quests/${quest._id}/order`)}>Записатся</Btn>
					</div>
					<div className={cl.Content}>
						<div style={{marginBottom: '1rem'}} className={cl.DescriptionBar}>
							{quest.description}
						</div>
						<div>
							<ThemesSelector view={true} form={quest}/>
						</div>
						<div className={cl.FeedbackBar}>
							<input type="text" onChange={e => setFeedback(e.target.value)} placeholder="Введите отзыв" className='browser-default'/>
							<Btn disabled={!feedback} style={{width: "150px"}} onClick={() => addFeedback()}>Отправить</Btn>
						</div>
						<div className={cl.FeedbackList}>
							{
								feedbacks.length	
									?
									feedbacks.map((feedback) => 
										<FeedbackListItem key={feedback.id} feedback={feedback}/>
									)
									:
									<div className={cl.Empty}>
										<div>
											<img src={cactus} alt=""/>
											<p>Отзывов нет</p>
										</div>
									</div>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}	

export default QuestDetails